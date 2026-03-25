'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

interface AdminSchedulingDetailPageProps {
  params: { id: string }
}

export default function AdminSchedulingDetailPage({ params }: AdminSchedulingDetailPageProps) {
  return (
    <div>
      <PageHeader title='Event' subtitle={`Event ID: ${params.id}`} />
      <EmptyState title='Coming soon' description='Event detail will be available here.' />
    </div>
  )
}

