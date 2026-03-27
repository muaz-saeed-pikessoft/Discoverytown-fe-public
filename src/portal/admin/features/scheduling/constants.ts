import type { ReactNode } from 'react'

import type {
  AdminEventRow,
  BookingStatus,
  ServiceType,
  SlotStatus,
} from '@/portal/admin/features/scheduling/types'
import { RecurFrequency } from '@/portal/admin/features/scheduling/types'

export type ServiceTypeUiConfig = {
  label: string
  colorClass: string
  icon: ReactNode
}

export const SERVICE_TYPE_CONFIG: Record<ServiceType, ServiceTypeUiConfig> = {
  GYM_CLASS: { label: 'Gym class', colorClass: 'bg-blue-50 text-blue-700 border-blue-200', icon: '🏋️' },
  COURT_BOOKING: { label: 'Court booking', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '🎾' },
  COACHING_SESSION: { label: 'Coaching session', colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: '🧑‍🏫' },
  OPEN_PLAY: { label: 'Open play', colorClass: 'bg-sky-50 text-sky-700 border-sky-200', icon: '🛝' },
  CAMP: { label: 'Camp', colorClass: 'bg-amber-50 text-amber-800 border-amber-200', icon: '🏕️' },
  PARTY_PACKAGE: { label: 'Party package', colorClass: 'bg-pink-50 text-pink-700 border-pink-200', icon: '🎉' },
  PRIVATE_HIRE: { label: 'Private hire', colorClass: 'bg-purple-50 text-purple-700 border-purple-200', icon: '🔒' },
  WORKSHOP: { label: 'Workshop', colorClass: 'bg-orange-50 text-orange-800 border-orange-200', icon: '🧪' },
  SWIM_CLASS: { label: 'Swim class', colorClass: 'bg-cyan-50 text-cyan-800 border-cyan-200', icon: '🏊' },
  FITNESS_ASSESSMENT: {
    label: 'Fitness assessment',
    colorClass: 'bg-slate-50 text-slate-700 border-slate-200',
    icon: '🩺',
  },
}

export const SLOT_STATUS_LABELS: Record<SlotStatus, string> = {
  SCHEDULED: 'Scheduled',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  FULL: 'Full',
}

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  NO_SHOW: 'No show',
  WAITLISTED: 'Waitlisted',
}

export const CALENDAR_VIEWS = ['month', 'week', 'day', 'agenda'] as const
export type CalendarView = (typeof CALENDAR_VIEWS)[number]

export const SLOT_FORM_STEPS = [
  { id: 'service', label: 'Service' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'settings', label: 'Settings' },
  { id: 'review', label: 'Review' },
] as const

export const RECURRENCE_OPTIONS: Array<{ label: string; value: RecurFrequency }> = [
  { label: 'Daily', value: RecurFrequency.DAILY },
  { label: 'Weekly', value: RecurFrequency.WEEKLY },
  { label: 'Biweekly', value: RecurFrequency.BIWEEKLY },
  { label: 'Monthly', value: RecurFrequency.MONTHLY },
]

/**
 * Temporary mock data used by existing stub pages.
 * Will be removed once real API-backed UI is built.
 */
export const MOCK_ADMIN_EVENTS: AdminEventRow[] = [
  {
    id: 'evt_1001',
    name: 'Spring Family Play Session',
    startAt: '2026-03-28 10:00',
    endAt: '2026-03-28 12:00',
    location: 'Main Floor',
    capacity: 40,
    booked: 22,
    status: 'published',
  },
]

