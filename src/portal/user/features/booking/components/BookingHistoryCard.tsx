'use client'

import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import type { Booking } from '@/types/scheduling.shared'
import { serviceTypeToParam } from '@/portal/user/features/booking/components/utils'
import { formatDuration } from '@/lib/utils/open-booking-price'

interface BookingHistoryCardProps {
  booking: Booking
  className?: string
}

export default function BookingHistoryCard({ booking, className }: BookingHistoryCardProps) {
  const start = booking.startAt ? new Date(booking.startAt) : null
  const end = booking.endAt ? new Date(booking.endAt) : null
  const href = ROUTES.USER.MY_BOOKING_DETAIL(booking.id)
  const isOpen = booking.serviceSlotId === null

  return (
    <Link href={href} className={className ?? 'block rounded-2xl border border-base-300 bg-base-100 p-4 hover:bg-base-200'}>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='truncate text-sm font-black text-base-content'>{booking.service.name}</div>
          <div className='mt-1 text-xs font-semibold text-base-content/60'>
            {start ? start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : '—'}
          </div>
          {isOpen ? (
            <div className='mt-1 text-xs font-semibold text-base-content/60'>
              {start && end ? `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '—'}
              {booking.startAt && booking.endAt ? ` · ${formatDuration(booking.startAt, booking.endAt)}` : ''}
            </div>
          ) : (
            <div className='mt-1 text-xs font-semibold text-base-content/60'>{booking.locationId}</div>
          )}
        </div>
        <div className='shrink-0 text-right'>
          <div className='text-xs font-black uppercase tracking-widest text-base-content/50'>{booking.status}</div>
          <div className='mt-2 text-sm font-black text-base-content'>${booking.totalAmount}</div>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between gap-2'>
        <span className='inline-flex items-center rounded-full border border-base-300 bg-base-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-base-content/70'>
          {serviceTypeToParam(booking.service.serviceType)}
        </span>
        <span className='text-xs font-semibold text-base-content/50'>{isOpen ? 'Open booking' : 'Tap to view'}</span>
      </div>
    </Link>
  )
}

