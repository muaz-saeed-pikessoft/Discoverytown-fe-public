export type ClientStatus = 'active' | 'inactive'

export interface AdminFamilyRow {
  id: string
  familyName: string
  primaryEmail: string
  phone: string
  memberSince: string
  status: ClientStatus
  tags: string
}

export interface AdminWaiverRow {
  id: string
  familyName: string
  signedAt: string
  expiresAt: string
  status: 'valid' | 'expired' | 'pending'
}

