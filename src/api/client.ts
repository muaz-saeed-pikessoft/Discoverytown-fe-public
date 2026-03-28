/**
 * Enterprise-grade Axios HTTP client.
 *
 * Features:
 * - Request interceptor: attach Bearer token + Accept-Language header
 * - Response interceptor: handle 401, refresh token, retry, logout fallback
 * - Centralized error handling
 * - Request deduplication via AbortController
 */

import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import ENV from '@/config/env'
import { ApiError } from '@/lib/api/errors'

/** Token storage keys */
const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const DEVICE_ID_KEY = 'device_id'

/** Flag to prevent multiple simultaneous refresh attempts */
let isRefreshing = false

/** Queue of failed requests waiting for token refresh */
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

/**
 * Process the queue of failed requests after token refresh.
 */
function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error)
    } else if (token) {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

/**
 * Safely retrieve a cookie value by name.
 * Avoids document access during SSR.
 */
function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }

  return undefined
}

/**
 * Remove a cookie by name.
 */
function removeCookie(name: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`
}

/**
 * Create the configured Axios instance.
 */
function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: ENV.API_BASE_URL,
    /**
     * Force the Fetch API adapter so MSW's service worker can intercept
     * requests in development. Axios defaults to XMLHttpRequest (XHR) which
     * service workers cannot intercept — switching to fetch fixes this.
     */
    adapter: 'fetch',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /**
   * REQUEST INTERCEPTOR
   * - Attach Bearer token from cookies
   * - Attach Accept-Language header
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken = getCookieValue(TOKEN_KEY)

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      if (typeof window !== 'undefined') {
        const deviceId = window.localStorage.getItem(DEVICE_ID_KEY)
        if (deviceId) {
          config.headers['X-Device-ID'] = deviceId
        }
      }

      config.headers['Accept-Language'] = typeof navigator !== 'undefined' ? navigator.language : 'en'

      return config
    },
    (error: AxiosError): Promise<never> => Promise.reject(error)
  )

  /**
   * RESPONSE INTERCEPTOR
   * - Handle 401: attempt token refresh, retry original request
   * - Queue concurrent requests during refresh
   * - Logout on refresh failure
   */
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError): Promise<unknown> => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }

      if (!originalRequest) {
        return Promise.reject(toApiError(error))
      }

      /** Handle 401 Unauthorized */
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`

              return instance(originalRequest)
            })
            .catch(queueError => Promise.reject(queueError))
        }

        originalRequest._retry = true
        isRefreshing = true

        const refreshToken = getCookieValue(REFRESH_TOKEN_KEY)

        try {
          /**
           * Refresh strategy:
           * - Legacy user auth: refresh via /auth/refresh with refreshToken cookie value
           * - Staff auth: attempt /api/v1/auth/staff/refresh (cookie-based) when legacy refreshToken is absent
           */
          const refreshResponse = refreshToken
            ? await axios.post(`${ENV.API_BASE_URL}/auth/refresh`, { refreshToken })
            : await axios.post(`${ENV.API_BASE_URL}/api/v1/auth/staff/refresh`, undefined, {
                withCredentials: true,
              })

          const newAccessToken = (refreshResponse.data?.accessToken ?? refreshResponse.data?.data?.accessToken) as
            | string
            | undefined
          const newRefreshToken = (refreshResponse.data?.refreshToken ?? refreshResponse.data?.data?.refreshToken) as
            | string
            | undefined

          if (!newAccessToken) {
            throw new Error('Token refresh failed: missing access token')
          }

          if (typeof document !== 'undefined') {
            document.cookie = `${TOKEN_KEY}=${newAccessToken}; path=/; SameSite=Strict; Secure`
            if (newRefreshToken) {
              document.cookie = `${REFRESH_TOKEN_KEY}=${newRefreshToken}; path=/; SameSite=Strict; Secure`
            }
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          processQueue(null, newAccessToken)

          return instance(originalRequest)
        } catch (refreshError) {
          processQueue(refreshError, null)
          handleLogout()

          return Promise.reject(toApiError(refreshError))
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(toApiError(error))
    }
  )

  return instance
}

/**
 * Handle logout on auth failure.
 * Clears tokens and redirects to login.
 */
function handleLogout(): void {
  removeCookie(TOKEN_KEY)
  removeCookie(REFRESH_TOKEN_KEY)

  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

function toApiError(error: unknown): unknown {
  if (!axios.isAxiosError(error)) return error

  const status = error.response?.status ?? 0
  const data = error.response?.data as unknown

  if (data && typeof data === 'object') {
    const anyData = data as {
      success?: boolean
      error?: { code?: string; message?: string; details?: unknown }
      message?: string
      code?: string
      details?: unknown
    }

    const code = anyData.error?.code ?? anyData.code ?? 'UNKNOWN_ERROR'
    const message = anyData.error?.message ?? anyData.message ?? error.message
    const details = anyData.error?.details ?? anyData.details

    if (status > 0) {
      return new ApiError(code, message, status, details)
    }
  }

  if (status > 0) {
    return new ApiError('HTTP_ERROR', error.message, status)
  }

  return error
}

/** Singleton API client instance */
const apiClient = createApiClient()

export default apiClient
