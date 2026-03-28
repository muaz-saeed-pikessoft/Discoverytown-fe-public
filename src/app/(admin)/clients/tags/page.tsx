'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_FAMILIES } from '@/portal/admin/features/clients/constants'
import type { AdminFamilyRow } from '@/portal/admin/features/clients/types'

export default function AdminClientsTagsPage() {
  const columns: TableColumn<AdminFamilyRow>[] = [
    { key: 'familyName', label: 'Family', sortable: true },
    { key: 'tags', label: 'Tags', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
  ]

  return (
    <AdminTablePage
      title='Tags'
      subtitle='Organize clients with tags.'
      data={MOCK_ADMIN_FAMILIES}
      columns={columns}
      defaultSort={{ key: 'familyName', direction: 'asc' }}
      searchableKeys={['id', 'familyName', 'tags', 'status']}
      pageSize={10}
    />
  )
}

