'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import EmptyState from '@/components/shared/EmptyState'
import { ROUTES } from '@/constants/routes'
import { MOCK_ROLES } from '@/portal/admin/features/roles/constants'
import RoleForm from '@/portal/admin/features/roles/components/RoleForm'

export default function Page({ params }: { params: { id: string } }) {
  const role = useMemo(() => MOCK_ROLES.find(r => r.id === params.id) ?? null, [params.id])

  if (!role) {
    return (
      <div className='space-y-6'>
        <PageHeader
          title='Role not found'
          subtitle='This role does not exist (mock mode).'
          actions={
            <Link
              href={ROUTES.ADMIN.ROLES}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 hover:bg-gray-50'
            >
              Back
            </Link>
          }
        />
        <EmptyState title='Not found' description='Try selecting a role from the list again.' />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title={`Edit role: ${role.name}`}
        subtitle={role.isSystem ? 'System roles are read-only.' : 'Update role details and permissions.'}
        actions={
          <Link
            href={ROUTES.ADMIN.ROLES}
            className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 hover:bg-gray-50'
          >
            Back
          </Link>
        }
      />

      <RoleForm
        initialRole={role}
        readOnly={role.isSystem}
        onSubmit={async values => {
          void values
        }}
      />
    </div>
  )
}

