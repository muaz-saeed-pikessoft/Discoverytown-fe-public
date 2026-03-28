export interface AdminRevenueRow {
  id: string
  date: string
  gross: number
  refunds: number
  net: number
}

export interface AdminInvoiceRow {
  id: string
  invoiceNumber: string
  client: string
  issuedAt: string
  dueAt: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
}

export interface AdminClientReportRow {
  id: string
  segment: string
  clients: number
  bookings: number
  revenue: number
}

