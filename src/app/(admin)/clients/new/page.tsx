'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

export default function AdminClientsNewPage() {
  return (
    <div>
      <PageHeader title='New client' subtitle='Add a new client or family.' />
      <EmptyState title='Coming soon' description='Client creation flow will be available here.' />
    </div>
  )
}

