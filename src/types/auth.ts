/**
 * Consolidated authentication types.
 * Merges auth-type.ts and slice-level types into a single source of truth.
 */

import type { UserRole } from './common'

/** Authenticated user profile stored in Redux */
export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

/** Auth slice state shape */
export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  role: UserRole
  isLoading: boolean
}

/** Login request payload */
export interface LoginRequest {
  email: string
  password: string
}

/** Login response from API */
export interface LoginResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

/** Register request payload */
export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

/** Register response from API */
export interface RegisterResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

/** Refresh token response */
export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
