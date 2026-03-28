import type { AdminLeaveRow, AdminPayrollRow, AdminStaffRow, AdminTimeClockRow } from './types'

export const MOCK_ADMIN_STAFF: AdminStaffRow[] = [
  { id: 'stf_1001', name: 'Jordan Lee', role: 'Manager', email: 'jordan@example.com', status: 'active' },
  { id: 'stf_1002', name: 'Sam Rivera', role: 'Front Desk', email: 'sam@example.com', status: 'active' },
  { id: 'stf_1003', name: 'Taylor Chen', role: 'Coach', email: 'taylor@example.com', status: 'inactive' },
]

export const MOCK_ADMIN_TIME_CLOCK: AdminTimeClockRow[] = [
  { id: 'tc_2001', staff: 'Jordan Lee', date: '2026-03-22', clockIn: '09:02', clockOut: '17:12', hours: 8.2 },
  { id: 'tc_2002', staff: 'Sam Rivera', date: '2026-03-22', clockIn: '10:01', clockOut: '18:05', hours: 8.1 },
  { id: 'tc_2003', staff: 'Jordan Lee', date: '2026-03-23', clockIn: '09:10', clockOut: '16:58', hours: 7.8 },
]

export const MOCK_ADMIN_PAYROLL: AdminPayrollRow[] = [
  { id: 'pay_3001', period: '2026-03-01 → 2026-03-15', staff: 'Jordan Lee', hours: 78, rate: 28, gross: 2184, status: 'processed' },
  { id: 'pay_3002', period: '2026-03-01 → 2026-03-15', staff: 'Sam Rivera', hours: 72, rate: 19, gross: 1368, status: 'processed' },
  { id: 'pay_3003', period: '2026-03-16 → 2026-03-31', staff: 'Jordan Lee', hours: 40, rate: 28, gross: 1120, status: 'draft' },
]

export const MOCK_ADMIN_LEAVE: AdminLeaveRow[] = [
  { id: 'lv_4001', staff: 'Sam Rivera', type: 'pto', from: '2026-04-02', to: '2026-04-03', status: 'requested' },
  { id: 'lv_4002', staff: 'Jordan Lee', type: 'sick', from: '2026-03-10', to: '2026-03-10', status: 'approved' },
  { id: 'lv_4003', staff: 'Taylor Chen', type: 'unpaid', from: '2026-03-05', to: '2026-03-06', status: 'denied' },
]

