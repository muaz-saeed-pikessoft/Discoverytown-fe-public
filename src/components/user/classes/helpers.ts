import type { ClassEvent } from '@/types/booking-types'

import type { ClassMetrics, ClassStatus, SortOption } from './types'

export function sortClasses(classes: ClassEvent[], option: SortOption): ClassEvent[] {
  const copy = [...classes]

  if (option === 'price-low') return copy.sort((a, b) => a.priceSeries - b.priceSeries)
  if (option === 'price-high') return copy.sort((a, b) => b.priceSeries - a.priceSeries)
  if (option === 'availability') return copy.sort((a, b) => b.spotsAvailable - a.spotsAvailable)

  return copy.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

export function getClassStatus(spotsAvailable: number): ClassStatus {
  return {
    isFull: spotsAvailable === 0,
    isAlmostFull: spotsAvailable > 0 && spotsAvailable <= 3,
  }
}

export function getClassMetrics(cls: ClassEvent): ClassMetrics {
  return {
    enrolledPercent: ((cls.spotsTotal - cls.spotsAvailable) / cls.spotsTotal) * 100,
    startDateShort: new Date(cls.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }
}

export function formatClassDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
