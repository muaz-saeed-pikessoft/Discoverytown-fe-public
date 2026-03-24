/**
 * Admin panel root layout.
 * Wraps all admin routes with:
 * - AdminGuard (auth + role protection)
 * - Sidebar + Header shell
 */

'use client'

import type { ReactNode } from 'react'

import AdminGuard from '@/guards/AdminGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className='flex h-screen overflow-hidden bg-gray-50'>
        <AdminSidebar />

        <div className='flex flex-1 flex-col overflow-hidden'>
          <AdminHeader />

          <main className='flex-1 overflow-y-auto p-6'>{children}</main>
        </div>
      </div>
    </AdminGuard>
  )
}
