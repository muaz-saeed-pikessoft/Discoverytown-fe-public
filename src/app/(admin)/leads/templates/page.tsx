'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_TEMPLATES } from '@/portal/admin/features/leads/constants'
import type { AdminTemplateRow } from '@/portal/admin/features/leads/types'

export default function AdminLeadsTemplatesPage() {
  const columns: TableColumn<AdminTemplateRow>[] = [
    { key: 'name', label: 'Template', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'updatedAt', label: 'Updated', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='lead' /> },
  ]

  return (
    <AdminTablePage
      title='Templates'
      subtitle='Message and email templates.'
      data={MOCK_ADMIN_TEMPLATES}
      columns={columns}
      defaultSort={{ key: 'updatedAt', direction: 'desc' }}
      searchableKeys={['id', 'name', 'channel', 'status']}
      pageSize={10}
    />
  )
}

