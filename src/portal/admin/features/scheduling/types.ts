export type AdminEventStatus = 'draft' | 'published' | 'cancelled'

export interface AdminEventRow {
  id: string
  name: string
  startAt: string
  endAt: string
  location: string
  capacity: number
  booked: number
  status: AdminEventStatus
}

