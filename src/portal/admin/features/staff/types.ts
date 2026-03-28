export type StaffStatus = 'active' | 'inactive'

export interface AdminStaffRow {
  id: string
  name: string
  role: string
  email: string
  status: StaffStatus
}

export interface AdminTimeClockRow {
  id: string
  staff: string
  date: string
  clockIn: string
  clockOut: string
  hours: number
}

export interface AdminPayrollRow {
  id: string
  period: string
  staff: string
  hours: number
  rate: number
  gross: number
  status: 'draft' | 'processed'
}

export interface AdminLeaveRow {
  id: string
  staff: string
  type: 'pto' | 'sick' | 'unpaid'
  from: string
  to: string
  status: 'requested' | 'approved' | 'denied'
}

