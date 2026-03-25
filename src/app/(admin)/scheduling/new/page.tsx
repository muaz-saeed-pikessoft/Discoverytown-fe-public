'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

export default function AdminSchedulingNewPage() {
  return (
    <div>
      <PageHeader title='New event' subtitle='Create a new event.' />
      <EmptyState title='Coming soon' description='Event creation flow will be available here.' />
    </div>
  )
}

