'use client'

import type { SlotStatus } from '@/types/scheduling.shared'

interface AvailabilityBadgeProps {
  availableSpots: number
  status: SlotStatus
  capacity: number
}

export default function AvailabilityBadge({ availableSpots, status, capacity }: AvailabilityBadgeProps) {
  const remainingPct = capacity > 0 ? availableSpots / capacity : 0

  if (status === 'FULL' || availableSpots <= 0) {
    return (
      <span className='inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-red-700'>
        Fully booked
      </span>
    )
  }

  if (remainingPct <= 0.2) {
    return (
      <span className='inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800'>
        Only {availableSpots} left
      </span>
    )
  }

  return (
    <span className='inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-800'>
      {availableSpots} spots
    </span>
  )
}

