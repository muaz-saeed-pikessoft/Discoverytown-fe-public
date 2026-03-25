'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_EVENTS } from '@/portal/admin/features/scheduling/constants'
import type { AdminEventRow } from '@/portal/admin/features/scheduling/types'

export default function AdminSchedulingPage() {
  const columns: TableColumn<AdminEventRow>[] = [
    { key: 'name', label: 'Event', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'startAt', label: 'Start', sortable: true },
    { key: 'endAt', label: 'End', sortable: true },
    { key: 'capacity', label: 'Capacity', sortable: true, align: 'right' },
    { key: 'booked', label: 'Booked', sortable: true, align: 'right' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v: unknown) => <StatusBadge status={String(v ?? '')} variant='booking' />,
    },
  ]

  return (
    <AdminTablePage
      title='Scheduling'
      subtitle='Manage events and availability.'
      data={MOCK_ADMIN_EVENTS}
      columns={columns}
      defaultSort={{ key: 'startAt', direction: 'asc' }}
      searchableKeys={['id', 'name', 'location', 'status']}
      pageSize={8}
    />
  )
}

