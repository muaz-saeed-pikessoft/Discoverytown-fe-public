'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_PAYROLL } from '@/portal/admin/features/staff/constants'
import type { AdminPayrollRow } from '@/portal/admin/features/staff/types'

export default function AdminStaffPayrollPage() {
  const columns: TableColumn<AdminPayrollRow>[] = [
    { key: 'period', label: 'Period', sortable: true },
    { key: 'staff', label: 'Staff', sortable: true },
    { key: 'hours', label: 'Hours', sortable: true, align: 'right' },
    { key: 'rate', label: 'Rate', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toFixed(2)}` },
    { key: 'gross', label: 'Gross', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='payment' /> },
  ]

  return (
    <AdminTablePage
      title='Payroll'
      subtitle='Payroll runs and exports.'
      data={MOCK_ADMIN_PAYROLL}
      columns={columns}
      defaultSort={{ key: 'period', direction: 'desc' }}
      searchableKeys={['id', 'period', 'staff', 'status']}
      pageSize={10}
    />
  )
}

