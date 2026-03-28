import type { AdminCampaignRow, AdminLeadRow, AdminSmartListRow, AdminTemplateRow } from './types'

export const MOCK_ADMIN_LEADS: AdminLeadRow[] = [
  {
    id: 'lead_5001',
    name: 'Ava Martinez',
    email: 'ava.m@example.com',
    phone: '(555) 010-1212',
    source: 'Website',
    stage: 'new',
    createdAt: '2026-03-22',
    owner: 'Jordan',
  },
  {
    id: 'lead_5002',
    name: 'Noah Patel',
    email: 'noah.patel@example.com',
    phone: '(555) 010-3434',
    source: 'Referral',
    stage: 'qualified',
    createdAt: '2026-03-18',
    owner: 'Sam',
  },
  {
    id: 'lead_5003',
    name: 'Mia Chen',
    email: 'mia.chen@example.com',
    phone: '(555) 010-9898',
    source: 'Instagram',
    stage: 'contacted',
    createdAt: '2026-03-20',
    owner: 'Jordan',
  },
  {
    id: 'lead_5004',
    name: 'Lucas Johnson',
    email: 'lucas.j@example.com',
    phone: '(555) 010-5656',
    source: 'Walk-in',
    stage: 'won',
    createdAt: '2026-03-05',
    owner: 'Taylor',
  },
]

export const MOCK_ADMIN_SMART_LISTS: AdminSmartListRow[] = [
  { id: 'sl_7001', name: 'New leads (7d)', audienceSize: 18, updatedAt: '2026-03-23' },
  { id: 'sl_7002', name: 'Inactive clients (90d)', audienceSize: 44, updatedAt: '2026-03-21' },
  { id: 'sl_7003', name: 'Birthday month', audienceSize: 27, updatedAt: '2026-03-19' },
]

export const MOCK_ADMIN_TEMPLATES: AdminTemplateRow[] = [
  { id: 'tpl_8001', name: 'Welcome email', channel: 'email', updatedAt: '2026-03-10', status: 'active' },
  { id: 'tpl_8002', name: 'Trial follow-up', channel: 'sms', updatedAt: '2026-03-12', status: 'draft' },
  { id: 'tpl_8003', name: 'Membership renewal', channel: 'email', updatedAt: '2026-03-08', status: 'active' },
]

export const MOCK_ADMIN_CAMPAIGNS: AdminCampaignRow[] = [
  {
    id: 'cmp_9001',
    name: 'Spring promo',
    channel: 'email',
    status: 'running',
    startedAt: '2026-03-15',
    sends: 820,
    replies: 37,
  },
  {
    id: 'cmp_9002',
    name: 'Trial conversion',
    channel: 'sms',
    status: 'paused',
    startedAt: '2026-03-01',
    sends: 310,
    replies: 22,
  },
]

