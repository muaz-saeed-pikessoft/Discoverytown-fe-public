import type { BookingState, ServiceId } from './types'
import { BookingStepIndex } from './types'

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const

export const BOOKING_INPUT_CLASS =
  'w-full rounded-xl border border-[var(--dt-border)] px-4 py-3 text-[14px] font-medium text-[var(--dt-navy)] placeholder:text-[var(--dt-text-subtle)] focus:outline-none focus:border-[var(--dt-teal)] transition-colors'

export function createInitialBookingState(service: ServiceId | null, option: string | null): BookingState {
  return {
    service,
    option,
    date: null,
    time: null,
    guests: 1,
    ages: [],
    addons: [],
    name: '',
    email: '',
    phone: '',
    notes: '',
  }
}

export function getInitialBookingStep(service: ServiceId | null, option: string | null) {
  if (!service) return BookingStepIndex.Service
  if (!option) return BookingStepIndex.Package

  return BookingStepIndex.DateTime
}
