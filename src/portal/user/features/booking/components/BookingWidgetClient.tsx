'use client'

import { useRouter } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import BookingWidget from '@/portal/user/features/booking/components/BookingWidget'
import type { PublicServiceSlot } from '@/types/scheduling.shared'

interface BookingWidgetClientProps {
  slot: PublicServiceSlot
}

export default function BookingWidgetClient({ slot }: BookingWidgetClientProps) {
  const router = useRouter()

  return (
    <BookingWidget
      slot={slot}
      onBookNow={() => {
        router.push(`${ROUTES.USER.BOOKING_CONFIRM}?slotId=${encodeURIComponent(slot.id)}`)
      }}
      onJoinWaitlist={() => {
        router.push(`${ROUTES.USER.BOOKING_CONFIRM}?slotId=${encodeURIComponent(slot.id)}&waitlist=1`)
      }}
    />
  )
}

