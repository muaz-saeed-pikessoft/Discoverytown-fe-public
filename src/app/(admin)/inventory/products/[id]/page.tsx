'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

interface AdminInventoryProductDetailPageProps {
  params: { id: string }
}

export default function AdminInventoryProductDetailPage({ params }: AdminInventoryProductDetailPageProps) {
  return (
    <div>
      <PageHeader title='Product' subtitle={`Product ID: ${params.id}`} />
      <EmptyState title='Coming soon' description='Product detail will be available here.' />
    </div>
  )
}

