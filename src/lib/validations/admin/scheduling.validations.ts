import * as yup from 'yup'

import {
  AddOnPricingType,
  BookingType,
  RecurFrequency,
  ServiceType,
} from '@/portal/admin/features/scheduling/types'

export const createSlotStep1Schema = yup.object({
  serviceType: yup
    .mixed<ServiceType>()
    .oneOf(Object.values(ServiceType) as ServiceType[], 'Select a service type')
    .required('Select a service type'),
  // IDs are backend-defined; in local mock mode they are not UUIDs.
  serviceId: yup.string().min(1, 'Select a service').required('Select a service'),
})

export const createSlotStep2Schema = yup.object({
  locationId: yup.string().min(1, 'Select a location').required('Select a location'),
  staffId: yup.string().min(1, 'Invalid instructor').optional(),
  startAt: yup.string().required('Select a start time'),
  durationMinutes: yup.number().integer().min(1, 'Duration required').required('Duration required'),
  isRecurring: yup.boolean().required(),
  frequency: yup
    .mixed<RecurFrequency>()
    .oneOf(Object.values(RecurFrequency) as RecurFrequency[])
    .optional(),
  daysOfWeek: yup.array(yup.number().min(0).max(6)).optional(),
  validFrom: yup.string().optional(),
  validUntil: yup.string().optional(),
  capacityOverride: yup.number().integer().min(1).optional(),
  priceOverride: yup.number().min(0).optional(),
})

export const createSlotStep3Schema = yup.object({
  notes: yup.string().max(1000).optional(),
  addOnIds: yup.array(yup.string().min(1)).optional(),
})

export const cancelBookingSchema = yup.object({
  reason: yup.string().min(1, 'Reason required').max(1000).required('Reason required'),
  refundType: yup.mixed<'FULL' | 'PARTIAL' | 'NONE'>().oneOf(['FULL', 'PARTIAL', 'NONE']).required(),
  refundAmount: yup.number().min(0).optional(),
})

export const cancelSlotSchema = yup.object({
  reason: yup.string().min(1, 'Reason required').max(1000).required('Reason required'),
})

export const createServiceSchema = yup.object({
  categoryId: yup.string().min(1, 'Select a category').required('Select a category'),
  serviceType: yup
    .mixed<ServiceType>()
    .oneOf(Object.values(ServiceType) as ServiceType[], 'Select a service type')
    .required('Select a service type'),
  bookingMode: yup.mixed<'SCHEDULED' | 'OPEN'>().oneOf(['SCHEDULED', 'OPEN']).optional(),
  name: yup.string().min(1, 'Name is required').required('Name is required'),
  description: yup.string().nullable().defined(),
  durationMinutes: yup.number().integer().min(1, 'Duration required').required('Duration required'),
  capacity: yup.number().integer().min(1, 'Capacity required').required('Capacity required'),
  basePrice: yup.string().min(1, 'Base price required').required('Base price required'),
  subscriptionPrice: yup.string().nullable().defined(),
  requiresWaiver: yup.boolean().required(),
  ageMin: yup.number().integer().min(0).nullable().defined(),
  ageMax: yup.number().integer().min(0).nullable().defined(),
  isActive: yup.boolean().required(),
})

export const openModeServiceSchema = createServiceSchema
  .shape({
    bookingMode: yup.mixed<'OPEN'>().oneOf(['OPEN']).required(),
    maxConcurrent: yup.number().integer().min(1, 'Required for open booking').required('Required for open booking'),
    minDurationMinutes: yup.number().integer().min(15, 'Minimum 15 minutes').required('Minimum duration required'),
    maxDurationMinutes: yup.number().integer().min(15).nullable().defined(),
    slotIncrementMinutes: yup.number().integer().min(1).default(30),
    minAdvanceHours: yup.number().integer().min(0).default(0),
    maxAdvanceHours: yup.number().integer().min(1).default(720),
  })
  .test('max-duration', 'Max duration must be ≥ min duration', value => {
    if (!value) return true
    const min = (value as any).minDurationMinutes
    const max = (value as any).maxDurationMinutes
    if (max == null) return true
    return typeof min === 'number' && typeof max === 'number' ? max >= min : true
  })

export const createLocationSchema = yup.object({
  name: yup.string().min(1, 'Name is required').required('Name is required'),
  address: yup.string().nullable().defined(),
  city: yup.string().nullable().defined(),
  timezone: yup.string().nullable().defined(),
  phone: yup.string().nullable().defined(),
  email: yup.string().email('Invalid email').nullable().defined(),
  isActive: yup.boolean().required(),
})

export const createAddOnSchema = yup.object({
  name: yup.string().min(1, 'Name is required').required('Name is required'),
  pricingType: yup
    .mixed<AddOnPricingType>()
    .oneOf(Object.values(AddOnPricingType) as AddOnPricingType[], 'Select pricing type')
    .required('Select pricing type'),
  price: yup.string().min(1, 'Price required').required('Price required'),
  applicableBookingTypes: yup
    .array(yup.mixed<BookingType>().oneOf(Object.values(BookingType) as BookingType[]))
    .min(1, 'Select at least one booking type')
    .required('Select at least one booking type'),
  isActive: yup.boolean().required(),
})

