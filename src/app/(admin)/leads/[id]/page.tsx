'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

interface AdminLeadDetailPageProps {
  params: { id: string }
}

export default function AdminLeadDetailPage({ params }: AdminLeadDetailPageProps) {
  return (
    <div>
      <PageHeader title='Lead' subtitle={`Lead ID: ${params.id}`} />
      <EmptyState title='Coming soon' description='Lead detail will be available here.' />
    </div>
  )
}

