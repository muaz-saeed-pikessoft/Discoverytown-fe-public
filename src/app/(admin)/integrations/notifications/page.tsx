'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_NOTIFICATIONS } from '@/portal/admin/features/integrations/constants'
import type { AdminNotificationRow } from '@/portal/admin/features/integrations/types'

export default function AdminIntegrationsNotificationsPage() {
  const columns: TableColumn<AdminNotificationRow>[] = [
    { key: 'name', label: 'Notification', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'enabled', label: 'Enabled', sortable: true, render: v => (v ? 'Yes' : 'No') },
    { key: 'updatedAt', label: 'Updated', sortable: true },
  ]

  return (
    <AdminTablePage
      title='Notifications'
      subtitle='Notification templates and channels.'
      data={MOCK_ADMIN_NOTIFICATIONS}
      columns={columns}
      defaultSort={{ key: 'updatedAt', direction: 'desc' }}
      searchableKeys={['id', 'name', 'channel']}
      pageSize={10}
    />
  )
}

