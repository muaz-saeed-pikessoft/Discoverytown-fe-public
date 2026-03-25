import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { staffLogin, staffRefresh } from '@/lib/api/admin/auth.api'
import type { StaffLoginRequest, StaffLoginResponse } from '@/types/auth'
import type { StaffRoleEnum } from '@/types/admin.types'
import type { PermissionMap } from '@/types/permissions.types'
import { DEFAULT_ALL_PERMISSIONS, SYSTEM_ROLES } from '@/constants/permissions'

type StaffJwt = {
  accessToken?: string
  refreshToken?: string
  accessTokenExpiresAt?: number
  user?: StaffLoginResponse['user']
}

function permissionsForLegacyRole(role: StaffRoleEnum | undefined): PermissionMap {
  if (!role) return {}
  const normalized = role.toLowerCase()
  const system = SYSTEM_ROLES.find(r => r.id === `role_${normalized}`)
  if (system) return system.permissions
  if (role === 'OWNER' || role === 'ADMIN') return DEFAULT_ALL_PERMISSIONS
  return {}
}

async function refreshAccessToken(token: StaffJwt): Promise<StaffJwt> {
  const refreshed = await staffRefresh()
  const expiresIn = refreshed.expiresIn ?? 60 * 10
  return {
    ...token,
    accessToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken,
    accessTokenExpiresAt: Date.now() + expiresIn * 1000,
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Staff',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        const email = credentials?.email
        const password = credentials?.password

        if (typeof email !== 'string' || typeof password !== 'string') return null

        const payload: StaffLoginRequest = { email, password }
        const response = await staffLogin(payload)

        return {
          id: response.user.staffUserId,
          ...response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as StaffLoginResponse['user'] & {
          accessToken: string
          refreshToken: string
          expiresIn: number
        }

        const derivedRoleId = u.roleId ?? `role_${String(u.role).toLowerCase()}`
        const derivedRoleName = u.roleName ?? String(u.role)
        const derivedPermissions = u.permissions ?? permissionsForLegacyRole(u.role)

        return {
          ...token,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
          accessTokenExpiresAt: Date.now() + u.expiresIn * 1000,
          user: {
            staffUserId: u.staffUserId,
            organizationId: u.organizationId,
            role: u.role,
            roleId: derivedRoleId,
            roleName: derivedRoleName,
            permissions: derivedPermissions,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            onboardingStep: u.onboardingStep,
          },
        }
      }

      const staffToken = token as unknown as StaffJwt
      const expiresAt = staffToken.accessTokenExpiresAt ?? 0

      if (expiresAt > 0 && Date.now() < expiresAt - 15_000) {
        return token
      }

      if (!staffToken.refreshToken) {
        return token
      }

      try {
        return await refreshAccessToken(staffToken)
      } catch {
        return { ...token, accessToken: '', refreshToken: '', accessTokenExpiresAt: 0 }
      }
    },
    session: async ({ session, token }) => {
      const staffToken = token as unknown as StaffJwt
      return {
        ...session,
        user: {
          ...session.user,
          ...(staffToken.user ?? {}),
        },
      }
    },
  },
}

