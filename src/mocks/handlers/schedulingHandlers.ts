/**
 * Admin Scheduling MSW request handlers.
 *
 * Simulates backend scheduling endpoints used by the admin UI:
 * - Slots list/detail/calendar
 * - Locations/services/categories/add-ons
 * - Roster/check-in/waitlist
 */

import { delay, http, HttpResponse } from 'msw'

import type {
  AddOn,
  AddOnPricingType,
  Booking,
  BookingStatus,
  BookingType,
  Location,
  PaymentGateway,
  RecurFrequency,
  Service,
  ServiceCategory,
  ServiceSlot,
  ServiceType,
  SlotStatus,
  WaitlistEntry,
  WaitlistStatus,
} from '@/portal/admin/features/scheduling/types'
import type { PaginatedResponse } from '@/types/api.types'

const SIMULATED_DELAY_MS = 250

function nowIso(): string {
  return new Date().toISOString()
}

function addMinutes(iso: string, minutes: number): string {
  const d = new Date(iso)
  return new Date(d.getTime() + minutes * 60_000).toISOString()
}

function paginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    success: true,
    statusCode: 200,
    message: 'OK',
    data: items,
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: items.length,
      itemsPerPage: items.length,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }
}

// ── In-memory fixtures ──────────────────────────────────────────────────────────

const tenantId = 'tenant-mock-1'

const locations: Location[] = [
  {
    id: 'loc-mock-1',
    tenantId,
    name: 'Main Floor',
    address: '123 Discovery Way',
    city: 'Discoverytown',
    timezone: 'America/New_York',
    phone: null,
    email: null,
    isActive: true,
    settings: {},
    createdAt: nowIso(),
    deletedAt: null,
  },
  {
    id: 'loc-mock-2',
    tenantId,
    name: 'STEM Lab',
    address: '123 Discovery Way',
    city: 'Discoverytown',
    timezone: 'America/New_York',
    phone: null,
    email: null,
    isActive: true,
    settings: {},
    createdAt: nowIso(),
    deletedAt: null,
  },
]

const categories: ServiceCategory[] = [
  { id: 'cat-mock-1', tenantId, name: 'Classes', icon: null, displayOrder: '1', isActive: true },
  { id: 'cat-mock-2', tenantId, name: 'Open Play', icon: null, displayOrder: '2', isActive: true },
]

const services: Service[] = [
  {
    id: 'svc-mock-1',
    tenantId,
    locationId: locations[0].id,
    categoryId: categories[0].id,
    category: categories[0],
    serviceType: 'GYM_CLASS' as ServiceType,
    bookingMode: 'SCHEDULED' as any,
    name: 'Toddler Gym',
    description: 'A fun gym class for toddlers.',
    durationMinutes: 45,
    capacity: 12,
    basePrice: '15.00',
    subscriptionPrice: null,
    requiresWaiver: true,
    ageMin: 2,
    ageMax: 5,
    isActive: true,
    minDurationMinutes: null,
    maxDurationMinutes: null,
    slotIncrementMinutes: null,
    maxConcurrent: null,
    minAdvanceHours: null,
    maxAdvanceHours: null,
    metadata: {},
    createdAt: nowIso(),
    deletedAt: null,
  },
  {
    id: 'svc-mock-2',
    tenantId,
    locationId: locations[0].id,
    categoryId: categories[1].id,
    category: categories[1],
    serviceType: 'OPEN_PLAY' as ServiceType,
    bookingMode: 'OPEN' as any,
    name: 'Family Open Play',
    description: 'Drop in and play.',
    durationMinutes: 120,
    capacity: 40,
    basePrice: '20.00',
    subscriptionPrice: null,
    requiresWaiver: true,
    ageMin: null,
    ageMax: null,
    isActive: true,
    minDurationMinutes: 60,
    maxDurationMinutes: 180,
    slotIncrementMinutes: 30,
    maxConcurrent: 10,
    minAdvanceHours: 0,
    maxAdvanceHours: 720,
    metadata: {},
    createdAt: nowIso(),
    deletedAt: null,
  },
]

