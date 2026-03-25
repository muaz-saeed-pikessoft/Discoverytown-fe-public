import type { AdminIntegrationRow, AdminNotificationRow } from './types'

export const MOCK_ADMIN_INTEGRATIONS: AdminIntegrationRow[] = [
  { id: 'int_1001', name: 'Stripe', provider: 'stripe', status: 'connected', updatedAt: '2026-03-10' },
  { id: 'int_1002', name: 'Twilio', provider: 'twilio', status: 'disconnected', updatedAt: '2026-02-28' },
  { id: 'int_1003', name: 'Mailgun', provider: 'mailgun', status: 'connected', updatedAt: '2026-03-01' },
]

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotificationRow[] = [
  { id: 'ntf_2001', name: 'Booking confirmation', channel: 'email', enabled: true, updatedAt: '2026-03-12' },
  { id: 'ntf_2002', name: 'Waiver expiring', channel: 'sms', enabled: true, updatedAt: '2026-03-08' },
  { id: 'ntf_2003', name: 'Payment failed', channel: 'email', enabled: false, updatedAt: '2026-03-05' },
]

