/**
 * Booking data adapter.
 *
 * Transforms raw API responses (snake_case) into application-level
 * types (camelCase). Covers: bookings, time slots, classes, events,
 * and party packages.
 */

import type {
  BookingRecord,
  BookingStatus,
  BookingType,
  ClassCategory,
  ClassEvent,
  EventDay,
  PartyAddOn,
  PartyPackage,
  PricingTier,
  SpecialEvent,
  TimeSlot,
} from '@/types/booking-types'

/* ── Raw API response interfaces (backend contract) ── */

/** Raw booking shape — Source: backend /api/bookings */
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

/** Raw time slot shape — Source: backend /api/time-slots */
export interface RawTimeSlotResponse {
  id: string
  date: string
  start_time: string
  end_time: string
  spots_total: number
  spots_available: number
  price_per_child: number
  age_min: number
  age_max: number
}

/** Raw class event shape — Source: backend /api/classes */
export interface RawClassEventResponse {
  id: string
  title: string
  description: string
  instructor: string
  category: string
  schedule: string
  duration: number
  spots_total: number
  spots_available: number
  price_per_session: number
  price_series: number
  age_min: number
  age_max: number
  image_slug: string
  tags: string[]
  start_date: string
  end_date: string
  sessions_total: number
}

/** Raw event day sub-shape */
export interface RawEventDayResponse {
  date: string
  start_time: string
  end_time: string
  activities: string[]
}

/** Raw pricing tier sub-shape */
export interface RawPricingTierResponse {
  id: string
  label: string
  price: number
  perks: string[]
  spots_available: number
}

/** Raw special event shape — Source: backend /api/events */
export interface RawSpecialEventResponse {
  id: string
  title: string
  description: string
  featured: boolean
  dates: RawEventDayResponse[]
  location: string
  image_slug: string
  pricing_tiers: RawPricingTierResponse[]
  tags: string[]
  max_capacity: number
  registered_count: number
}

/** Raw party add-on sub-shape */
export interface RawPartyAddOnResponse {
  id: string
  label: string
  price: number
  description: string
  pricing_model: string
}

/** Raw party package shape — Source: backend /api/party-packages */
export interface RawPartyPackageResponse {
  id: string
  name: string
  tagline: string
  price: number
  deposit_amount: number
  duration: number
  guests_included: number
  price_per_extra_guest: number
  features: string[]
  add_ons: RawPartyAddOnResponse[]
  color: string
  popular: boolean
}

/* ── Adapter functions ── */

/**
 * Transform a single raw booking response into BookingRecord.
 */
export function adaptBooking(raw: RawBookingResponse): BookingRecord {
  const rawGuests = Array.isArray(raw.guests) ? raw.guests : []

  return {
    id: raw.id,
    type: raw.booking_type as BookingType,
    title: raw.title,
    date: raw.scheduled_date,
    time: raw.time_range,
    status: raw.status as BookingStatus,
    amount: raw.total_amount,
    confirmationCode: raw.confirmation_code,
    guests: rawGuests.map(guest => ({
      id: guest.id,
      name: guest.full_name,
      age: guest.age,
      relationship: guest.relationship,
    })),
  }
}

/**
 * Transform a list of raw booking responses.
 */
export function adaptBookings(
  raw: RawBookingResponse[],
): BookingRecord[] {
  return raw.map(adaptBooking)
}

/**
 * Transform a single raw time slot response into TimeSlot.
 */
export function adaptTimeSlot(raw: RawTimeSlotResponse): TimeSlot {
  return {
    id: raw.id,
    date: raw.date,
    startTime: raw.start_time,
    endTime: raw.end_time,
    spotsTotal: raw.spots_total,
    spotsAvailable: raw.spots_available,
    pricePerChild: raw.price_per_child,
    ageMin: raw.age_min,
    ageMax: raw.age_max,
  }
}

/**
 * Transform a list of raw time slot responses.
 */
export function adaptTimeSlots(
  raw: RawTimeSlotResponse[],
): TimeSlot[] {
  return raw.map(adaptTimeSlot)
}

/**
 * Transform a single raw class event response into ClassEvent.
 */
export function adaptClass(raw: RawClassEventResponse): ClassEvent {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    instructor: raw.instructor,
    category: raw.category as ClassCategory,
    schedule: raw.schedule,
    duration: raw.duration,
    spotsTotal: raw.spots_total,
    spotsAvailable: raw.spots_available,
    pricePerSession: raw.price_per_session,
    priceSeries: raw.price_series,
    ageMin: raw.age_min,
    ageMax: raw.age_max,
    imageSlug: raw.image_slug,
    tags: raw.tags,
    startDate: raw.start_date,
    endDate: raw.end_date,
    sessionsTotal: raw.sessions_total,
  }
}

/**
 * Transform a list of raw class event responses.
 */
export function adaptClasses(
  raw: RawClassEventResponse[],
): ClassEvent[] {
  return raw.map(adaptClass)
}

/**
 * Transform a raw event day sub-shape.
 */
function adaptEventDay(raw: RawEventDayResponse): EventDay {
  return {
    date: raw.date,
    startTime: raw.start_time,
    endTime: raw.end_time,
    activities: raw.activities,
  }
}

/**
 * Transform a raw pricing tier sub-shape.
 */
function adaptPricingTier(raw: RawPricingTierResponse): PricingTier {
  return {
    id: raw.id,
    label: raw.label,
    price: raw.price,
    perks: raw.perks,
    spotsAvailable: raw.spots_available,
  }
}

/**
 * Transform a single raw special event response into SpecialEvent.
 */
export function adaptEvent(
  raw: RawSpecialEventResponse,
): SpecialEvent {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    featured: raw.featured,
    dates: raw.dates.map(adaptEventDay),
    location: raw.location,
    imageSlug: raw.image_slug,
    pricingTiers: raw.pricing_tiers.map(adaptPricingTier),
    tags: raw.tags,
    maxCapacity: raw.max_capacity,
    registeredCount: raw.registered_count,
  }
}

/**
 * Transform a list of raw special event responses.
 */
export function adaptEvents(
  raw: RawSpecialEventResponse[],
): SpecialEvent[] {
  return raw.map(adaptEvent)
}

/**
 * Transform a raw party add-on sub-shape.
 */
function adaptPartyAddOn(raw: RawPartyAddOnResponse): PartyAddOn {
  return {
    id: raw.id,
    label: raw.label,
    price: raw.price,
    description: raw.description,
    pricingModel: raw.pricing_model as PartyAddOn['pricingModel'],
  }
}

/**
 * Transform a single raw party package response into PartyPackage.
 */
export function adaptPartyPackage(
  raw: RawPartyPackageResponse,
): PartyPackage {
  return {
    id: raw.id,
    name: raw.name,
    tagline: raw.tagline,
    price: raw.price,
    depositAmount: raw.deposit_amount,
    duration: raw.duration,
    guestsIncluded: raw.guests_included,
    pricePerExtraGuest: raw.price_per_extra_guest,
    features: raw.features,
    addOns: raw.add_ons.map(adaptPartyAddOn),
    color: raw.color as PartyPackage['color'],
    popular: raw.popular,
  }
}

/**
 * Transform a list of raw party package responses.
 */
export function adaptPartyPackages(
  raw: RawPartyPackageResponse[],
): PartyPackage[] {
  return raw.map(adaptPartyPackage)
}
