import type {
  BookingStatus,
  BookingType,
  PublicServiceSlot,
  ServiceCategory,
  ServiceType,
  WaitlistEntry,
} from '@/types/scheduling.shared'

// Consumer-only types live here. Shared scheduling types live in `src/types/scheduling.shared.ts`.

export interface PublicSlotFilters {
  serviceType?: ServiceType
  categoryId?: string
  locationId?: string
  from?: string
  to?: string
  ageGroup?: 'UNDER_5' | 'AGE_5_10' | 'AGE_11_16' | 'ADULT' | 'ALL'
  timeOfDay?: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'ANY'
  day?: 'ANY' | 'TODAY' | 'THIS_WEEKEND' | 'THIS_WEEK'
  page?: number
  limit?: number
}

export interface ConsumerCreateBookingAddOnInput {
  addOnId: string
  quantity: number
}

export interface ConsumerCreateBookingInput {
  slotId: string
  participantContactId?: string
  notes?: string
  addOns?: ConsumerCreateBookingAddOnInput[]
  couponCode?: string
  useCredits?: boolean
  acceptedWaiver?: boolean
}

export interface ConsumerCreateOpenBookingInput {
  serviceId: string
  locationId: string
  startAt: string
  endAt: string
  guestCount?: number
  participantContactId?: string
  notes?: string
  addOns?: ConsumerCreateBookingAddOnInput[]
  couponCode?: string
  useCredits?: boolean
  acceptedWaiver?: boolean
}

export interface PrivateHireInquiryInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  alternateDate?: string
  guestCount: number
  notes?: string
  serviceId: string
  locationId: string
}

export type ActivityCategoryParam = string

export type MyBookingsFilters = {
  status?: BookingStatus
  bookingType?: BookingType
  page?: number
  limit?: number
}

export type PublicServiceCategory = Pick<ServiceCategory, 'id' | 'name' | 'icon'>

// Re-export shared types that consumer code commonly uses.
export type { PublicServiceSlot, ServiceCategory, ServiceType, WaitlistEntry }

