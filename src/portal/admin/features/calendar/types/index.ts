import type { BookingStatus } from '@/types/scheduling.shared'

export type {
  AvailabilityCell,
  AvailabilityCellSlot,
  ConflictResult,
  ServiceSlot,
  SlotStatus,
} from '@/types/scheduling.shared'

export interface PrivateHireRequestFilters {
  status?: BookingStatus | 'ALL'
  search?: string
  page?: number
  limit?: number
}

export interface ReviewPrivateHireInput {
  /** Approve / reject; omit for internal-notes-only updates. */
  status?: 'CONFIRMED' | 'CANCELLED'
  depositAmount?: string
  internalNotes?: string
  reason?: string
}
