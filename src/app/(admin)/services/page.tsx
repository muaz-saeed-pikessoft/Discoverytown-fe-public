'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

export default function AdminServicesPage() {
  return (
    <div>
      <PageHeader title='Services' subtitle='Manage services and offerings.' />
      <EmptyState title='Coming soon' description='Services configuration will be available here.' />
    </div>
  )
}

