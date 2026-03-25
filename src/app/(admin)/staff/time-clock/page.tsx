'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_TIME_CLOCK } from '@/portal/admin/features/staff/constants'
import type { AdminTimeClockRow } from '@/portal/admin/features/staff/types'

export default function AdminStaffTimeClockPage() {
  const columns: TableColumn<AdminTimeClockRow>[] = [
    { key: 'staff', label: 'Staff', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'clockIn', label: 'Clock in', sortable: true },
    { key: 'clockOut', label: 'Clock out', sortable: true },
    { key: 'hours', label: 'Hours', sortable: true, align: 'right' },
  ]

  return (
    <AdminTablePage
      title='Time clock'
      subtitle='Track hours and shifts.'
      data={MOCK_ADMIN_TIME_CLOCK}
      columns={columns}
      defaultSort={{ key: 'date', direction: 'desc' }}
      searchableKeys={['id', 'staff', 'date']}
      pageSize={10}
    />
  )
}

