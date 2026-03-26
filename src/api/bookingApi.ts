/**
 * Booking API service.
 *
 * Handles all booking-related API operations via Axios.
 * MSW intercepts these calls in development; real backend handles them in production.
 *
 * API-READY: Only endpoint URLs need to change for production.
 */

import {
  adaptBookings,
  adaptBooking,
  adaptTimeSlots,
  adaptClasses,
  adaptEvents,
  adaptPartyPackages,
  adaptEventsPageCatalog,
  parsePartyPackagesPayload,
} from '@/data/adapters/bookingAdapter'
import type {
  RawBookingResponse,
  RawTimeSlotResponse,
  RawClassEventResponse,
  RawSpecialEventResponse,
  RawPartyPackagesApiPayload,
} from '@/data/adapters/bookingAdapter'
import type {
  BookingRecord,
  ClassEvent,
  EventsPageCatalog,
  PartyPackage,
  SpecialEvent,
  TimeSlot,
} from '@/types/booking-types'

import apiClient from './client'

/** Booking list filter parameters */
export interface BookingListParams {
  status?: string
  page?: number
  limit?: number
  order?: 'asc' | 'desc'
}

/**
 * Fetch bookings for the current user.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getBookings(
  params?: BookingListParams,
): Promise<BookingRecord[]> {
  const { data } = await apiClient.get<RawBookingResponse[]>(
    '/api/bookings',
    { params },
  )

  return adaptBookings(data)
}

/**
 * Cancel a booking by ID.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function cancelBooking(
  bookingId: string,
): Promise<BookingRecord | null> {
  const { data } = await apiClient.patch<RawBookingResponse>(
    `/api/bookings/${bookingId}/cancel`,
  )

  return adaptBooking(data)
}

/**
 * Fetch available time slots for a given date range.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getTimeSlots(
  startDate?: string,
  endDate?: string,
): Promise<TimeSlot[]> {
  const { data } = await apiClient.get<RawTimeSlotResponse[]>(
    '/api/time-slots',
    { params: { start_date: startDate, end_date: endDate } },
  )

  return adaptTimeSlots(data)
}

/**
 * Fetch available classes.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getClasses(): Promise<ClassEvent[]> {
  const { data } = await apiClient.get<RawClassEventResponse[]>(
    '/api/classes',
  )

  return adaptClasses(data)
}

/**
 * Fetch special events.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getEvents(): Promise<SpecialEvent[]> {
  const { data } = await apiClient.get<RawSpecialEventResponse[]>(
    '/api/events',
  )

  return adaptEvents(data)
}

/**
 * Fetch party packages.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getPartyPackages(): Promise<PartyPackage[]> {
  const { data } = await apiClient.get<RawPartyPackagesApiPayload>('/api/party-packages')
  const { packages } = parsePartyPackagesPayload(data)
  return adaptPartyPackages(packages)
}

/**
 * Party packages plus optional Events page catalog (add-ons, takeout, we-bring).
 * Backend may return `{ packages, events_page }` or a legacy array.
 */
export async function getEventsPartyPageData(): Promise<{
  packages: PartyPackage[]
  catalog: EventsPageCatalog | null
}> {
  const { data } = await apiClient.get<RawPartyPackagesApiPayload>('/api/party-packages')
  const { packages, eventsPageRaw } = parsePartyPackagesPayload(data)
  return {
    packages: adaptPartyPackages(packages),
    catalog: eventsPageRaw ? adaptEventsPageCatalog(eventsPageRaw) : null,
  }
}
/**
 * Submit a new booking request.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function createBooking(
  bookingData: any,
): Promise<BookingRecord> {
  const { data } = await apiClient.post<RawBookingResponse>(
    '/api/bookings',
    bookingData,
  )

  return adaptBooking(data)
}
