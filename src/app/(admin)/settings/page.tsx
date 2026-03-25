'use client'

import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'

export default function AdminSettingsPage() {
  const data = [
    { id: 'set_1', key: 'Timezone', value: 'America/New_York', scope: 'Organization' },
    { id: 'set_2', key: 'Currency', value: 'USD', scope: 'Organization' },
    { id: 'set_3', key: 'Email sender', value: 'noreply@discoverytown.test', scope: 'Notifications' },
    { id: 'set_4', key: 'SMS sender', value: '+1 (555) 010-0000', scope: 'Notifications' },
  ] as const

  type Row = (typeof data)[number]

  const columns: TableColumn<Row>[] = [
    { key: 'scope', label: 'Scope', sortable: true },
    { key: 'key', label: 'Setting', sortable: true },
    { key: 'value', label: 'Value', sortable: false },
  ]

  return (
    <AdminTablePage
      title='Settings'
      subtitle='Admin settings and preferences.'
      data={[...data]}
      columns={columns}
      defaultSort={{ key: 'scope', direction: 'asc' }}
      searchableKeys={['scope', 'key', 'value', 'id']}
      pageSize={10}
    />
  )
}

