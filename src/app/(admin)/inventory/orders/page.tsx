'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_ORDERS } from '@/portal/admin/features/inventory/constants'
import type { AdminOrderRow } from '@/portal/admin/features/inventory/types'

export default function AdminInventoryOrdersPage() {
  const columns: TableColumn<AdminOrderRow>[] = [
    { key: 'orderNumber', label: 'Order', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'placedAt', label: 'Placed', sortable: true },
    { key: 'total', label: 'Total', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='payment' /> },
  ]

  return (
    <AdminTablePage
      title='Orders'
      subtitle='Manage orders and fulfillment.'
      data={MOCK_ADMIN_ORDERS}
      columns={columns}
      defaultSort={{ key: 'placedAt', direction: 'desc' }}
      searchableKeys={['id', 'orderNumber', 'customer', 'status']}
      pageSize={10}
    />
  )
}

