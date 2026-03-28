'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import StatusBadge from '@/components/shared/StatusBadge'
import { ROUTES } from '@/constants/routes'
import { MOCK_ROLES } from '@/portal/admin/features/roles/constants'
import type { RoleDefinition } from '@/types/permissions.types'
import type { TableColumn } from '@/types/common'
import { useModulePermissions } from '@/hooks/useModulePermissions'

export default function RolesListPage() {
  const perms = useModulePermissions('roles')

  const columns = useMemo<TableColumn<RoleDefinition>[]>(
    () => [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'description', label: 'Description' },
      {
        key: 'isSystem',
        label: 'Type',
        align: 'center',
        render: val => <StatusBadge status={val ? 'System' : 'Custom'} />,
      },
      {
        key: 'id',
        label: 'Actions',
        align: 'right',
        render: (_val, row) => (
          <div className='flex items-center justify-end gap-2'>
            {perms.canEdit ? (
              <Link
                href={ROUTES.ADMIN.ROLE(row.id)}
                className='rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-black text-gray-700 hover:bg-gray-50'
              >
                Edit
              </Link>
            ) : null}
          </div>
        ),
      },
    ],
    [perms.canEdit]
  )

  return (
    <AdminTablePage<RoleDefinition>
      module='roles'
      title='Roles & Permissions'
      subtitle='Control what staff can view and do in the admin panel.'
      data={MOCK_ROLES}
      columns={columns}
      searchableKeys={['name', 'description', 'id']}
      createAction={
        perms.canCreate ? (
          <Link
            href={ROUTES.ADMIN.ROLES_NEW}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700'
          >
            New role
          </Link>
        ) : null
      }
      actions={_p =>
        perms.canView ? (
          <span className='rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-600'>
            {MOCK_ROLES.length} Roles
          </span>
        ) : null
      }
    />
  )
}

