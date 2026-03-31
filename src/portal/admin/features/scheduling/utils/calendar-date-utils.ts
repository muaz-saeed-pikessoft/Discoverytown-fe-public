import type { CalendarView } from '@/portal/admin/features/scheduling/constants'

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function addDays(d: Date, n: number): Date {
  const next = new Date(d)
  next.setDate(next.getDate() + n)
  return next
}

export function startOfWeekMonday(anchor: Date): Date {
  const d = startOfDay(anchor)
  const weekdayMon0 = (d.getDay() + 6) % 7
  return addDays(d, -weekdayMon0)
}

export function rangeForView(view: CalendarView, anchor: Date): { from: string; to: string } {
  if (view === 'day') {
    const start = startOfDay(anchor)
    const end = addDays(start, 1)
    return { from: start.toISOString(), to: end.toISOString() }
  }

  if (view === 'week') {
    const start = startOfWeekMonday(anchor)
    const end = addDays(start, 7)
    return { from: start.toISOString(), to: end.toISOString() }
  }

  // month + agenda
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  return { from: start.toISOString(), to: end.toISOString() }
}

