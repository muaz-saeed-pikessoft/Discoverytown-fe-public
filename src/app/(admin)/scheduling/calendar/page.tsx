'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_EVENTS } from '@/portal/admin/features/scheduling/constants'
import type { AdminEventRow } from '@/portal/admin/features/scheduling/types'

export default function AdminSchedulingCalendarPage() {
  const columns: TableColumn<AdminEventRow>[] = [
    { key: 'startAt', label: 'Start', sortable: true },
    { key: 'endAt', label: 'End', sortable: true },
    { key: 'name', label: 'Event', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'booked', label: 'Booked', sortable: true, align: 'right' },
    { key: 'capacity', label: 'Capacity', sortable: true, align: 'right' },
  ]

  return (
    <AdminTablePage
      title='Calendar'
      subtitle='View schedules across locations.'
      data={MOCK_ADMIN_EVENTS}
      columns={columns}
      defaultSort={{ key: 'startAt', direction: 'asc' }}
      searchableKeys={['id', 'name', 'location']}
      pageSize={10}
    />
  )
}

