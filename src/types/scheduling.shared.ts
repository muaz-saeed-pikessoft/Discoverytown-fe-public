export enum ServiceType {
  GYM_CLASS = 'GYM_CLASS',
  COURT_BOOKING = 'COURT_BOOKING',
  COACHING_SESSION = 'COACHING_SESSION',
  OPEN_PLAY = 'OPEN_PLAY',
  CAMP = 'CAMP',
  PARTY_PACKAGE = 'PARTY_PACKAGE',
  PRIVATE_HIRE = 'PRIVATE_HIRE',
  WORKSHOP = 'WORKSHOP',
  SWIM_CLASS = 'SWIM_CLASS',
  FITNESS_ASSESSMENT = 'FITNESS_ASSESSMENT',
}

export enum BookingType {
  CLASS = 'CLASS',
  COURT = 'COURT',
  COACHING = 'COACHING',
  OPEN_PLAY = 'OPEN_PLAY',
  CAMP = 'CAMP',
  PARTY = 'PARTY',
  PRIVATE_HIRE = 'PRIVATE_HIRE',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  WAITLISTED = 'WAITLISTED',
}

export enum SlotStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  FULL = 'FULL',
}

export enum BookingSource {
  ONLINE = 'ONLINE',
  ADMIN = 'ADMIN',
  WALK_IN = 'WALK_IN',
}

export enum RecurFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
}

export enum AddOnPricingType {
  FLAT = 'FLAT',
  PER_PERSON = 'PER_PERSON',
  PER_HOUR = 'PER_HOUR',
}

export enum WaitlistStatus {
  WAITING = 'WAITING',
  NOTIFIED = 'NOTIFIED',
  CONVERTED = 'CONVERTED',
  EXPIRED = 'EXPIRED',
  REMOVED = 'REMOVED',
}

