export type PermissionAction = 'view' | 'create' | 'edit' | 'delete'

export type AdminModule =
  | 'dashboard'
  | 'scheduling'
  | 'clients'
  | 'reports'
  | 'leads'
  | 'staff'
  | 'inventory'
  | 'integrations'
  | 'settings'
  | 'roles'

/**
 * Hybrid-ready permissions:
 * - Module-level keys now: "clients", "reports"
 * - Sub-section keys later: "clients.waivers", "reports.revenue"
 */
export type PermissionMap = Record<string, PermissionAction[]>

export interface RoleDefinition {
  id: string
  name: string
  description: string
  isSystem: boolean
  permissions: PermissionMap
  createdAt: string
  updatedAt: string
}

export interface CreateRolePayload {
  name: string
  description: string
  permissions: PermissionMap
}

export interface UpdateRolePayload {
  name?: string
  description?: string
  permissions?: PermissionMap
}

