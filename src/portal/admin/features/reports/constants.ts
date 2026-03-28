import type { AdminClientReportRow, AdminInvoiceRow, AdminRevenueRow } from './types'

export const MOCK_ADMIN_REVENUE: AdminRevenueRow[] = [
  { id: 'rev_1', date: '2026-03-18', gross: 2140, refunds: 80, net: 2060 },
  { id: 'rev_2', date: '2026-03-19', gross: 1850, refunds: 0, net: 1850 },
  { id: 'rev_3', date: '2026-03-20', gross: 2680, refunds: 120, net: 2560 },
  { id: 'rev_4', date: '2026-03-21', gross: 1925, refunds: 35, net: 1890 },
  { id: 'rev_5', date: '2026-03-22', gross: 3010, refunds: 0, net: 3010 },
]

export const MOCK_ADMIN_CLIENT_REPORTS: AdminClientReportRow[] = [
  { id: 'seg_1', segment: 'Members', clients: 124, bookings: 312, revenue: 18420 },
  { id: 'seg_2', segment: 'Non-members', clients: 211, bookings: 287, revenue: 14290 },
  { id: 'seg_3', segment: 'New last 30 days', clients: 38, bookings: 41, revenue: 2190 },
  { id: 'seg_4', segment: 'High-value', clients: 16, bookings: 58, revenue: 9760 },
]

export const MOCK_ADMIN_INVOICES: AdminInvoiceRow[] = [
  {
    id: 'inv_9001',
    invoiceNumber: 'DT-000901',
    client: 'Johnson Family',
    issuedAt: '2026-03-10',
    dueAt: '2026-03-17',
    amount: 320,
    status: 'paid',
  },
  {
    id: 'inv_9002',
    invoiceNumber: 'DT-000902',
    client: 'Chen Family',
    issuedAt: '2026-03-12',
    dueAt: '2026-03-19',
    amount: 180,
    status: 'pending',
  },
  {
    id: 'inv_9003',
    invoiceNumber: 'DT-000903',
    client: 'Rodriguez Family',
    issuedAt: '2026-02-20',
    dueAt: '2026-02-27',
    amount: 260,
    status: 'overdue',
  },
]

