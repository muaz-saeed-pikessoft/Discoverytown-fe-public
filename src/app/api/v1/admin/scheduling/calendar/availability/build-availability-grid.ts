import type { AvailabilityCell, AvailabilityCellSlot, ServiceSlot } from '@/types/scheduling.shared'

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatYmdLocal(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function eachCalendarDay(fromIso: string, toIso: string): string[] {
  const from = new Date(fromIso)
  const to = new Date(toIso)
  const days: string[] = []
  const cur = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate())
  while (cur <= end) {
    days.push(formatYmdLocal(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

function hourRangeLocal(dateStr: string, hour: number): { start: Date; end: Date } {
  const [y, m, d] = dateStr.split('-').map(Number)
  const start = new Date(y!, m! - 1, d!, hour, 0, 0, 0)
  return { start, end: new Date(start.getTime() + 60 * 60_000) }
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart
}

function toCellSlot(s: ServiceSlot): AvailabilityCellSlot {
  return {
    slotId: s.id,
    serviceName: s.service.name,
    instructorName: s.staff ? `${s.staff.firstName} ${s.staff.lastName}` : null,
    bookedCount: s.bookedCount,
    capacity: s.effectiveCapacity,
    status: s.status,
  }
}

export function buildAvailabilityGrid(locationSlots: ServiceSlot[], fromIso: string, toIso: string): AvailabilityCell[] {
  const days = eachCalendarDay(fromIso, toIso)
  const cells: AvailabilityCell[] = []

  for (const date of days) {
    for (let hour = 6; hour <= 22; hour += 1) {
      const { start: wStart, end: wEnd } = hourRangeLocal(date, hour)
      const inHour = locationSlots.filter(s => {
        const sStart = new Date(s.startAt)
        const sEnd = new Date(s.endAt)
        return overlaps(sStart, sEnd, wStart, wEnd)
      })

      const sessionCount = inHour.length
      const averageCapacityPercent =
        sessionCount === 0
          ? 0
          : Math.round(
              inHour.reduce((acc, s) => acc + (s.bookedCount / Math.max(1, s.effectiveCapacity)) * 100, 0) / sessionCount
            )

      cells.push({
        date,
        hour,
        sessionCount,
        averageCapacityPercent,
        slots: inHour.map(toCellSlot),
      })
    }
  }

  return cells
}
