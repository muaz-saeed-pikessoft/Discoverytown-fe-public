'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_REVENUE } from '@/portal/admin/features/reports/constants'
import type { AdminRevenueRow } from '@/portal/admin/features/reports/types'

export default function AdminReportsRevenuePage() {
  const columns: TableColumn<AdminRevenueRow>[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'gross', label: 'Gross', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'refunds', label: 'Refunds', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'net', label: 'Net', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
  ]

  return (
    <AdminTablePage
      title='Revenue'
      subtitle='Track revenue over time.'
      data={MOCK_ADMIN_REVENUE}
      columns={columns}
      defaultSort={{ key: 'date', direction: 'desc' }}
      searchableKeys={['id', 'date']}
      pageSize={10}
    />
  )
}

