import type {
  AddOn,
  AddOnPricingType,
  Booking,
  BookingStatus,
  BookingMode,
  BookingType,
  Location,
  PaymentGateway,
  Service,
  ServiceCategory,
  ServiceSlot,
  ServiceType,
  SlotStatus,
  WaitlistEntry,
  WaitlistStatus,
} from '@/portal/admin/features/scheduling/types'
import type { PaginatedResponse } from '@/types/api.types'

function nowIso(): string {
  return new Date().toISOString()
}

function addMinutes(iso: string, minutes: number): string {
  const d = new Date(iso)
  return new Date(d.getTime() + minutes * 60_000).toISOString()
}

export function paginated<T>(items: T[]): PaginatedResponse<T> {
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

export const mockLocations: Location[] = [
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

export const mockCategories: ServiceCategory[] = [
  { id: 'cat-mock-1', tenantId, name: 'Classes', icon: null, displayOrder: '1', isActive: true },
  { id: 'cat-mock-2', tenantId, name: 'Open Play', icon: null, displayOrder: '2', isActive: true },
]

export const mockServices: Service[] = [
  {
    id: 'svc-mock-1',
    tenantId,
    locationId: mockLocations[0].id,
    categoryId: mockCategories[0].id,
    category: mockCategories[0],
    serviceType: 'GYM_CLASS' as ServiceType,
    bookingMode: 'SCHEDULED' as BookingMode,
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
    locationId: mockLocations[0].id,
    categoryId: mockCategories[1].id,
    category: mockCategories[1],
    serviceType: 'OPEN_PLAY' as ServiceType,
    bookingMode: 'OPEN' as BookingMode,
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
  {
    id: 'svc-mock-3',
    tenantId,
    locationId: mockLocations[1].id,
    categoryId: mockCategories[0].id,
    category: mockCategories[0],
    serviceType: 'CAMP' as ServiceType,
    bookingMode: 'SCHEDULED' as BookingMode,
    name: 'Spring Break Camp',
    description: 'A multi-day camp with STEAM activities.',
    durationMinutes: 360,
    capacity: 25,
    basePrice: '199.00',
    subscriptionPrice: null,
    requiresWaiver: true,
    ageMin: 6,
    ageMax: 12,
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
    id: 'svc-mock-4',
    tenantId,
    locationId: mockLocations[0].id,
    categoryId: mockCategories[0].id,
    category: mockCategories[0],
    serviceType: 'WORKSHOP' as ServiceType,
    bookingMode: 'SCHEDULED' as BookingMode,
    name: 'Robotics Workshop',
    description: 'Hands-on robotics build session.',
    durationMinutes: 90,
    capacity: 16,
    basePrice: '35.00',
    subscriptionPrice: null,
    requiresWaiver: true,
    ageMin: 8,
    ageMax: 16,
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
]

export const mockAddOns: AddOn[] = [
  {
    id: 'addon-mock-1',
    name: 'Extra sibling',
    pricingType: 'PER_PERSON' as AddOnPricingType,
    price: '5.00',
    applicableBookingTypes: ['CLASS', 'OPEN_PLAY'] as BookingType[],
    isActive: true,
  },
]

const startBase = new Date(Date.now() + 24 * 60 * 60_000).toISOString()

export let slots: ServiceSlot[] = [
  {
    id: 'slot-mock-1',
    tenantId,
    serviceId: mockServices[0].id,
    service: mockServices[0],
    locationId: mockLocations[0].id,
    location: mockLocations[0],
    staffId: 'stf-mock-1',
    staff: { id: 'stf-mock-1', firstName: 'Alex', lastName: 'Kim' },
    startAt: startBase,
    endAt: addMinutes(startBase, mockServices[0].durationMinutes),
    capacityOverride: null,
    priceOverride: null,
    bookedCount: 6,
    effectiveCapacity: 12,
    status: 'SCHEDULED' as SlotStatus,
    isRecurring: false,
    notes: null,
  },
]

export let rosterBySlot: Record<string, Booking[]> = {
  'slot-mock-1': [
    {
      id: 'bk-mock-1',
      tenantId,
      bookingType: 'CLASS' as BookingType,
      serviceSlotId: 'slot-mock-1',
      serviceId: mockServices[0].id,
      service: mockServices[0],
      contactId: 'ctc-mock-1',
      contact: { id: 'ctc-mock-1', firstName: 'Jordan', lastName: 'Lee' },
      participantContactId: null,
      participantContact: null,
      locationId: mockLocations[0].id,
      status: 'CONFIRMED' as BookingStatus,
      startAt: startBase,
      endAt: addMinutes(startBase, mockServices[0].durationMinutes),
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

export let waitlistBySlot: Record<string, WaitlistEntry[]> = {
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

