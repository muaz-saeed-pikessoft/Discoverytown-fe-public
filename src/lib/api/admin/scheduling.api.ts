import apiClient from '@/api/client'
import type { PaginatedResponse } from '@/types/api.types'

import type {
  AddOn,
  AvailableWindowsResponse,
  Booking,
  BookingFilters,
  BookingType,
  CancelBookingInput,
  CreateAddOnInput,
  CreateLocationInput,
  CreateRecurringInput,
  CreateServiceInput,
  CreateSlotInput,
  Location,
  Service,
  ServiceCategory,
  ServiceFilters,
  ServiceSlot,
  SlotFilters,
  UpdateAddOnInput,
  UpdateLocationInput,
  UpdateServiceInput,
  UpdateSlotInput,
  WaitlistEntry,
} from '@/portal/admin/features/scheduling/types'

export async function getServiceSlots(params: SlotFilters): Promise<PaginatedResponse<ServiceSlot>> {
  const response = await apiClient.get<PaginatedResponse<ServiceSlot>>('/api/v1/admin/scheduling/slots', { params })
  return response.data
}

export async function getServiceSlot(id: string): Promise<ServiceSlot> {
  const response = await apiClient.get<ServiceSlot>(`/api/v1/admin/scheduling/slots/${id}`)
  return response.data
}

export async function getCalendarSlots(locationId: string | null, from: string, to: string): Promise<ServiceSlot[]> {
  const response = await apiClient.get<ServiceSlot[]>('/api/v1/admin/scheduling/calendar', {
    params: { locationId: locationId ?? undefined, from, to },
  })
  return response.data
}

export async function createServiceSlot(data: CreateSlotInput): Promise<ServiceSlot> {
  const response = await apiClient.post<ServiceSlot>('/api/v1/admin/scheduling/slots', data)
  return response.data
}

export async function createRecurringSlots(
  data: CreateRecurringInput
): Promise<{ ruleId: string; slotsCreated: number }> {
  const response = await apiClient.post<{ ruleId: string; slotsCreated: number }>(
    '/api/v1/admin/scheduling/slots/recurring',
    data
  )
  return response.data
}

export async function updateServiceSlot(id: string, data: UpdateSlotInput): Promise<ServiceSlot> {
  const response = await apiClient.patch<ServiceSlot>(`/api/v1/admin/scheduling/slots/${id}`, data)
  return response.data
}

export async function cancelServiceSlot(id: string, data: { reason: string }): Promise<void> {
  await apiClient.post(`/api/v1/admin/scheduling/slots/${id}/cancel`, data)
}

export async function getSlotRoster(slotId: string): Promise<Booking[]> {
  const response = await apiClient.get<Booking[]>(`/api/v1/admin/scheduling/slots/${slotId}/roster`)
  return response.data
}

export async function checkIn(bookingId: string): Promise<Booking> {
  const response = await apiClient.post<Booking>(`/api/v1/admin/scheduling/bookings/${bookingId}/check-in`)
  return response.data
}

export async function bulkCheckIn(
  slotId: string,
  bookingIds: string[]
): Promise<{ succeeded: string[]; failed: string[] }> {
  const response = await apiClient.post<{ succeeded: string[]; failed: string[] }>(
    `/api/v1/admin/scheduling/slots/${slotId}/bulk-check-in`,
    { bookingIds }
  )
  return response.data
}

export async function getBookings(params: BookingFilters): Promise<PaginatedResponse<Booking>> {
  const response = await apiClient.get<PaginatedResponse<Booking>>('/api/v1/admin/scheduling/bookings', { params })
  return response.data
}

export async function getBooking(id: string): Promise<Booking> {
  const response = await apiClient.get<Booking>(`/api/v1/admin/scheduling/bookings/${id}`)
  return response.data
}

export async function cancelBooking(id: string, data: CancelBookingInput): Promise<void> {
  await apiClient.post(`/api/v1/admin/scheduling/bookings/${id}/cancel`, data)
}

