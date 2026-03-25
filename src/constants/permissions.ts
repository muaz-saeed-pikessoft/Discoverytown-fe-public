import type { AdminModule, PermissionAction, PermissionMap, RoleDefinition } from '@/types/permissions.types'

export type AdminModuleDefinition = {
  module: AdminModule
  label: string
  actions: PermissionAction[]
}

export const ADMIN_MODULES: AdminModuleDefinition[] = [
  { module: 'dashboard', label: 'Dashboard', actions: ['view'] },
  { module: 'scheduling', label: 'Scheduling', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'clients', label: 'Clients', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'reports', label: 'Reports', actions: ['view'] },
  { module: 'leads', label: 'Leads', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'staff', label: 'Staff', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'inventory', label: 'Inventory', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'integrations', label: 'Integrations', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'settings', label: 'Settings', actions: ['view', 'edit'] },
  { module: 'roles', label: 'Roles & Permissions', actions: ['view', 'create', 'edit', 'delete'] },
]

export const MODULE_ROUTE_MAP: Record<AdminModule, string> = {
  dashboard: '/admin/dashboard',
  scheduling: '/admin/scheduling',
  clients: '/admin/clients',
  reports: '/admin/reports',
  leads: '/admin/leads',
  staff: '/admin/staff',
  inventory: '/admin/inventory',
  integrations: '/admin/integrations',
  settings: '/admin/settings',
  roles: '/admin/roles',
}

export const DEFAULT_ALL_PERMISSIONS: PermissionMap = ADMIN_MODULES.reduce<PermissionMap>((acc, def) => {
  acc[def.module] = [...def.actions]
  return acc
}, {})

function isoNow(): string {
  return new Date().toISOString()
}

function role(id: string, name: string, description: string, permissions: PermissionMap, isSystem: boolean): RoleDefinition {
  const now = isoNow()
  return { id, name, description, isSystem, permissions, createdAt: now, updatedAt: now }
}

export const SYSTEM_ROLES: RoleDefinition[] = [
  role('role_owner', 'Owner', 'Full access to everything.', DEFAULT_ALL_PERMISSIONS, true),
  role(
    'role_admin',
    'Admin',
    'Full operational access (cannot manage roles).',
    Object.fromEntries(
      Object.entries(DEFAULT_ALL_PERMISSIONS).map(([k, actions]) => {
        if (k === 'roles') return [k, ['view'] satisfies PermissionAction[]]
        return [k, actions]
      })
    ) as PermissionMap,
    true
  ),
  role(
    'role_manager',
    'Manager',
    'Can create and edit, but not delete in most sections.',
    {
      dashboard: ['view'],
      scheduling: ['view', 'create', 'edit'],
      clients: ['view', 'create', 'edit'],
      reports: ['view'],
      leads: ['view', 'create', 'edit'],
      staff: ['view', 'create', 'edit'],
      inventory: ['view', 'create', 'edit'],
      integrations: ['view', 'create', 'edit'],
      settings: ['view', 'edit'],
      roles: ['view'],
    },
    false
  ),
  role(
    'role_front_desk',
    'Front Desk',
    'Handles day-to-day scheduling and client check-in.',
    {
      dashboard: ['view'],
      scheduling: ['view', 'create', 'edit'],
      clients: ['view', 'create', 'edit'],
      reports: [],
      leads: [],
      staff: [],
      inventory: [],
      integrations: [],
      settings: [],
      roles: [],
    },
    false
  ),
  role(
    'role_accountant',
    'Accountant',
    'Finance visibility and reporting.',
    {
      dashboard: ['view'],
      scheduling: [],
      clients: ['view'],
      reports: ['view'],
      leads: [],
      staff: [],
      inventory: ['view', 'edit'],
      integrations: [],
      settings: [],
      roles: [],
    },
    false
  ),
]

