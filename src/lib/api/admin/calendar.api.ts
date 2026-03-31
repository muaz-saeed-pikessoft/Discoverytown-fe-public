import apiClient from '@/api/client'
import type { PaginatedResponse } from '@/types/api.types'
import type { AvailabilityCell, Booking, BookingStatus, ConflictResult, ServiceSlot } from '@/types/scheduling.shared'
import { BookingType } from '@/types/scheduling.shared'
import type { PrivateHireRequestFilters, ReviewPrivateHireInput } from '@/portal/admin/features/calendar/types'

import { getBookings, getCalendarSlots } from '@/lib/api/admin/scheduling.api'

export async function getAdminCalendar(params: {
  locationId: string | null
  from: string
  to: string
  staffId?: string | null
}): Promise<ServiceSlot[]> {
  return getCalendarSlots(params.locationId, params.from, params.to, params.staffId)
}

export async function getAvailabilityGrid(locationId: string, from: string, to: string): Promise<AvailabilityCell[]> {
  const response = await apiClient.get<AvailabilityCell[]>('/api/v1/admin/scheduling/calendar/availability', {
    params: { locationId, from, to },
  })
  return response.data
}

export async function getPrivateHireRequests(params: PrivateHireRequestFilters): Promise<PaginatedResponse<Booking>> {
  const status: BookingStatus[] | undefined =
    params.status === 'ALL' || params.status == null ? undefined : [params.status as BookingStatus]
  return getBookings({
    bookingType: [BookingType.PRIVATE_HIRE],
    status,
    search: params.search,
    page: params.page,
    limit: params.limit,
  })
}

export async function reviewPrivateHireRequest(id: string, input: ReviewPrivateHireInput): Promise<Booking> {
  const response = await apiClient.patch<Booking>(`/api/v1/admin/scheduling/bookings/${id}/review`, input)
  return response.data
}

export async function getInstructorCalendar(staffId: string, from: string, to: string): Promise<ServiceSlot[]> {
  return getCalendarSlots(null, from, to, staffId)
}

export async function getConflicts(
  locationId: string,
  startAt: string,
  endAt: string,
  excludeSlotId?: string
): Promise<ConflictResult> {
  const response = await apiClient.get<ConflictResult>('/api/v1/admin/scheduling/conflicts', {
    params: { locationId, startAt, endAt, excludeSlotId: excludeSlotId ?? undefined },
  })
  return response.data
}
