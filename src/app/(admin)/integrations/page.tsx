'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_INTEGRATIONS } from '@/portal/admin/features/integrations/constants'
import type { AdminIntegrationRow } from '@/portal/admin/features/integrations/types'

export default function AdminIntegrationsPage() {
  const columns: TableColumn<AdminIntegrationRow>[] = [
    { key: 'name', label: 'Integration', sortable: true },
    { key: 'provider', label: 'Provider', sortable: true },
    { key: 'updatedAt', label: 'Updated', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='membership' /> },
  ]

  return (
    <AdminTablePage
      title='Integrations'
      subtitle='Connect external tools and services.'
      data={MOCK_ADMIN_INTEGRATIONS}
      columns={columns}
      defaultSort={{ key: 'updatedAt', direction: 'desc' }}
      searchableKeys={['id', 'name', 'provider', 'status']}
      pageSize={10}
    />
  )
}

