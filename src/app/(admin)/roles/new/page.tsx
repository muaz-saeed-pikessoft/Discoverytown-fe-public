'use client'

import Link from 'next/link'

import PageHeader from '@/components/shared/PageHeader'
import { ROUTES } from '@/constants/routes'
import RoleForm from '@/portal/admin/features/roles/components/RoleForm'

export default function Page() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='Create role'
        subtitle='Define a role and assign permissions.'
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
        onSubmit={async values => {
          // Backend integration will replace this mock submit.
          // For now, keep the page functional without a backend.
          void values
        }}
      />
    </div>
  )
}

