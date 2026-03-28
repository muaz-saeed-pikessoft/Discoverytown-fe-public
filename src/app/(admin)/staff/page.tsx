'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_STAFF } from '@/portal/admin/features/staff/constants'
import type { AdminStaffRow } from '@/portal/admin/features/staff/types'

export default function AdminStaffPage() {
  const columns: TableColumn<AdminStaffRow>[] = [
    { key: 'name', label: 'Staff', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='membership' /> },
  ]

  return (
    <AdminTablePage
      title='Staff'
      subtitle='Manage staff directory and access.'
      data={MOCK_ADMIN_STAFF}
      columns={columns}
      defaultSort={{ key: 'name', direction: 'asc' }}
      searchableKeys={['id', 'name', 'role', 'email', 'status']}
      pageSize={10}
    />
  )
}

