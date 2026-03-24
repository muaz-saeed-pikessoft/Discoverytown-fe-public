/**
 * Authentication API service.
 * Handles login, register, refresh, and logout.
 *
 * Currently returns mock responses.
 * When backend is ready: replace mock returns with apiClient calls.
 */

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RefreshTokenResponse } from '@/types/auth'

// import apiClient from './client'

/**
 * Authenticate a user with email and password.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials)
 *   return data
 */
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  /** Mock implementation — remove when API is ready */
  return {
    user: {
      id: 'usr-mock-1',
      email: credentials.email,
      name: 'Mock User',
      role: 'user',
    },
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  }
}

/**
 * Register a new user account.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.post<RegisterResponse>('/auth/register', payload)
 *   return data
 */
export async function registerUser(payload: RegisterRequest): Promise<RegisterResponse> {
  return {
    user: {
      id: 'usr-mock-2',
      email: payload.email,
      name: `${payload.firstName} ${payload.lastName}`,
      role: 'user',
    },
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  }
}

/**
 * Refresh the access token using a refresh token.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.post<RefreshTokenResponse>('/auth/refresh', { refreshToken })
 *   return data
 */
export async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
  void refreshToken

  return {
    accessToken: 'mock-new-access-token',
    refreshToken: 'mock-new-refresh-token',
  }
}

/**
 * Logout the current user.
 *
 * API-READY: Replace mock with:
 *   await apiClient.post('/auth/logout')
 */
export async function logoutUser(): Promise<void> {
  /** Mock: no-op. API will invalidate server-side session */
}
