export * from '@/types/scheduling.shared'

/**
 * Legacy admin scheduling table row type (temporary).
 * The existing `src/app/(admin)/scheduling/*` stubs reference this shape.
 * It will be removed once the real Scheduling UI is implemented.
 */
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

