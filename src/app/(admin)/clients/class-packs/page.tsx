'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_FAMILIES } from '@/portal/admin/features/clients/constants'
import type { AdminFamilyRow } from '@/portal/admin/features/clients/types'

export default function AdminClientsClassPacksPage() {
  const columns: TableColumn<AdminFamilyRow>[] = [
    { key: 'familyName', label: 'Family', sortable: true },
    { key: 'primaryEmail', label: 'Email', sortable: true },
    { key: 'tags', label: 'Notes', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
  ]

  return (
    <AdminTablePage
      title='Class packs'
      subtitle='Manage class pack products and balances.'
      data={MOCK_ADMIN_FAMILIES}
      columns={columns}
      defaultSort={{ key: 'familyName', direction: 'asc' }}
      searchableKeys={['id', 'familyName', 'primaryEmail', 'tags']}
      pageSize={10}
    />
  )
}

