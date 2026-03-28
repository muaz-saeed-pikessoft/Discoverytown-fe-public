'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

interface AdminClientDetailPageProps {
  params: { id: string }
}

export default function AdminClientDetailPage({ params }: AdminClientDetailPageProps) {
  return (
    <div>
      <PageHeader title='Client' subtitle={`Client ID: ${params.id}`} />
      <EmptyState title='Coming soon' description='Client detail will be available here.' />
    </div>
  )
}

