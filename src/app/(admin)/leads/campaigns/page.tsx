'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_CAMPAIGNS } from '@/portal/admin/features/leads/constants'
import type { AdminCampaignRow } from '@/portal/admin/features/leads/types'

export default function AdminLeadsCampaignsPage() {
  const columns: TableColumn<AdminCampaignRow>[] = [
    { key: 'name', label: 'Campaign', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'startedAt', label: 'Started', sortable: true },
    { key: 'sends', label: 'Sends', sortable: true, align: 'right' },
    { key: 'replies', label: 'Replies', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='lead' /> },
  ]

  return (
    <AdminTablePage
      title='Campaigns'
      subtitle='Automate outreach and follow-ups.'
      data={MOCK_ADMIN_CAMPAIGNS}
      columns={columns}
      defaultSort={{ key: 'startedAt', direction: 'desc' }}
      searchableKeys={['id', 'name', 'channel', 'status']}
      pageSize={10}
    />
  )
}

