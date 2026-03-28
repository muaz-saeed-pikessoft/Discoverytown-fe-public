'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_CLIENT_REPORTS } from '@/portal/admin/features/reports/constants'
import type { AdminClientReportRow } from '@/portal/admin/features/reports/types'

export default function AdminReportsClientsPage() {
  const columns: TableColumn<AdminClientReportRow>[] = [
    { key: 'segment', label: 'Segment', sortable: true },
    { key: 'clients', label: 'Clients', sortable: true, align: 'right' },
    { key: 'bookings', label: 'Bookings', sortable: true, align: 'right' },
    { key: 'revenue', label: 'Revenue', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
  ]

  return (
    <AdminTablePage
      title='Client reports'
      subtitle='Client metrics and retention.'
      data={MOCK_ADMIN_CLIENT_REPORTS}
      columns={columns}
      defaultSort={{ key: 'revenue', direction: 'desc' }}
      searchableKeys={['id', 'segment']}
      pageSize={10}
    />
  )
}

