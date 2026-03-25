/**
 * Consolidated authentication types.
 * Merges auth-type.ts and slice-level types into a single source of truth.
 */

import type { UserRole } from './common'
import type { StaffRoleEnum } from './admin.types'
import type { PermissionMap } from './permissions.types'

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

/**
 * Staff auth (next-auth) -- additive, coexists with legacy user auth.
 */

export interface StaffSessionUser {
  staffUserId: string
  organizationId: string
  /**
   * Legacy static role identifier (temporary).
   * Dynamic RBAC should use roleId/roleName/permissions.
   */
  role: StaffRoleEnum
  /** Dynamic role ID set by admin (RBAC) */
  roleId?: string
  /** Dynamic role display name */
  roleName?: string
  /** Dynamic permission map for this staff user */
  permissions?: PermissionMap
  firstName: string
  lastName: string
  email: string
  onboardingStep?: number
}

export interface StaffLoginRequest {
  email: string
  password: string
}

export interface StaffLoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: StaffSessionUser
}