const addOns: AddOn[] = [
  {
    id: 'addon-mock-1',
    name: 'Extra sibling',
    pricingType: 'PER_PERSON' as AddOnPricingType,
    price: '5.00',
    applicableBookingTypes: ['CLASS', 'OPEN_PLAY'] as BookingType[],
    isActive: true,
  },
  {
    id: 'addon-mock-2',
    name: 'Private coach',
    pricingType: 'PER_HOUR' as AddOnPricingType,
    price: '60.00',
    applicableBookingTypes: ['COACHING'] as BookingType[],
    isActive: true,
  },
]

const staff = [
  { id: 'stf-mock-1', firstName: 'Alex', lastName: 'Kim' },
  { id: 'stf-mock-2', firstName: 'Sam', lastName: 'Patel' },
]

const startBase = new Date(Date.now() + 24 * 60 * 60_000).toISOString()

let slots: ServiceSlot[] = [
  {
    id: 'slot-mock-1',
    tenantId,
    serviceId: services[0].id,
    service: services[0],
    locationId: locations[0].id,
    location: locations[0],
    staffId: staff[0].id,
    staff: staff[0],
    startAt: startBase,
    endAt: addMinutes(startBase, services[0].durationMinutes),
    capacityOverride: null,
    priceOverride: null,
    bookedCount: 6,
    effectiveCapacity: 12,
    status: 'SCHEDULED' as SlotStatus,
    isRecurring: false,
    notes: null,
  },
  {
    id: 'slot-mock-2',
    tenantId,
    serviceId: services[1].id,
    service: services[1],
    locationId: locations[0].id,
    location: locations[0],
    staffId: null,
    staff: null,
    startAt: addMinutes(startBase, 180),
    endAt: addMinutes(startBase, 180 + services[1].durationMinutes),
    capacityOverride: null,
    priceOverride: '18.00',
    bookedCount: 22,
    effectiveCapacity: 40,
    status: 'SCHEDULED' as SlotStatus,
    isRecurring: false,
    notes: 'Bring socks.',
  },
]

let rosterBySlot: Record<string, Booking[]> = {
  'slot-mock-1': [
    {
      id: 'bk-mock-1',
      tenantId,
      bookingType: 'CLASS' as BookingType,
      serviceSlotId: 'slot-mock-1',
      serviceId: services[0].id,
      service: services[0],
      contactId: 'ctc-mock-1',
      contact: { id: 'ctc-mock-1', firstName: 'Jordan', lastName: 'Lee' },
      participantContactId: null,
      participantContact: null,
      locationId: locations[0].id,
      status: 'CONFIRMED' as BookingStatus,
      startAt: startBase,
      endAt: addMinutes(startBase, services[0].durationMinutes),
      guestCount: 1,
      totalAmount: '15.00',
      depositAmount: null,
      balanceDue: '0.00',
      paymentReferenceId: null,
      paymentGateway: 'CASH' as PaymentGateway,
      cancelledAt: null,
      cancellationReason: null,
      checkedInAt: null,
      notes: null,
      internalNotes: null,
      metadata: {},
      source: 'ONLINE' as any,
      addOns: [],
    },
  ],
}

let waitlistBySlot: Record<string, WaitlistEntry[]> = {
  'slot-mock-1': [
    {
      id: 'wl-mock-1',
      serviceSlotId: 'slot-mock-1',
      contactId: 'ctc-mock-9',
      contact: { id: 'ctc-mock-9', firstName: 'Taylor', lastName: 'Ng' },
      position: 1,
      notifiedAt: null,
      expiresAt: null,
      status: 'WAITING' as WaitlistStatus,
    },
  ],
}

// ── Handlers ────────────────────────────────────────────────────────────────────

