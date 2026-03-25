import apiClient from '@/api/client'
import type { CreateRolePayload, RoleDefinition, UpdateRolePayload, PermissionMap } from '@/types/permissions.types'

export async function getRoles(): Promise<RoleDefinition[]> {
  const response = await apiClient.get<RoleDefinition[]>('/api/v1/admin/roles')
  return response.data
}

export async function getRole(id: string): Promise<RoleDefinition> {
  const response = await apiClient.get<RoleDefinition>(`/api/v1/admin/roles/${id}`)
  return response.data
}

export async function createRole(payload: CreateRolePayload): Promise<RoleDefinition> {
  const response = await apiClient.post<RoleDefinition>('/api/v1/admin/roles', payload)
  return response.data
}

export async function updateRole(id: string, payload: UpdateRolePayload): Promise<RoleDefinition> {
  const response = await apiClient.patch<RoleDefinition>(`/api/v1/admin/roles/${id}`, payload)
  return response.data
}

export async function deleteRole(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/roles/${id}`)
}

export async function getMyPermissions(): Promise<{ roleId: string; roleName: string; permissions: PermissionMap }> {
  const response = await apiClient.get<{ roleId: string; roleName: string; permissions: PermissionMap }>(
    '/api/v1/admin/roles/me/permissions'
  )
  return response.data
}

