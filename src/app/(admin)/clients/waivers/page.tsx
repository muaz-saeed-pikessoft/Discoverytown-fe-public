'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_WAIVERS } from '@/portal/admin/features/clients/constants'
import type { AdminWaiverRow } from '@/portal/admin/features/clients/types'

export default function AdminClientsWaiversPage() {
  const columns: TableColumn<AdminWaiverRow>[] = [
    { key: 'familyName', label: 'Family', sortable: true },
    { key: 'signedAt', label: 'Signed', sortable: true },
    { key: 'expiresAt', label: 'Expires', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='membership' /> },
  ]

  return (
    <AdminTablePage
      title='Waivers'
      subtitle='Manage signed waivers and expirations.'
      data={MOCK_ADMIN_WAIVERS}
      columns={columns}
      defaultSort={{ key: 'expiresAt', direction: 'asc' }}
      searchableKeys={['id', 'familyName', 'status', 'signedAt', 'expiresAt']}
      pageSize={10}
    />
  )
}

