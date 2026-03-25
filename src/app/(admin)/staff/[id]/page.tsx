'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

interface AdminStaffDetailPageProps {
  params: { id: string }
}

export default function AdminStaffDetailPage({ params }: AdminStaffDetailPageProps) {
  return (
    <div>
      <PageHeader title='Staff member' subtitle={`Staff ID: ${params.id}`} />
      <EmptyState title='Coming soon' description='Staff member detail will be available here.' />
    </div>
  )
}

