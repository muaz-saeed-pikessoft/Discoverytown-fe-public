'use client'

import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { MOCK_ADMIN_COUPONS } from '@/portal/admin/features/inventory/constants'
import type { AdminCouponRow } from '@/portal/admin/features/inventory/types'

export default function AdminInventoryCouponsPage() {
  const columns: TableColumn<AdminCouponRow>[] = [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'discount', label: 'Discount', sortable: false },
    { key: 'startsAt', label: 'Starts', sortable: true },
    { key: 'endsAt', label: 'Ends', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: v => <StatusBadge status={String(v ?? '')} variant='membership' /> },
  ]

  return (
    <AdminTablePage
      title='Coupons'
      subtitle='Manage promo codes and discounts.'
      data={MOCK_ADMIN_COUPONS}
      columns={columns}
      defaultSort={{ key: 'endsAt', direction: 'desc' }}
      searchableKeys={['id', 'code', 'discount', 'status']}
      pageSize={10}
    />
  )
}

