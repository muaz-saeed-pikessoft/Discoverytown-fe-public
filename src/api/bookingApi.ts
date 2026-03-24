/**
 * Booking API service.
 * Handles all booking-related API operations.
 *
 * Currently returns mock data through adapters.
 * When backend is ready: replace mock returns with apiClient calls.
 */

import type {
  BookingRecord,
  BookingStatus,
  CustomerProfile,
  TimeSlot,
  ClassEvent,
  SpecialEvent,
  PartyPackage,
} from '@/types/booking-types'
import { MOCK_BOOKINGS, MOCK_TIME_SLOTS, MOCK_CLASSES, MOCK_EVENTS, MOCK_PARTY_PACKAGES } from '@/data/mockData'

// import apiClient from './client'

/** Booking list filter parameters */
export interface BookingListParams {
  status?: BookingStatus
  page?: number
  limit?: number
  order?: 'asc' | 'desc'
}

/**
 * Fetch bookings for the current user.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<BookingRecord[]>('/bookings', { params })
 *   return data
 */
export async function getBookings(params?: BookingListParams): Promise<BookingRecord[]> {
  let result = [...MOCK_BOOKINGS]

  if (params?.status) {
    result = result.filter(booking => booking.status === params.status)
  }

  return result
}

/**
 * Cancel a booking by ID.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.patch<BookingRecord>(`/bookings/${bookingId}/cancel`)
 *   return data
 */
export async function cancelBooking(bookingId: string): Promise<BookingRecord | null> {
  const booking = MOCK_BOOKINGS.find(b => b.id === bookingId)

  if (!booking) return null

  return { ...booking, status: 'cancelled' }
}

/**
 * Fetch available time slots for a given date range.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<TimeSlot[]>('/time-slots', { params: { startDate, endDate } })
 *   return data
 */
export async function getTimeSlots(startDate?: string, endDate?: string): Promise<TimeSlot[]> {
  void startDate
  void endDate

  return [...MOCK_TIME_SLOTS]
}

/**
 * Fetch available classes.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<ClassEvent[]>('/classes')
 *   return data
 */
export async function getClasses(): Promise<ClassEvent[]> {
  return [...MOCK_CLASSES]
}

/**
 * Fetch special events.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<SpecialEvent[]>('/events')
 *   return data
 */
export async function getEvents(): Promise<SpecialEvent[]> {
  return [...MOCK_EVENTS]
}

/**
 * Fetch party packages.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<PartyPackage[]>('/party-packages')
 *   return data
 */
export async function getPartyPackages(): Promise<PartyPackage[]> {
  return [...MOCK_PARTY_PACKAGES]
}
