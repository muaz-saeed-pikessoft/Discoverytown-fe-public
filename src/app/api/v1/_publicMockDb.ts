import type { Booking, PublicService, PublicServiceSlot, ServiceCategory } from '@/types/scheduling.shared'
import { BookingMode, BookingSource, BookingStatus, BookingType, PaymentGateway, ServiceType, SlotStatus } from '@/types/scheduling.shared'

function nowIso(): string {
  return new Date().toISOString()
}

function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString()
}

const tenantId = 'tenant-mock-1'

export const publicLocations = [
  { id: 'loc-public-1', name: 'Main Floor', address: '123 Discovery Way', city: 'Discoverytown' },
  { id: 'loc-public-2', name: 'STEM Lab', address: '123 Discovery Way', city: 'Discoverytown' },
] as const

export const publicCategories: ServiceCategory[] = [
  { id: 'cat-public-1', tenantId, name: 'Classes', icon: null, displayOrder: '1', isActive: true },
  { id: 'cat-public-2', tenantId, name: 'Open Play', icon: null, displayOrder: '2', isActive: true },
]

export const publicServices: PublicService[] = [
  {
    id: 'svc-public-1',
    locationId: null,
    categoryId: publicCategories[0].id,
    category: publicCategories[0],
    serviceType: ServiceType.GYM_CLASS,
    bookingMode: BookingMode.SCHEDULED,
    name: 'Toddler Gym',
    description: 'A fun gym class for toddlers.',
    durationMinutes: 45,
    basePrice: '15.00',
    subscriptionPrice: null,
    ageMin: 2,
    ageMax: 5,
    metadata: {
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80',
    },
  },
  {
    id: 'svc-public-2',
    locationId: 'loc-public-2',
    categoryId: publicCategories[1].id,
    category: publicCategories[1],
    serviceType: ServiceType.OPEN_PLAY,
    bookingMode: BookingMode.OPEN,
    name: 'Family Open Play',
    description: 'Drop in and play.',
    durationMinutes: 60,
    basePrice: '10.00',
    subscriptionPrice: null,
    ageMin: null,
    ageMax: null,
    metadata: {
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80',
      pricingModel: 'per_person',
    },
  },
  {
    id: 'svc-public-private-hire',
    locationId: 'loc-public-1',
    categoryId: publicCategories[0].id,
    category: publicCategories[0],
    serviceType: ServiceType.PRIVATE_HIRE,
    bookingMode: BookingMode.SCHEDULED,
    name: 'Whole venue private hire',
    description: 'Exclusive hire for parties, corporate events, and celebrations.',
    durationMinutes: 240,
    basePrice: '500.00',
    subscriptionPrice: null,
    ageMin: null,
    ageMax: null,
    metadata: {
      imageUrl: 'https://unsplash.com/photos/close-up-photography-of-house-ashxH5TQ8Go',
      facilities: ['Party room', 'Sound system', 'Kitchen access', 'Dedicated host'],
      capacity: 80,
      depositPercent: 25,
      pricingModel: 'deposit_plus_balance',
    },
  },
]

const start = new Date()
start.setHours(10, 0, 0, 0)
const baseIso = start.toISOString()

export const publicSlots: PublicServiceSlot[] = [
  {
    id: 'slot-public-1',
    serviceId: publicServices[0].id,
    service: publicServices[0],
    locationId: 'loc-public-1',
    location: { ...publicLocations[0] },
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
    locationId: 'loc-public-2',
    location: { ...publicLocations[1] },
    staffFirstName: null,
    startAt: addMinutes(baseIso, 120),
    endAt: addMinutes(baseIso, 180),
    effectivePrice: '10.00',
    availableSpots: 0,
    effectiveCapacity: 20,
    status: SlotStatus.FULL,
  },
]

export let myBookings: Booking[] = [
  {
    id: 'bk-public-1',
    tenantId,
    bookingType: BookingType.CLASS,
    serviceSlotId: publicSlots[0].id,
    serviceId: publicServices[0].id,
    service: {
      id: publicServices[0].id,
      tenantId,
      locationId: 'loc-public-1',
      categoryId: publicServices[0].categoryId,
      category: publicCategories[0],
      serviceType: publicServices[0].serviceType,
      bookingMode: BookingMode.SCHEDULED,
      name: publicServices[0].name,
      description: publicServices[0].description,
      durationMinutes: publicServices[0].durationMinutes,
      capacity: 12,
      basePrice: publicServices[0].basePrice,
      subscriptionPrice: null,
      requiresWaiver: false,
      ageMin: publicServices[0].ageMin,
      ageMax: publicServices[0].ageMax,
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
    contactId: 'contact-1',
    contact: { id: 'contact-1', firstName: 'Test', lastName: 'User' },
    participantContactId: null,
    participantContact: null,
    locationId: 'loc-public-1',
    status: BookingStatus.CONFIRMED,
    startAt: publicSlots[0].startAt,
    endAt: publicSlots[0].endAt,
    guestCount: 1,
    totalAmount: publicSlots[0].effectivePrice,
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
  },
]

