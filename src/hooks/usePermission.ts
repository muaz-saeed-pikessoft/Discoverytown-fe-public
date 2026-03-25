'use client'

import { useMemo } from 'react'

import { useAppSelector } from '@/store/hooks'
import type { PermissionAction } from '@/types/permissions.types'

function getParentResource(resource: string): string | null {
  const idx = resource.lastIndexOf('.')
  if (idx <= 0) return null
  return resource.slice(0, idx)
}

export function usePermission(resource: string, action: PermissionAction): boolean {
  const permissions = useAppSelector(state => state.permission.permissions)

  return useMemo(() => {
    const direct = permissions[resource]
    if (direct) return direct.includes(action)

    const parent = getParentResource(resource)
    if (!parent) return false

    const inherited = permissions[parent]
    if (!inherited) return false
    return inherited.includes(action)
  }, [action, permissions, resource])
}

