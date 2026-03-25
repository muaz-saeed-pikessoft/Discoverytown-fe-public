'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_INVOICES } from '@/portal/admin/features/reports/constants'
import type { AdminInvoiceRow } from '@/portal/admin/features/reports/types'

export default function AdminReportsInvoicesPage() {
  const columns: TableColumn<AdminInvoiceRow>[] = [
    { key: 'invoiceNumber', label: 'Invoice', sortable: true },
    { key: 'client', label: 'Client', sortable: true },
    { key: 'issuedAt', label: 'Issued', sortable: true },
    { key: 'dueAt', label: 'Due', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right', render: v => `$${Number(v ?? 0).toLocaleString()}` },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='payment' /> },
  ]

  return (
    <AdminTablePage
      title='Invoices'
      subtitle='View and manage invoices.'
      data={MOCK_ADMIN_INVOICES}
      columns={columns}
      defaultSort={{ key: 'dueAt', direction: 'asc' }}
      searchableKeys={['id', 'invoiceNumber', 'client', 'status']}
      pageSize={10}
    />
  )
}

