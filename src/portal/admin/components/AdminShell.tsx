'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'

import AdminHeader from '@/portal/admin/components/AdminHeader'
import AdminSidebar from '@/portal/admin/components/AdminSidebar'
import { useAppSelector } from '@/store/hooks'

interface AdminShellProps {
  children: ReactNode
  breadcrumbs?: ReactNode
}

export default function AdminShell({ children, breadcrumbs }: AdminShellProps) {
  const sidebarCollapsed = useAppSelector(state => state.ui.sidebarCollapsed)

  const sidebarWidthClass = useMemo(() => (sidebarCollapsed ? 'w-20' : 'w-64'), [sidebarCollapsed])

  return (
    <div className='flex h-screen overflow-hidden bg-gray-50'>
      <div className={['shrink-0', sidebarWidthClass].join(' ')}>
        <AdminSidebar />
      </div>

      <div className='flex flex-1 flex-col overflow-hidden'>
        <div className='border-b border-gray-200 bg-white'>
          <div className='flex items-center justify-between px-6 py-3'>
            <div className='min-w-0 text-sm font-semibold text-gray-500'>{breadcrumbs}</div>
          </div>
        </div>
        <AdminHeader />

        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  )
}

