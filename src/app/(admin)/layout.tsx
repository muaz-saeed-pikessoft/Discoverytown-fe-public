/**
 * Admin panel root layout.
 * Wraps all admin routes with:
 * - AdminGuard (auth + role protection)
 * - Sidebar + Header shell
 */

'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'

import AdminGuard from '@/guards/AdminGuard'
import StaffGuard from '@/guards/StaffGuard'
import AdminShell from '@/portal/admin/components/AdminShell'
import { MODULE_ROUTE_MAP, DEFAULT_ALL_PERMISSIONS } from '@/constants/permissions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPermissions } from '@/store/slices/permissionSlice'
import { usePermission } from '@/hooks/usePermission'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const bypassAdminAuth = process.env.NEXT_PUBLIC_BYPASS_ADMIN_AUTH === 'true'
  const pathname = usePathname() ?? ''
  const dispatch = useAppDispatch()
  const permissionsLoaded = useAppSelector(state => state.permission.isLoaded)

  useEffect(() => {
    if (!bypassAdminAuth) return
    if (permissionsLoaded) return
    dispatch(setPermissions({ roleId: 'dev', roleName: 'Developer', permissions: DEFAULT_ALL_PERMISSIONS }))
  }, [bypassAdminAuth, dispatch, permissionsLoaded])

  const matchedModule = useMemo(() => {
    const entries = Object.entries(MODULE_ROUTE_MAP) as Array<[keyof typeof MODULE_ROUTE_MAP, string]>
    const match = entries
      .filter(([, prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))
      .sort((a, b) => b[1].length - a[1].length)[0]
    return match?.[0] ?? null
  }, [pathname])

  const canViewModule = usePermission(matchedModule ?? '', 'view')

  const shouldEnforce = matchedModule != null
  const denied = shouldEnforce && !canViewModule
  const showPermissionLoading = shouldEnforce && !bypassAdminAuth && !permissionsLoaded

  return (
    <AdminGuard>
      <StaffGuard>
        <AdminShell>
          {showPermissionLoading ? (
            <div className='flex min-h-[60vh] items-center justify-center rounded-2xl border border-gray-200 bg-white p-10'>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
            </div>
          ) : denied ? (
            <div className='flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-10'>
              <div className='text-sm font-black uppercase tracking-wider text-gray-400'>403</div>
              <h1 className='mt-2 text-2xl font-black text-gray-900'>Access denied</h1>
              <p className='mt-1 text-sm text-gray-500'>You don&apos;t have permission to view this page.</p>
            </div>
          ) : (
            children
          )}
        </AdminShell>
      </StaffGuard>
    </AdminGuard>
  )
}
