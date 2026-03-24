/**
 * useAuth hook.
 *
 * Provides a unified interface for authentication operations.
 * Encapsulates Redux dispatch + API calls for login, logout, and register.
 */

'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { login, logout, setAuthLoading } from '@/store/slices/authSlice'
import { clearUser } from '@/store/slices/userSlice'
import { resetAll as resetBooking } from '@/store/slices/bookingSlice'
import { loginUser, registerUser, logoutUser } from '@/api/authApi'
import { ROUTES } from '@/config/routes'
import type { LoginRequest, RegisterRequest } from '@/types/auth'

export function useAuth() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const authState = useAppSelector(state => state.auth)

  /** Login with email and password */
  const handleLogin = useCallback(
    async (credentials: LoginRequest): Promise<void> => {
      dispatch(setAuthLoading(true))
      try {
        const response = await loginUser(credentials)
        dispatch(
          login({
            user: response.user,
            token: response.accessToken,
            refreshToken: response.refreshToken,
          })
        )
        router.push(ROUTES.HOME)
      } catch {
        dispatch(setAuthLoading(false))
        throw new Error('Login failed. Please check your credentials.')
      }
    },
    [dispatch, router]
  )

  /** Register a new account */
  const handleRegister = useCallback(
    async (payload: RegisterRequest): Promise<void> => {
      dispatch(setAuthLoading(true))
      try {
        const response = await registerUser(payload)
        dispatch(
          login({
            user: response.user,
            token: response.accessToken,
            refreshToken: response.refreshToken,
          })
        )
        router.push(ROUTES.HOME)
      } catch {
        dispatch(setAuthLoading(false))
        throw new Error('Registration failed. Please try again.')
      }
    },
    [dispatch, router]
  )

  /** Logout — clear all state and redirect */
  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await logoutUser()
    } finally {
      dispatch(logout())
      dispatch(clearUser())
      dispatch(resetBooking())
      router.push(ROUTES.LOGIN)
    }
  }, [dispatch, router])

  return {
    ...authState,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }
}
