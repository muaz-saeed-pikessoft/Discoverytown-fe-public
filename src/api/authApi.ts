/**
 * Authentication API service.
 *
 * Handles login, register, refresh, and logout via Axios.
 * MSW intercepts these calls in development; real backend handles them in production.
 *
 * API-READY: Only endpoint URLs need to change for production.
 */

import {
  adaptLoginResponse,
  adaptRegisterResponse,
  adaptRefreshResponse,
} from '@/data/adapters/authAdapter'
import type {
  RawLoginResponse,
  RawRegisterResponse,
  RawRefreshTokenResponse,
} from '@/data/adapters/authAdapter'
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/auth'

import apiClient from './client'

/**
 * Authenticate a user with email and password.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function loginUser(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const { data } = await apiClient.post<RawLoginResponse>(
    '/api/auth/login',
    credentials,
  )

  return adaptLoginResponse(data)
}

/**
 * Register a new user account.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function registerUser(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RawRegisterResponse>(
    '/api/auth/register',
    {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: payload.password,
      confirm_password: payload.confirmPassword,
      phone: payload.phone,
    },
  )

  return adaptRegisterResponse(data)
}

/**
 * Refresh the access token using a refresh token.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  const { data } = await apiClient.post<RawRefreshTokenResponse>(
    '/api/auth/refresh',
    { refresh_token: refreshToken },
  )

  return adaptRefreshResponse(data)
}

/**
 * Logout the current user.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function logoutUser(): Promise<void> {
  await apiClient.post('/api/auth/logout')
}
