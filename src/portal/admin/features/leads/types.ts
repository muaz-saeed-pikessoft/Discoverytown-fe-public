export type LeadStage = 'new' | 'contacted' | 'qualified' | 'won' | 'lost'

export interface AdminLeadRow {
  id: string
  name: string
  email: string
  phone: string
  source: string
  stage: LeadStage
  createdAt: string
  owner: string
}

export interface AdminSmartListRow {
  id: string
  name: string
  audienceSize: number
  updatedAt: string
}

export interface AdminTemplateRow {
  id: string
  name: string
  channel: 'email' | 'sms'
  updatedAt: string
  status: 'active' | 'draft'
}

export interface AdminCampaignRow {
  id: string
  name: string
  channel: 'email' | 'sms'
  status: 'running' | 'paused' | 'completed'
  startedAt: string
  sends: number
  replies: number
}

