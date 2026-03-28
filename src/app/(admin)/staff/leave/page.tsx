'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_LEAVE } from '@/portal/admin/features/staff/constants'
import type { AdminLeaveRow } from '@/portal/admin/features/staff/types'

export default function AdminStaffLeavePage() {
  const columns: TableColumn<AdminLeaveRow>[] = [
    { key: 'staff', label: 'Staff', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'from', label: 'From', sortable: true },
    { key: 'to', label: 'To', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='lead' /> },
  ]

  return (
    <AdminTablePage
      title='Leave'
      subtitle='Track PTO and leave requests.'
      data={MOCK_ADMIN_LEAVE}
      columns={columns}
      defaultSort={{ key: 'from', direction: 'desc' }}
      searchableKeys={['id', 'staff', 'type', 'status']}
      pageSize={10}
    />
  )
}

