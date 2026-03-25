import type { AdminCouponRow, AdminOrderRow, AdminPosRow } from './types'

export const MOCK_ADMIN_ORDERS: AdminOrderRow[] = [
  { id: 'ord_1001', orderNumber: 'DT-ORD-1001', customer: 'Johnson Family', placedAt: '2026-03-22', total: 68, status: 'paid' },
  { id: 'ord_1002', orderNumber: 'DT-ORD-1002', customer: 'Chen Family', placedAt: '2026-03-21', total: 42, status: 'pending' },
  { id: 'ord_1003', orderNumber: 'DT-ORD-1003', customer: 'Parker Family', placedAt: '2026-03-18', total: 120, status: 'refunded' },
]

export const MOCK_ADMIN_COUPONS: AdminCouponRow[] = [
  { id: 'cpn_2001', code: 'SPRING10', discount: '10% off', startsAt: '2026-03-01', endsAt: '2026-04-01', status: 'active' },
  { id: 'cpn_2002', code: 'WELCOME5', discount: '$5 off', startsAt: '2025-10-01', endsAt: '2026-01-01', status: 'expired' },
]

export const MOCK_ADMIN_POS: AdminPosRow[] = [
  { id: 'pos_3001', openedAt: '2026-03-22 09:00', staff: 'Sam Rivera', sales: 420, refunds: 15, net: 405 },
  { id: 'pos_3002', openedAt: '2026-03-23 09:00', staff: 'Jordan Lee', sales: 510, refunds: 0, net: 510 },
]

