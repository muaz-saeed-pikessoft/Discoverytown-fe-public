import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/store'
import type { PermissionMap } from '@/types/permissions.types'

interface PermissionState {
  permissions: PermissionMap
  roleId: string | null
  roleName: string | null
  isLoaded: boolean
}

const initialState: PermissionState = {
  permissions: {},
  roleId: null,
  roleName: null,
  isLoaded: false,
}

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermissions: (
      state,
      action: PayloadAction<{ roleId: string | null; roleName: string | null; permissions: PermissionMap }>
    ) => {
      state.roleId = action.payload.roleId
      state.roleName = action.payload.roleName
      state.permissions = action.payload.permissions
      state.isLoaded = true
    },
    clearPermissions: state => {
      state.roleId = null
      state.roleName = null
      state.permissions = {}
      state.isLoaded = false
    },
  },
})

export const { setPermissions, clearPermissions } = permissionSlice.actions

export const selectPermissions = (state: RootState) => state.permission.permissions
export const selectPermissionRole = (state: RootState) => ({ roleId: state.permission.roleId, roleName: state.permission.roleName })
export const selectPermissionsLoaded = (state: RootState) => state.permission.isLoaded

export default permissionSlice.reducer

