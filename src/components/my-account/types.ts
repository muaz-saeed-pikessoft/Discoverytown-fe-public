import type { BookingRecord } from '@/types/booking-types'

export interface BookingTableProps {
  bookings: BookingRecord[]
  activeTab: 'upcoming' | 'history' | 'profile' | 'guests'
  openCancelModal?: (booking: BookingRecord) => void
}

export type AccountTab = 'upcoming' | 'history' | 'profile' | 'guests'
