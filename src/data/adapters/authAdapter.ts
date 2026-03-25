/**
 * Authentication data adapter.
 *
 * Transforms raw API auth responses (snake_case) into
 * application-level types (camelCase).
 */

import type { LoginResponse, RegisterResponse, RefreshTokenResponse } from '@/types/auth'
import type { UserRole } from '@/types/common'

/** Raw login response from API */
export interface RawLoginResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  access_token: string
  refresh_token: string
}

/** Raw register response from API */
export interface RawRegisterResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  access_token: string
  refresh_token: string
}

/** Raw refresh token response from API */
export interface RawRefreshTokenResponse {
  access_token: string
  refresh_token: string
}

/**
 * Transform a raw login response into the app-level LoginResponse.
 */
export function adaptLoginResponse(raw: RawLoginResponse): LoginResponse {
  return {
    user: {
      id: raw.user.id,
      email: raw.user.email,
      name: raw.user.name,
      role: raw.user.role as UserRole,
    },
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
  }
}

/**
 * Transform a raw register response into the app-level RegisterResponse.
 */
export function adaptRegisterResponse(
  raw: RawRegisterResponse,
): RegisterResponse {
  return {
    user: {
      id: raw.user.id,
      email: raw.user.email,
      name: raw.user.name,
      role: raw.user.role as UserRole,
    },
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
  }
}

/**
 * Transform a raw refresh token response into the app-level type.
 */
export function adaptRefreshResponse(
  raw: RawRefreshTokenResponse,
): RefreshTokenResponse {
  return {
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
  }
}