export enum PaymentGateway {
  STRIPE = 'STRIPE',
  SQUARE = 'SQUARE',
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum BookingMode {
  SCHEDULED = 'SCHEDULED',
  OPEN = 'OPEN',
}

export type OpenPricingModel = 'flat' | 'per_hour' | 'per_person'

export interface StaffSummary {
  id: string
  firstName: string
  lastName: string
}

export interface ContactSummary {
  id: string
  firstName: string
  lastName: string
}

export interface Location {
  id: string
  tenantId: string
  name: string
  address: string | null
  city: string | null
  timezone: string | null
  phone: string | null
  email: string | null
  isActive: boolean
  settings: Record<string, unknown>
  createdAt: string
  deletedAt: string | null
}

export interface ServiceCategory {
  id: string
  tenantId: string
  name: string
  icon: string | null
  displayOrder: string
  isActive: boolean
}

export interface Service {
  id: string
  tenantId: string
  locationId: string | null
  categoryId: string
  category: ServiceCategory
  serviceType: ServiceType
  bookingMode: BookingMode | null
  name: string
  description: string | null
  durationMinutes: number
  capacity: number
  basePrice: string
  subscriptionPrice: string | null
  requiresWaiver: boolean
  ageMin: number | null
  ageMax: number | null
  isActive: boolean
  minDurationMinutes: number | null
  maxDurationMinutes: number | null
  slotIncrementMinutes: number | null
  maxConcurrent: number | null
  minAdvanceHours: number | null
  maxAdvanceHours: number | null
  metadata: Record<string, unknown>
  createdAt: string
  deletedAt: string | null
}

export interface ServiceSlot {
  id: string
  tenantId: string
  serviceId: string
  service: Service
  locationId: string
  location: Location
  staffId: string | null
  staff: StaffSummary | null
  startAt: string
  endAt: string
  capacityOverride: number | null
  priceOverride: string | null
  bookedCount: number
  effectiveCapacity: number
  status: SlotStatus
  isRecurring: boolean
  notes: string | null
}

export type PublicService = Pick<
  Service,
  | 'id'
  | 'locationId'
  | 'categoryId'
  | 'category'
  | 'serviceType'
  | 'bookingMode'
  | 'name'
  | 'description'
  | 'durationMinutes'
  | 'basePrice'
  | 'subscriptionPrice'
  | 'ageMin'
  | 'ageMax'
  | 'metadata'
>

export interface AvailableWindow {
  startAt: string
  endAt: string
  spotsRemaining: number
}

export interface AvailableWindowsResponse {
  date: string
  serviceId: string
  windows: AvailableWindow[]
  operatingHours: { open: string; close: string } | null
}

export interface AvailabilityCellSlot {
  slotId: string
  serviceName: string
  instructorName: string | null
  bookedCount: number
  capacity: number
  status: SlotStatus
}

export interface AvailabilityCell {
  date: string
  hour: number
  sessionCount: number
  averageCapacityPercent: number
  slots: AvailabilityCellSlot[]
}

export interface ConflictResult {
  hasConflicts: boolean
  conflicts: ServiceSlot[]
}

export interface PublicServiceSlot {
  id: string
  serviceId: string
  service: PublicService
  locationId: string
  location: Pick<Location, 'id' | 'name' | 'address' | 'city'>
  staffFirstName: string | null
  startAt: string
  endAt: string
  effectivePrice: string
  availableSpots: number
  effectiveCapacity: number
  status: SlotStatus
}

export interface AddOn {
  id: string
  name: string
  pricingType: AddOnPricingType
  price: string
  applicableBookingTypes: BookingType[]
  isActive: boolean
}

export interface BookingAddOn {
  id: string
  addOnId: string
  addOn: AddOn
  quantity: number
  unitPrice: string
  totalPrice: string
  status: string
}

export interface Booking {
  id: string
  tenantId: string
  bookingType: BookingType
  serviceSlotId: string | null
  serviceId: string
  service: Service
  contactId: string
  contact: ContactSummary
  participantContactId: string | null
  participantContact: ContactSummary | null
  locationId: string
  status: BookingStatus
  startAt: string | null
  endAt: string | null
  guestCount: number | null
  totalAmount: string
  depositAmount: string | null
  balanceDue: string
  paymentReferenceId: string | null
  paymentGateway: PaymentGateway | null
  cancelledAt: string | null
  cancellationReason: string | null
  checkedInAt: string | null
  notes: string | null
  internalNotes: string | null
  metadata: Record<string, unknown>
  source: BookingSource
  addOns: BookingAddOn[]
}

export interface WaitlistEntry {
  id: string
  serviceSlotId: string
  contactId: string
  contact: ContactSummary
  position: number
  notifiedAt: string | null
  expiresAt: string | null
  status: WaitlistStatus
}

export type DateRangeFilter = {
  from: string
  to: string
}

export type AgeRangeFilter = {
  min: number | null
  max: number | null
}

export interface SlotFilters {
  search?: string
  serviceType?: ServiceType[]
  status?: SlotStatus[]
  locationId?: string
  staffId?: string
  dateRange?: DateRangeFilter
  ageRange?: AgeRangeFilter
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface BookingFilters {
  search?: string
  status?: BookingStatus[]
  bookingType?: BookingType[]
  locationId?: string
  serviceId?: string
  serviceSlotId?: string
  dateRange?: DateRangeFilter
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface ServiceFilters {
  search?: string
  serviceType?: ServiceType[]
  categoryId?: string
  locationId?: string
  isActive?: boolean
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface CreateSlotInput {
  serviceType: ServiceType
  serviceId: string
  locationId: string
  staffId?: string | null
  startAt: string
  endAt: string
  isRecurring: boolean
  frequency?: RecurFrequency
  daysOfWeek?: number[]
  validFrom?: string
  validUntil?: string
  capacityOverride?: number | null
  priceOverride?: string | null
  notes?: string | null
  addOnIds?: string[]
  status?: SlotStatus
}

export type UpdateSlotInput = Partial<CreateSlotInput>

export interface CreateRecurringInput {
  serviceId: string
  locationId: string
  staffId?: string | null
  startAt: string
  endAt: string
  frequency: RecurFrequency
  daysOfWeek?: number[]
  validFrom: string
  validUntil: string
  capacityOverride?: number | null
  priceOverride?: string | null
  notes?: string | null
  addOnIds?: string[]
  status?: SlotStatus
}

export interface CancelBookingInput {
  reason: string
  refundType: 'FULL' | 'PARTIAL' | 'NONE'
  refundAmount?: number
}

export interface CreateServiceInput {
  locationId?: string | null
  categoryId: string
  serviceType: ServiceType
  name: string
  description?: string | null
  durationMinutes: number
  capacity: number
  basePrice: string
  subscriptionPrice?: string | null
  requiresWaiver: boolean
  ageMin?: number | null
  ageMax?: number | null
  isActive: boolean
  metadata?: Record<string, unknown>
}

export type UpdateServiceInput = Partial<CreateServiceInput>

export interface CreateLocationInput {
  name: string
  address?: string | null
  city?: string | null
  timezone?: string | null
  phone?: string | null
  email?: string | null
  isActive: boolean
  settings?: Record<string, unknown>
}

export type UpdateLocationInput = Partial<CreateLocationInput>

export interface CreateAddOnInput {
  name: string
  pricingType: AddOnPricingType
  price: string
  applicableBookingTypes: BookingType[]
  isActive: boolean
}

export type UpdateAddOnInput = Partial<CreateAddOnInput>