export const schedulingHandlers = [
  http.get('/api/v1/admin/scheduling/locations', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(locations)
  }),

  http.get('/api/v1/admin/scheduling/service-categories', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(categories)
  }),

  http.get('/api/v1/admin/scheduling/services', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(paginated(services))
  }),

  http.get('/api/v1/admin/scheduling/add-ons', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(addOns)
  }),

  http.get('/api/v1/admin/scheduling/slots', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(paginated(slots))
  }),

  http.get('/api/v1/admin/scheduling/slots/:id', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const id = String(params.id)
    const slot = slots.find(s => s.id === id)
    if (!slot) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    return HttpResponse.json(slot)
  }),

  http.get('/api/v1/admin/scheduling/calendar', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(slots)
  }),

  http.post('/api/v1/admin/scheduling/slots', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)
    const body = (await request.json()) as Partial<ServiceSlot> & {
      serviceId?: string
      locationId?: string
      startAt?: string
      endAt?: string
    }

    const service = services.find(s => s.id === body.serviceId)
    const location = locations.find(l => l.id === body.locationId)
    if (!service || !location || !body.startAt || !body.endAt) {
      return HttpResponse.json({ message: 'Invalid payload' }, { status: 400 })
    }

    const created: ServiceSlot = {
      id: `slot-mock-${Date.now()}`,
      tenantId,
      serviceId: service.id,
      service,
      locationId: location.id,
      location,
      staffId: null,
      staff: null,
      startAt: body.startAt,
      endAt: body.endAt,
      capacityOverride: null,
      priceOverride: null,
      bookedCount: 0,
      effectiveCapacity: service.capacity,
      status: ('SCHEDULED' as SlotStatus),
      isRecurring: false,
      notes: null,
    }

    slots = [created, ...slots]
    rosterBySlot[created.id] = []
    waitlistBySlot[created.id] = []

    return HttpResponse.json(created, { status: 201 })
  }),

  http.post('/api/v1/admin/scheduling/slots/recurring', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json({ ruleId: `rule-mock-${Date.now()}`, slotsCreated: 5 })
  }),

  http.post('/api/v1/admin/scheduling/slots/:id/cancel', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const id = String(params.id)
    slots = slots.map(s => (s.id === id ? { ...s, status: 'CANCELLED' as SlotStatus } : s))
    return HttpResponse.json({ success: true })
  }),

  http.get('/api/v1/admin/scheduling/slots/:id/roster', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const id = String(params.id)
    return HttpResponse.json(rosterBySlot[id] ?? [])
  }),

  http.post('/api/v1/admin/scheduling/bookings/:id/check-in', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const id = String(params.id)
    const checkedInAt = nowIso()

    for (const slotId of Object.keys(rosterBySlot)) {
      const roster = rosterBySlot[slotId] ?? []
      const idx = roster.findIndex(b => b.id === id)
      if (idx >= 0) {
        const updated = { ...roster[idx], checkedInAt }
        rosterBySlot[slotId] = [...roster.slice(0, idx), updated, ...roster.slice(idx + 1)]
        return HttpResponse.json(updated)
      }
    }

    return HttpResponse.json({ message: 'Booking not found' }, { status: 404 })
  }),

  http.post('/api/v1/admin/scheduling/slots/:id/bulk-check-in', async ({ request, params }) => {
    await delay(SIMULATED_DELAY_MS)
    const slotId = String(params.id)
    const body = (await request.json()) as { bookingIds?: string[] }
    const bookingIds = body.bookingIds ?? []

    const roster = rosterBySlot[slotId] ?? []
    const now = nowIso()
    const updated = roster.map(b => (bookingIds.includes(b.id) ? { ...b, checkedInAt: b.checkedInAt ?? now } : b))
    rosterBySlot[slotId] = updated

    return HttpResponse.json({ succeeded: bookingIds, failed: [] })
  }),

  http.get('/api/v1/admin/scheduling/slots/:id/waitlist', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const id = String(params.id)
    return HttpResponse.json(waitlistBySlot[id] ?? [])
  }),

  http.post('/api/v1/admin/scheduling/slots/:id/waitlist/promote', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const slotId = String(params.id)
    const list = [...(waitlistBySlot[slotId] ?? [])].sort((a, b) => a.position - b.position)
    const next = list[0]
    if (!next) return HttpResponse.json(null)
    waitlistBySlot[slotId] = list.slice(1).map((e, idx) => ({ ...e, position: idx + 1 }))
    return HttpResponse.json({ ...next, status: 'CONVERTED' as WaitlistStatus, notifiedAt: nowIso() })
  }),
]

