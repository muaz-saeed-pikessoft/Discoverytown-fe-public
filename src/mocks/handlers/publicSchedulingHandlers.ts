/**
 * Public + consumer scheduling MSW handlers.
 *
 * Covers the consumer Activities + Booking flow endpoints under `/api/v1/*`.
 */

import { delay, http, HttpResponse } from 'msw'

import type { PaginatedResponse } from '@/types/api.types'
import {
  BookingMode,
  BookingSource,
  BookingStatus,
  BookingType,
  PaymentGateway,
  ServiceType,
  SlotStatus,
  type Booking,
  type PublicService,
  type PublicServiceSlot,
  type ServiceCategory,
} from '@/types/scheduling.shared'

const SIMULATED_DELAY_MS = 200

function nowIso(): string {
  return new Date().toISOString()
}

function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString()
}

function ok<T>(data: T): T {
  return data
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

const tenantId = 'tenant-mock-1'

const categories: ServiceCategory[] = [
  { id: 'cat-public-1', tenantId, name: 'Classes', icon: null, displayOrder: '1', isActive: true },
  { id: 'cat-public-2', tenantId, name: 'Open Play', icon: null, displayOrder: '2', isActive: true },
]

const publicServices: PublicService[] = [
  {
    id: 'svc-public-1',
    locationId: null,
    categoryId: categories[0].id,
    category: { ...categories[0] },
    serviceType: ServiceType.GYM_CLASS,
    bookingMode: BookingMode.SCHEDULED,
    name: 'Toddler Gym',
    description: 'A fun gym class for toddlers.',
    durationMinutes: 45,
    basePrice: '15.00',
    subscriptionPrice: null,
    ageMin: 2,
    ageMax: 5,
    metadata: {},
  },
  {
    id: 'svc-public-2',
    locationId: null,
    categoryId: categories[1].id,
    category: { ...categories[1] },
    serviceType: ServiceType.OPEN_PLAY,
    bookingMode: BookingMode.OPEN,
    name: 'Open Play (1 hour)',
    description: 'Drop in and play.',
    durationMinutes: 60,
    basePrice: '10.00',
    subscriptionPrice: null,
    ageMin: null,
    ageMax: null,
    metadata: {},
  },
]

const locations = [
  { id: 'loc-public-1', name: 'Main Floor', address: '123 Discovery Way', city: 'Discoverytown' },
  { id: 'loc-public-2', name: 'STEM Lab', address: '123 Discovery Way', city: 'Discoverytown' },
]

const today = new Date()
today.setHours(10, 0, 0, 0)
const baseIso = today.toISOString()

let slots: PublicServiceSlot[] = [
  {
    id: 'slot-public-1',
    serviceId: publicServices[0].id,
    service: publicServices[0],
    locationId: locations[0].id,
    location: locations[0],
    staffFirstName: 'Alex',
    startAt: baseIso,
    endAt: addMinutes(baseIso, 45),
    effectivePrice: '15.00',
    availableSpots: 6,
    effectiveCapacity: 12,
    status: SlotStatus.SCHEDULED,
  },
  {
    id: 'slot-public-2',
    serviceId: publicServices[1].id,
    service: publicServices[1],
    locationId: locations[1].id,
    location: locations[1],
    staffFirstName: null,
    startAt: addMinutes(baseIso, 120),
    endAt: addMinutes(baseIso, 180),
    effectivePrice: '10.00',
    availableSpots: 0,
    effectiveCapacity: 20,
    status: SlotStatus.FULL,
  },
]

let myBookings: Booking[] = []

export const publicSchedulingHandlers = [
  http.get('/api/v1/service-categories', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(ok(categories))
  }),

  http.get('/api/v1/services/public', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)
    const url = new URL(request.url)
    const serviceType = url.searchParams.get('serviceType')
    const categoryId = url.searchParams.get('categoryId')

    let result = [...publicServices]
    if (serviceType) result = result.filter(s => s.serviceType === serviceType)
    if (categoryId) result = result.filter(s => s.categoryId === categoryId)
    return HttpResponse.json(ok(result))
  }),

  http.get('/api/v1/locations', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(ok(locations))
  }),

  http.get('/api/v1/calendar/public', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)
    const url = new URL(request.url)
    const serviceType = url.searchParams.get('serviceType')

    let result = [...slots]
    if (serviceType) result = result.filter(s => s.service.serviceType === serviceType)
    return HttpResponse.json(ok(result))
  }),

  http.get('/api/v1/calendar/public/:id', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const slot = slots.find(s => s.id === params.id)
    if (!slot) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(ok(slot))
  }),

  // Consumer booking endpoints (minimal)
  http.post('/api/v1/bookings', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)
    const body = (await request.json()) as { slotId?: string; serviceId?: string; locationId?: string; startAt?: string; endAt?: string; guestCount?: number }
    const isOpenBooking = !body.slotId && !!(body.serviceId && body.locationId && body.startAt && body.endAt)

    if (isOpenBooking) {
      const svc = publicServices.find(s => s.id === body.serviceId)
      if (!svc) return HttpResponse.json({ message: 'Service not found' }, { status: 404 })

      const booking: Booking = {
        id: `bk_${Date.now()}`,
        tenantId,
        bookingType: svc.serviceType === ServiceType.OPEN_PLAY ? BookingType.OPEN_PLAY : BookingType.CLASS,
        serviceSlotId: null,
        serviceId: svc.id,
        service: {
          id: svc.id,
          tenantId,
          locationId: body.locationId!,
          categoryId: svc.categoryId,
          category: categories.find(c => c.id === svc.categoryId)!,
          serviceType: svc.serviceType,
          bookingMode: svc.bookingMode ?? BookingMode.OPEN,
          name: svc.name,
          description: svc.description ?? null,
          durationMinutes: svc.durationMinutes,
          capacity: 0,
          basePrice: svc.basePrice,
          subscriptionPrice: svc.subscriptionPrice ?? null,
          requiresWaiver: false,
          ageMin: svc.ageMin ?? null,
          ageMax: svc.ageMax ?? null,
          isActive: true,
          minDurationMinutes: (svc as any).minDurationMinutes ?? null,
          maxDurationMinutes: (svc as any).maxDurationMinutes ?? null,
          slotIncrementMinutes: (svc as any).slotIncrementMinutes ?? null,
          maxConcurrent: (svc as any).maxConcurrent ?? null,
          minAdvanceHours: (svc as any).minAdvanceHours ?? null,
          maxAdvanceHours: (svc as any).maxAdvanceHours ?? null,
          metadata: svc.metadata,
          createdAt: nowIso(),
          deletedAt: null,
        },
        contactId: 'contact-1',
        contact: { id: 'contact-1', firstName: 'Test', lastName: 'User' },
        participantContactId: null,
        participantContact: null,
        locationId: body.locationId!,
        status: BookingStatus.CONFIRMED,
        startAt: body.startAt!,
        endAt: body.endAt!,
        guestCount: body.guestCount ?? 1,
        totalAmount: svc.basePrice,
        depositAmount: null,
        balanceDue: '0.00',
        paymentReferenceId: null,
        paymentGateway: PaymentGateway.CASH,
        cancelledAt: null,
        cancellationReason: null,
        checkedInAt: null,
        notes: null,
        internalNotes: null,
        metadata: {},
        source: BookingSource.ONLINE,
        addOns: [],
      }

      myBookings = [booking, ...myBookings]
      return HttpResponse.json(ok(booking), { status: 201 })
    }

    const slot = slots.find(s => s.id === body.slotId)
    if (!slot) return HttpResponse.json({ message: 'Slot not found' }, { status: 404 })

    const booking: Booking = {
      id: `bk_${Date.now()}`,
      tenantId,
      bookingType: BookingType.CLASS,
      serviceSlotId: slot.id,
      serviceId: slot.serviceId,
      service: {
        // Minimal Service object to satisfy UI
        id: slot.service.id,
        tenantId,
        locationId: slot.locationId,
        categoryId: slot.service.categoryId,
        category: categories.find(c => c.id === slot.service.categoryId)!,
        serviceType: slot.service.serviceType,
        bookingMode: slot.service.bookingMode ?? BookingMode.SCHEDULED,
        name: slot.service.name,
        description: slot.service.description ?? null,
        durationMinutes: slot.service.durationMinutes,
        capacity: slot.effectiveCapacity,
        basePrice: slot.effectivePrice,
        subscriptionPrice: slot.service.subscriptionPrice ?? null,
        requiresWaiver: false,
        ageMin: slot.service.ageMin ?? null,
        ageMax: slot.service.ageMax ?? null,
        isActive: true,
        minDurationMinutes: null,
        maxDurationMinutes: null,
        slotIncrementMinutes: null,
        maxConcurrent: null,
        minAdvanceHours: null,
        maxAdvanceHours: null,
        metadata: slot.service.metadata,
        createdAt: nowIso(),
        deletedAt: null,
      },
      contactId: 'contact-1',
      contact: { id: 'contact-1', firstName: 'Test', lastName: 'User' },
      participantContactId: null,
      participantContact: null,
      locationId: slot.locationId,
      status: BookingStatus.CONFIRMED,
      startAt: slot.startAt,
      endAt: slot.endAt,
      guestCount: null,
      totalAmount: slot.effectivePrice,
      depositAmount: null,
      balanceDue: '0.00',
      paymentReferenceId: null,
      paymentGateway: PaymentGateway.CASH,
      cancelledAt: null,
      cancellationReason: null,
      checkedInAt: null,
      notes: null,
      internalNotes: null,
      metadata: {},
      source: BookingSource.ONLINE,
      addOns: [],
    }

    myBookings = [booking, ...myBookings]
    return HttpResponse.json(ok(booking), { status: 201 })
  }),

  http.get('/api/v1/bookings/my', async () => {
    await delay(SIMULATED_DELAY_MS)
    return HttpResponse.json(paginated(myBookings))
  }),

  http.get('/api/v1/bookings/my/:id', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)
    const booking = myBookings.find(b => b.id === params.id)
    if (!booking) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(ok(booking))
  }),
]

