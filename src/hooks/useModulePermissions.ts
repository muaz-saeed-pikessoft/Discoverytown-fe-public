'use client'

import { useMemo } from 'react'

import { usePermission } from '@/hooks/usePermission'

export function useModulePermissions(resource: string) {
  const canView = usePermission(resource, 'view')
  const canCreate = usePermission(resource, 'create')
  const canEdit = usePermission(resource, 'edit')
  const canDelete = usePermission(resource, 'delete')

  return useMemo(
    () => ({ canView, canCreate, canEdit, canDelete }),
    [canCreate, canDelete, canEdit, canView]
  )
}

