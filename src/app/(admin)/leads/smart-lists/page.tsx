'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_SMART_LISTS } from '@/portal/admin/features/leads/constants'
import type { AdminSmartListRow } from '@/portal/admin/features/leads/types'

export default function AdminLeadsSmartListsPage() {
  const columns: TableColumn<AdminSmartListRow>[] = [
    { key: 'name', label: 'List', sortable: true },
    { key: 'audienceSize', label: 'Audience', sortable: true, align: 'right' },
    { key: 'updatedAt', label: 'Updated', sortable: true },
  ]

  return (
    <AdminTablePage
      title='Smart lists'
      subtitle='Build segments and saved views.'
      data={MOCK_ADMIN_SMART_LISTS}
      columns={columns}
      defaultSort={{ key: 'updatedAt', direction: 'desc' }}
      searchableKeys={['id', 'name']}
      pageSize={10}
    />
  )
}

