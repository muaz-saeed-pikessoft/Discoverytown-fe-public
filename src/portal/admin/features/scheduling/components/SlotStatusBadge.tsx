'use client'

import StatusBadge from '@/components/shared/StatusBadge'
import { BOOKING_STATUS_LABELS, SLOT_STATUS_LABELS } from '@/portal/admin/features/scheduling/constants'
import type { BookingStatus, SlotStatus } from '@/portal/admin/features/scheduling/types'

interface SlotStatusBadgeProps {
  status: SlotStatus | BookingStatus
}

export default function SlotStatusBadge({ status }: SlotStatusBadgeProps) {
  const isSlot = status in SLOT_STATUS_LABELS
  const label = isSlot ? SLOT_STATUS_LABELS[status as SlotStatus] : BOOKING_STATUS_LABELS[status as BookingStatus]
  return <StatusBadge status={label} variant='booking' />
}

