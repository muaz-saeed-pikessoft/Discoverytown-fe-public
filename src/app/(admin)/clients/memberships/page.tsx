'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_FAMILIES } from '@/portal/admin/features/clients/constants'
import type { AdminFamilyRow } from '@/portal/admin/features/clients/types'

export default function AdminClientsMembershipsPage() {
  const columns: TableColumn<AdminFamilyRow>[] = [
    { key: 'familyName', label: 'Family', sortable: true },
    { key: 'memberSince', label: 'Member since', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'tags', label: 'Tags', sortable: false },
  ]

  return (
    <AdminTablePage
      title='Memberships'
      subtitle='Manage active plans and renewals.'
      data={MOCK_ADMIN_FAMILIES}
      columns={columns}
      defaultSort={{ key: 'memberSince', direction: 'desc' }}
      searchableKeys={['id', 'familyName', 'tags', 'status']}
      pageSize={10}
    />
  )
}

