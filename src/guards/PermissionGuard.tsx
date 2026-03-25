'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { usePermission } from '@/hooks/usePermission'
import type { PermissionAction } from '@/types/permissions.types'

interface PermissionGuardProps {
  module: string
  action?: PermissionAction
  fallback?: ReactNode
  children: ReactNode
}

export default function PermissionGuard({ module, action = 'view', fallback, children }: PermissionGuardProps) {
  const allowed = usePermission(module, action)

  const defaultFallback = useMemo(
    () => (
      <div className='flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-10'>
        <div className='text-sm font-black uppercase tracking-wider text-gray-400'>403</div>
        <h1 className='mt-2 text-2xl font-black text-gray-900'>Access denied</h1>
        <p className='mt-1 text-sm text-gray-500'>You don&apos;t have permission to view this page.</p>
      </div>
    ),
    []
  )

  if (!allowed) return <>{fallback ?? defaultFallback}</>

  return <>{children}</>
}