export async function getWaitlist(slotId: string): Promise<WaitlistEntry[]> {
  const response = await apiClient.get<WaitlistEntry[]>(`/api/v1/admin/scheduling/slots/${slotId}/waitlist`)
  return response.data
}

export async function addToWaitlist(data: { slotId: string; contactId: string }): Promise<WaitlistEntry> {
  const response = await apiClient.post<WaitlistEntry>('/api/v1/admin/scheduling/waitlist', data)
  return response.data
}

export async function removeFromWaitlist(entryId: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/scheduling/waitlist/${entryId}`)
}

export async function promoteWaitlist(slotId: string): Promise<WaitlistEntry | null> {
  const response = await apiClient.post<WaitlistEntry | null>(`/api/v1/admin/scheduling/slots/${slotId}/waitlist/promote`)
  return response.data
}

export async function getServices(params: ServiceFilters): Promise<PaginatedResponse<Service>> {
  const response = await apiClient.get<PaginatedResponse<Service>>('/api/v1/admin/scheduling/services', { params })
  return response.data
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const response = await apiClient.get<ServiceCategory[]>('/api/v1/admin/scheduling/service-categories')
  return response.data
}

export async function createService(data: CreateServiceInput): Promise<Service> {
  const response = await apiClient.post<Service>('/api/v1/admin/scheduling/services', data)
  return response.data
}

export async function updateService(id: string, data: UpdateServiceInput): Promise<Service> {
  const response = await apiClient.patch<Service>(`/api/v1/admin/scheduling/services/${id}`, data)
  return response.data
}

export async function deleteService(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/scheduling/services/${id}`)
}

export async function reorderCategories(items: { id: string; displayOrder: number }[]): Promise<void> {
  await apiClient.post('/api/v1/admin/scheduling/service-categories/reorder', { items })
}

export async function getLocations(): Promise<Location[]> {
  const response = await apiClient.get<Location[]>('/api/v1/admin/scheduling/locations')
  return response.data
}

export async function createLocation(data: CreateLocationInput): Promise<Location> {
  const response = await apiClient.post<Location>('/api/v1/admin/scheduling/locations', data)
  return response.data
}

export async function updateLocation(id: string, data: UpdateLocationInput): Promise<Location> {
  const response = await apiClient.patch<Location>(`/api/v1/admin/scheduling/locations/${id}`, data)
  return response.data
}

export async function getAddOns(params?: { bookingType?: BookingType }): Promise<AddOn[]> {
  const response = await apiClient.get<AddOn[]>('/api/v1/admin/scheduling/add-ons', { params })
  return response.data
}

export async function createAddOn(data: CreateAddOnInput): Promise<AddOn> {
  const response = await apiClient.post<AddOn>('/api/v1/admin/scheduling/add-ons', data)
  return response.data
}

export async function updateAddOn(id: string, data: UpdateAddOnInput): Promise<AddOn> {
  const response = await apiClient.patch<AddOn>(`/api/v1/admin/scheduling/add-ons/${id}`, data)
  return response.data
}

export async function deleteAddOn(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/scheduling/add-ons/${id}`)
}

export async function duplicateService(id: string): Promise<Service> {
  const response = await apiClient.post<Service>(`/api/v1/admin/scheduling/services/${id}/duplicate`)
  return response.data
}

export async function checkStaffAvailability(params: {
  staffId: string
  startAt: string
  endAt: string
  excludeSlotId?: string
}): Promise<{ conflicts: ServiceSlot[] }> {
  const response = await apiClient.get<{ conflicts: ServiceSlot[] }>('/api/v1/admin/scheduling/staff-availability', { params })
  return response.data
}

export async function getAdminOpenAvailability(serviceId: string, date: string): Promise<AvailableWindowsResponse> {
  const response = await apiClient.get<{ data: AvailableWindowsResponse }>('/api/v1/service-slots/open-availability', {
    params: { serviceId, date },
  })
  return response.data.data
}

