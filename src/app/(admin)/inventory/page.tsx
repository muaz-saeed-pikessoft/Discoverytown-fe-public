'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

export default function AdminInventoryPage() {
  return (
    <div>
      <PageHeader title='Inventory' subtitle='Manage products and orders.' />
      <EmptyState title='Coming soon' description='Inventory module will be available here.' />
    </div>
  )
}

