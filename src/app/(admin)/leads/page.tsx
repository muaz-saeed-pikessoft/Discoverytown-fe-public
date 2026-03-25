'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_LEADS } from '@/portal/admin/features/leads/constants'
import type { AdminLeadRow } from '@/portal/admin/features/leads/types'

export default function AdminLeadsPage() {
  const columns: TableColumn<AdminLeadRow>[] = [
    { key: 'name', label: 'Lead', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'stage', label: 'Stage', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='lead' /> },
  ]

  return (
    <AdminTablePage
      title='Leads'
      subtitle='Track lead pipeline and outreach.'
      data={MOCK_ADMIN_LEADS}
      columns={columns}
      defaultSort={{ key: 'createdAt', direction: 'desc' }}
      searchableKeys={['id', 'name', 'email', 'phone', 'source', 'stage', 'owner']}
      pageSize={10}
    />
  )
}

