/**
 * Auth Redux slice — enhanced.
 *
 * Extends the original authSlice with:
 * - role tracking
 * - token storage
 * - loading state
 *
 * Maintains backward compatibility:
 * - login/logout actions work identically
 * - isAuthenticated flag preserved
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserRole } from '@/types/common'

/** Authenticated user shape */
interface AuthUser {
  email: string
  name: string
  role: UserRole
}

/** Auth state shape */
interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  role: UserRole
  isLoading: boolean
}

/** Login payload */
interface LoginPayload {
  user: AuthUser
  token?: string
  refreshToken?: string
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  role: 'user',
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Login action.
     * Backward-compatible: accepts old { email, name } shape
     * or new { user, token, refreshToken } shape.
     */
    login: (state, action: PayloadAction<LoginPayload | { email: string; name: string }>) => {
      if ('user' in action.payload) {
        const { user, token, refreshToken } = action.payload as LoginPayload
        state.user = user
        state.isAuthenticated = true
        state.role = user.role
        state.token = token ?? null
        state.refreshToken = refreshToken ?? null
      } else {
        /** Backward compatibility with old payload shape */
        const { email, name } = action.payload
        state.user = { email, name, role: 'user' }
        state.isAuthenticated = true
        state.role = 'user'
      }
      state.isLoading = false
    },

    /** Logout — clear all auth state */
    logout: state => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
      state.role = 'user'
      state.isLoading = false
    },

    /** Set loading state during auth operations */
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    /** Update tokens after refresh */
    updateTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },
  },
})

export const { login, logout, setAuthLoading, updateTokens } = authSlice.actions

export default authSlice.reducer
