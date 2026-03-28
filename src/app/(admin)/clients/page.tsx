'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_FAMILIES } from '@/portal/admin/features/clients/constants'
import type { AdminFamilyRow } from '@/portal/admin/features/clients/types'

export default function AdminClientsPage() {
  const columns: TableColumn<AdminFamilyRow>[] = [
    { key: 'familyName', label: 'Family', sortable: true },
    { key: 'primaryEmail', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false },
    { key: 'memberSince', label: 'Member since', sortable: true },
    { key: 'tags', label: 'Tags', sortable: false },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: v => <StatusBadge status={String(v ?? '')} variant='membership' />,
    },
  ]

  return (
    <AdminTablePage
      title='Clients'
      subtitle='Manage families and client records.'
      data={MOCK_ADMIN_FAMILIES}
      columns={columns}
      defaultSort={{ key: 'memberSince', direction: 'desc' }}
      searchableKeys={['id', 'familyName', 'primaryEmail', 'tags', 'status']}
      pageSize={10}
    />
  )
}

