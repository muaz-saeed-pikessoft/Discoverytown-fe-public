/**
 * AdminGuard component.
 *
 * Extends AuthGuard with role-based access control.
 * Only users with admin or super_admin roles can access wrapped routes.
 * Non-admin authenticated users are redirected to home.
 * Unauthenticated users are redirected to login.
 *
 * Usage (in admin layout):
 *   <AdminGuard>{children}</AdminGuard>
 */

'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/store/hooks'
import { isAdminRole } from '@/config/roles'
import { ROUTES } from '@/config/routes'

interface AdminGuardProps {
  children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const bypassAdminAuth = process.env.NEXT_PUBLIC_BYPASS_ADMIN_AUTH === 'true'
  const router = useRouter()

  const { isAuthenticated, role, isLoading } = useAppSelector(state => state.auth)

  if (bypassAdminAuth) {
    return <>{children}</>
  }

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN)

      return
    }

    if (!isAdminRole(role)) {
      router.push(ROUTES.HOME)
    }
  }, [isAuthenticated, role, isLoading, router])

  /** Show loading spinner while auth check is in progress */
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#f8fafc]'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
      </div>
    )
  }

  /** Prevent render if not authenticated or not admin */
  if (!isAuthenticated || !isAdminRole(role)) {
    return null
  }

  return <>{children}</>
}
