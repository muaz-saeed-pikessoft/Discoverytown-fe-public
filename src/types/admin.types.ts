export type StaffRoleEnum =
  | 'OWNER'
  | 'ADMIN'
  | 'MANAGER'
  | 'STAFF'
  | 'COACH'
  | 'FRONT_DESK'
  | 'ACCOUNTING'
  | 'REPORTS_VIEWER'

export interface Organization {
  id: string
  name: string
}

export interface StaffUser {
  staffUserId: string
  organizationId: string
  role: StaffRoleEnum
  firstName: string
  lastName: string
  email: string
}

