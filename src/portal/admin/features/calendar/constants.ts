export type AvailabilityUtilizationBand = 'empty' | 'low' | 'medium' | 'high' | 'full'

export const AVAILABILITY_COLOR_SCALE: Record<
  AvailabilityUtilizationBand,
  { minPct: number; maxPct: number; className: string; label: string }
> = {
  empty: { minPct: 0, maxPct: 0, className: 'bg-gray-100 text-gray-600', label: 'No sessions' },
  low: { minPct: 1, maxPct: 30, className: 'bg-green-200 text-green-900', label: '0–30% booked' },
  medium: { minPct: 31, maxPct: 60, className: 'bg-green-500 text-white', label: '31–60% booked' },
  high: { minPct: 61, maxPct: 90, className: 'bg-amber-500 text-white', label: '61–90% booked' },
  full: { minPct: 91, maxPct: 100, className: 'bg-red-500 text-white', label: '91–100% booked' },
}

export function utilizationBand(averageCapacityPercent: number, sessionCount: number): AvailabilityUtilizationBand {
  if (sessionCount === 0 || averageCapacityPercent <= 0) return 'empty'
  if (averageCapacityPercent <= 30) return 'low'
  if (averageCapacityPercent <= 60) return 'medium'
  if (averageCapacityPercent <= 90) return 'high'
  return 'full'
}

export const PRIVATE_HIRE_STATUS_TABS = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'] as const

export type PrivateHireStatusTab = (typeof PRIVATE_HIRE_STATUS_TABS)[number]
