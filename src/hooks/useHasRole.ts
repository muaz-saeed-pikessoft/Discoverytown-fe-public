'use client'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'

import { useAppSelector } from '@/store/hooks'
import type { StaffRoleEnum } from '@/types/admin.types'
import type { UserRole } from '@/types/common'

type RoleInput = StaffRoleEnum | StaffRoleEnum[] | UserRole | UserRole[]

export function useHasRole(role: RoleInput): boolean {
  const { data: session } = useSession()
  const legacyRole = useAppSelector(state => state.auth.role)

  return useMemo(() => {
    const roles = Array.isArray(role) ? role : [role]
    const staffRole = (session?.user as unknown as { role?: StaffRoleEnum } | undefined)?.role

    if (staffRole) return roles.includes(staffRole)
    return roles.includes(legacyRole)
  }, [legacyRole, role, session?.user])
}

