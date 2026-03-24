/**
 * Role definitions and permission mappings.
 * Single source of truth for role-based access control.
 */

import type { UserRole } from '@/types/common'

/** All available roles */
export const ROLES: Record<string, UserRole> = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const

/** Admin route access roles */
export const ADMIN_ROLES: UserRole[] = ['admin', 'super_admin']

/** Check if a role has admin-level access */
export function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role)
}
