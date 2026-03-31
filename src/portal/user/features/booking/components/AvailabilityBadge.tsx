'use client'

import type { SlotStatus } from '@/types/scheduling.shared'
import StatusChip from '@/components/shared/StatusChip'

interface AvailabilityBadgeProps {
  availableSpots: number
  status: SlotStatus
  capacity: number
}

export default function AvailabilityBadge({ availableSpots, status, capacity }: AvailabilityBadgeProps) {
  const remainingPct = capacity > 0 ? availableSpots / capacity : 0

  if (status === 'FULL' || availableSpots <= 0) {
    return <StatusChip variant='error'>Fully booked</StatusChip>
  }

  if (remainingPct <= 0.2) {
    return <StatusChip variant='warning'>Only {availableSpots} left</StatusChip>
  }

  return (
    <StatusChip variant='success'>{availableSpots} spots</StatusChip>
  )
}

