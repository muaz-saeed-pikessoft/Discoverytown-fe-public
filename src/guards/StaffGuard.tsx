'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { ROUTES } from '@/config/routes'
import type { StaffRoleEnum } from '@/types/admin.types'
import type { PermissionMap } from '@/types/permissions.types'
import { SYSTEM_ROLES } from '@/constants/permissions'
import { useAppDispatch } from '@/store/hooks'
import { clearPermissions, setPermissions } from '@/store/slices/permissionSlice'

interface StaffGuardProps {
  children: ReactNode
  allowedRoles?: StaffRoleEnum[]
}

export default function StaffGuard({ children, allowedRoles }: StaffGuardProps) {
  const bypassAdminAuth = process.env.NEXT_PUBLIC_BYPASS_ADMIN_AUTH === 'true'

  if (bypassAdminAuth) {
    return <>{children}</>
  }

  const router = useRouter()
  const pathname = usePathname() ?? ''
  const { data: session, status } = useSession()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === 'unauthenticated') {
      dispatch(clearPermissions())
      return
    }

    if (status !== 'authenticated') return

    const user = session?.user as unknown as
      | { role?: StaffRoleEnum; roleId?: string; roleName?: string; permissions?: PermissionMap }
      | undefined

    if (!user) return

    const roleId = user.roleId ?? (user.role ? `role_${String(user.role).toLowerCase()}` : null)
    const roleName = user.roleName ?? (user.role ? String(user.role) : null)

    const permissions =
      user.permissions ??
      (user.role
        ? SYSTEM_ROLES.find(r => r.id === `role_${String(user.role).toLowerCase()}`)?.permissions ?? {}
        : {})

    dispatch(setPermissions({ roleId, roleName, permissions }))
  }, [dispatch, session?.user, status])

  const isAllowed = useMemo(() => {
    if (!allowedRoles || allowedRoles.length === 0) return true
    const role = (session?.user as unknown as { role?: StaffRoleEnum } | undefined)?.role
    return role ? allowedRoles.includes(role) : false
  }, [allowedRoles, session?.user])

  if (status === 'loading') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#f8fafc]'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push(ROUTES.LOGIN)
    return null
  }

  if (!isAllowed) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-10'>
        <div className='text-sm font-black uppercase tracking-wider text-gray-400'>403</div>
        <h1 className='mt-2 text-2xl font-black text-gray-900'>Access denied</h1>
        <p className='mt-1 text-sm text-gray-500'>You don&apos;t have permission to view this page.</p>
        <button
          type='button'
          onClick={() => router.push(pathname.startsWith('/admin') ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME)}
          className='mt-6 rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white'
        >
          Go back
        </button>
      </div>
    )
  }

  return <>{children}</>
}

