/**
 * AuthGuard component.
 *
 * Protects routes that require authentication.
 * Redirects unauthenticated users to the login page.
 *
 * Usage:
 *   <AuthGuard>{children}</AuthGuard>
 */

'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/config/routes'

interface AuthGuardProps {
  children: ReactNode

  /** Custom redirect path (defaults to login) */
  redirectTo?: string
}

export default function AuthGuard({ children, redirectTo = ROUTES.LOGIN }: AuthGuardProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, redirectTo, router])

  /** Show nothing while checking auth or redirecting */
  if (isLoading || !isAuthenticated) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[var(--dt-bg-page)]'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
      </div>
    )
  }

  return <>{children}</>
}
