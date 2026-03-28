'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_POS } from '@/portal/admin/features/inventory/constants'
import type { AdminPosRow } from '@/portal/admin/features/inventory/types'

export default function AdminInventoryPosPage() {
  const columns: TableColumn<AdminPosRow>[] = [
    { key: 'openedAt', label: 'Opened', sortable: true },
    { key: 'staff', label: 'Staff', sortable: true },
    { key: 'sales', label: 'Sales', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'refunds', label: 'Refunds', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'net', label: 'Net', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
  ]

  return (
    <AdminTablePage
      title='POS'
      subtitle='Point of sale.'
      data={MOCK_ADMIN_POS}
      columns={columns}
      defaultSort={{ key: 'openedAt', direction: 'desc' }}
      searchableKeys={['id', 'staff', 'openedAt']}
      pageSize={10}
    />
  )
}

