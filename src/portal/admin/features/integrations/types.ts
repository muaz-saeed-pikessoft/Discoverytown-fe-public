export interface AdminIntegrationRow {
  id: string
  name: string
  provider: string
  status: 'connected' | 'disconnected'
  updatedAt: string
}

export interface AdminNotificationRow {
  id: string
  name: string
  channel: 'email' | 'sms' | 'push'
  enabled: boolean
  updatedAt: string
}

