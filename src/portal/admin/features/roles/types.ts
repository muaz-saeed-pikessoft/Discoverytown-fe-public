import type { PermissionAction, PermissionMap } from '@/types/permissions.types'

export type PermissionMatrixRow = {
  module: string
  label: string
  actions: PermissionAction[]
}

export interface RoleFormValues {
  name: string
  description: string
  permissions: PermissionMap
}

