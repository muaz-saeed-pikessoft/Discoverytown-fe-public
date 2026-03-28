import type { OpenPricingModel } from '@/types/scheduling.shared'

export function calculateOpenBookingPrice(
  basePrice: string,
  pricingModel: OpenPricingModel,
  startAt: string,
  endAt: string,
  guestCount: number,
): number {
  const base = Number.parseFloat(basePrice)
  const startMs = new Date(startAt).getTime()
  const endMs = new Date(endAt).getTime()
  const durationHours = Math.max(0, (endMs - startMs) / 3_600_000)

  if (!Number.isFinite(base)) return 0

  switch (pricingModel) {
    case 'per_hour': {
      return Math.round(base * durationHours * 100) / 100
    }
    case 'per_person': {
      const guests = Number.isFinite(guestCount) && guestCount > 0 ? guestCount : 1
      return Math.round(base * guests * 100) / 100
    }
    default: {
      return Math.round(base * 100) / 100
    }
  }
}

export function formatDuration(startAt: string, endAt: string): string {
  const startMs = new Date(startAt).getTime()
  const endMs = new Date(endAt).getTime()
  const mins = Math.max(0, Math.round((endMs - startMs) / 60_000))

  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  const rem = mins % 60
  return rem === 0 ? `${hours}h` : `${hours}h ${rem}min`
}

export function generateDurationOptions(minMinutes: number, maxMinutes: number, increment: number): number[] {
  const min = Math.max(1, Math.floor(minMinutes))
  const max = Math.max(min, Math.floor(maxMinutes))
  const inc = Math.max(1, Math.floor(increment))

  const options: number[] = []
  for (let m = min; m <= max; m += inc) options.push(m)
  return options
}

export function formatDurationLabel(minutes: number): string {
  const mins = Math.max(0, Math.floor(minutes))
  if (mins < 60) return `${mins} min`
  const hours = mins / 60
  if (Number.isInteger(hours)) return `${hours} hour${hours !== 1 ? 's' : ''}`
  const whole = Math.floor(hours)
  const rem = mins % 60
  return `${whole}h ${rem}min`
}

