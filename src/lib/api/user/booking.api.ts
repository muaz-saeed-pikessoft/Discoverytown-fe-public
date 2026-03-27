import axios from 'axios'

import apiClient from '@/api/client'
import ENV from '@/config/env'
import type { PaginatedResponse } from '@/types/api.types'
import type {
  Booking,
  BookingStatus,
  AvailableWindowsResponse,
  PublicService,
  PublicServiceSlot,
  ServiceCategory,
  ServiceType,
  WaitlistEntry,
} from '@/types/scheduling.shared'
import type {
  ConsumerCreateBookingInput,
  ConsumerCreateOpenBookingInput,
  PrivateHireInquiryInput,
  PublicSlotFilters,
} from '@/portal/user/features/booking/types'

const publicClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  adapter: 'fetch',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

function withTenant(params: Record<string, unknown> | undefined): Record<string, unknown> {
  return { ...(params ?? {}), tenantId: ENV.TENANT_ID || undefined }
}

// Public endpoints (no auth required)
export async function getPublicSlots(params: PublicSlotFilters): Promise<PublicServiceSlot[]> {
  const response = await publicClient.get<PublicServiceSlot[]>('/api/v1/calendar/public', {
    // Axios params require an index signature; our strongly-typed filter object is still a plain key/value map at runtime.
    params: withTenant(params as unknown as Record<string, unknown>),
  })
  return response.data
}

export async function getPublicSlot(id: string): Promise<PublicServiceSlot> {
  const response = await publicClient.get<PublicServiceSlot>(`/api/v1/calendar/public/${id}`, { params: withTenant(undefined) })
  return response.data
}

export async function getPublicServices(params?: { serviceType?: ServiceType; categoryId?: string }): Promise<PublicService[]> {
  const response = await publicClient.get<PublicService[]>('/api/v1/services/public', { params: withTenant(params) })
  return response.data
}

export async function getPublicServiceCategories(): Promise<ServiceCategory[]> {
  const response = await publicClient.get<ServiceCategory[]>('/api/v1/service-categories', { params: withTenant(undefined) })
  return response.data
}

export async function getPublicLocations() {
  const response = await publicClient.get('/api/v1/locations', { params: withTenant(undefined) })
  return response.data as unknown
}

// Authenticated consumer endpoints
export async function createBooking(input: ConsumerCreateBookingInput): Promise<Booking> {
  const response = await apiClient.post<Booking>('/api/v1/bookings', input)
  return response.data
}

export async function createOpenBooking(input: ConsumerCreateOpenBookingInput): Promise<Booking> {
  const response = await apiClient.post<Booking>('/api/v1/bookings', input)
  return response.data
}

export async function getOpenAvailability(serviceId: string, date: string): Promise<AvailableWindowsResponse> {
  const response = await publicClient.get<{ data: AvailableWindowsResponse }>('/api/v1/service-slots/open-availability', {
    params: withTenant({ serviceId, date }),
  })
  return response.data.data
}

export async function getMyBookings(params?: { status?: BookingStatus; page?: number; limit?: number }): Promise<PaginatedResponse<Booking>> {
  const response = await apiClient.get<PaginatedResponse<Booking>>('/api/v1/bookings/my', { params })
  return response.data
}

export async function getMyBooking(id: string): Promise<Booking> {
  const response = await apiClient.get<Booking>(`/api/v1/bookings/my/${id}`)
  return response.data
}

export async function cancelMyBooking(id: string, reason: string): Promise<void> {
  await apiClient.post(`/api/v1/bookings/my/${id}/cancel`, { reason })
}

export async function joinWaitlist(slotId: string): Promise<WaitlistEntry> {
  const response = await apiClient.post<WaitlistEntry>('/api/v1/waitlist', { slotId })
  return response.data
}

export async function leaveWaitlist(entryId: string): Promise<void> {
  await apiClient.delete(`/api/v1/waitlist/${entryId}`)
}

export async function getUpcomingBookings(): Promise<Booking[]> {
  const response = await apiClient.get<Booking[]>('/api/v1/calendar/upcoming')
  return response.data
}

export async function submitPrivateHireInquiry(input: PrivateHireInquiryInput): Promise<{ id: string; message: string }> {
  const response = await publicClient.post<{ id: string; message: string }>('/api/v1/private-hire/inquire', input, {
    params: withTenant(undefined),
  })
  return response.data
}

export async function initBookingCheckout(bookingId: string): Promise<{ clientSecret: string; amount: number }> {
  // Stubbed: backend must provide payment intent client_secret.
  const response = await apiClient.post<{ clientSecret: string; amount: number }>('/api/v1/bookings/checkout', { bookingId })
  return response.data
}

