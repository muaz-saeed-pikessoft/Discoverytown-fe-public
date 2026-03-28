export interface AdminOrderRow {
  id: string
  orderNumber: string
  customer: string
  placedAt: string
  total: number
  status: 'paid' | 'pending' | 'refunded'
}

export interface AdminCouponRow {
  id: string
  code: string
  discount: string
  startsAt: string
  endsAt: string
  status: 'active' | 'expired'
}

export interface AdminPosRow {
  id: string
  openedAt: string
  staff: string
  sales: number
  refunds: number
  net: number
}

