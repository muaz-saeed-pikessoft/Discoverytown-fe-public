import type { AdminFamilyRow, AdminWaiverRow } from './types'

export const MOCK_ADMIN_FAMILIES: AdminFamilyRow[] = [
  {
    id: 'fam_2001',
    familyName: 'Johnson Family',
    primaryEmail: 'sarah.johnson@example.com',
    phone: '(555) 013-2222',
    memberSince: '2024-10-12',
    status: 'active',
    tags: 'vip, referrals',
  },
  {
    id: 'fam_2002',
    familyName: 'Chen Family',
    primaryEmail: 'michael.chen@example.com',
    phone: '(555) 019-1001',
    memberSince: '2025-02-03',
    status: 'active',
    tags: 'classes',
  },
  {
    id: 'fam_2003',
    familyName: 'Rodriguez Family',
    primaryEmail: 'elena.rodriguez@example.com',
    phone: '(555) 015-8888',
    memberSince: '2023-07-22',
    status: 'inactive',
    tags: 'waiver-expired',
  },
  {
    id: 'fam_2004',
    familyName: 'Parker Family',
    primaryEmail: 's.parker@example.com',
    phone: '(555) 010-4455',
    memberSince: '2025-11-01',
    status: 'active',
    tags: 'birthday, party',
  },
]

export const MOCK_ADMIN_WAIVERS: AdminWaiverRow[] = [
  { id: 'wvr_3001', familyName: 'Johnson Family', signedAt: '2026-01-11', expiresAt: '2027-01-11', status: 'valid' },
  { id: 'wvr_3002', familyName: 'Rodriguez Family', signedAt: '2024-02-20', expiresAt: '2025-02-20', status: 'expired' },
  { id: 'wvr_3003', familyName: 'Chen Family', signedAt: '—', expiresAt: '—', status: 'pending' },
]

