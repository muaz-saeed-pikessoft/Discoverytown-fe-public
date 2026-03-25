'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

export default function AdminInventoryProductsPage() {
  return (
    <div>
      <PageHeader title='Products' subtitle='Manage inventory products.' />
      <EmptyState title='Coming soon' description='Product management will be available here.' />
    </div>
  )
}

