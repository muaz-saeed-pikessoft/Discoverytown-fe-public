'use client'

import StatusBadge from '@/components/shared/StatusBadge'
import { BOOKING_STATUS_LABELS } from '@/portal/admin/features/scheduling/constants'
import type { BookingStatus } from '@/portal/admin/features/scheduling/types'

interface BookingStatusBadgeProps {
  status: BookingStatus
}

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  return <StatusBadge status={BOOKING_STATUS_LABELS[status]} variant='booking' />
}

