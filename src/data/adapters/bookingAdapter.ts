/**
 * Booking data adapter.
 *
 * Transforms raw API responses into application-level types.
 * When backend is ready, only this file needs to map new field names.
 */

import type { BookingRecord, BookingStatus, BookingType } from '@/types/booking-types'

/** Raw API booking shape (predicted backend contract) */
export interface RawBookingResponse {
  id: string
  booking_type: string
  title: string
  scheduled_date: string
  time_range: string
  status: string
  total_amount: number
  confirmation_code: string
  guests: Array<{
    id: string
    full_name: string
    age: number
    relationship: string
  }>
}

/**
 * Transform a raw API booking response into the app-level BookingRecord.
 * Currently a pass-through since we use mock data,
 * but this is the exact place to map snake_case → camelCase when API arrives.
 */
export function adaptBooking(raw: RawBookingResponse): BookingRecord {
  return {
    id: raw.id,
    type: raw.booking_type as BookingType,
    title: raw.title,
    date: raw.scheduled_date,
    time: raw.time_range,
    status: raw.status as BookingStatus,
    amount: raw.total_amount,
    confirmationCode: raw.confirmation_code,
    guests: raw.guests.map(guest => ({
      id: guest.id,
      name: guest.full_name,
      age: guest.age,
      relationship: guest.relationship,
    })),
  }
}

/**
 * Adapt a list of raw booking responses.
 */
export function adaptBookings(raw: RawBookingResponse[]): BookingRecord[] {
  return raw.map(adaptBooking)
}

/**
 * Adapt mock data to match BookingRecord (identity transform).
 * Exists so BookingPageClient doesn't need to know the data source.
 */
export function adaptMockBooking(mock: BookingRecord): BookingRecord {
  return { ...mock }
}
