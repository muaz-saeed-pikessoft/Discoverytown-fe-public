'use client'

import { useMemo, useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import BookingHistoryCard from '@/portal/user/features/booking/components/BookingHistoryCard'
import { useMyBookings } from '@/portal/user/features/booking/hooks/useMyBookings'
import { BookingStatus } from '@/types/scheduling.shared'

type Tab = 'upcoming' | 'past' | 'cancelled'

const TAB_TO_STATUS: Record<Tab, BookingStatus[] | null> = {
  upcoming: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.WAITLISTED],
  past: [BookingStatus.COMPLETED, BookingStatus.NO_SHOW],
  cancelled: [BookingStatus.CANCELLED],
}

export default function MyBookingsPage() {
  const [tab, setTab] = useState<Tab>('upcoming')

  const bookingsQuery = useMyBookings({ page: 1, limit: 50 })
  const bookings = bookingsQuery.data?.data ?? []

  const filtered = useMemo(() => {
    const statuses = TAB_TO_STATUS[tab]
    if (!statuses) return bookings
    return bookings.filter(b => statuses.includes(b.status))
  }, [bookings, tab])

  return (
    <div className='space-y-4'>
      <PageHeader title='My bookings' subtitle='Your upcoming and past bookings.' />

      <div className='flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2'>
        {(
          [
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
            { id: 'cancelled', label: 'Cancelled' },
          ] as const
        ).map(t => (
          <button
            key={t.id}
            type='button'
            onClick={() => setTab(t.id)}
            className={[
              'h-10 rounded-xl px-4 text-xs font-black uppercase tracking-widest transition',
              tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {bookingsQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : bookingsQuery.isError ? (
        <ErrorState title='Failed to load bookings' onRetry={() => void bookingsQuery.refetch()} />
      ) : filtered.length === 0 ? (
        <EmptyState title='No bookings' description='Browse activities to make your first booking.' />
      ) : (
        <div className='grid gap-3'>
          {filtered.map(b => (
            <BookingHistoryCard key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  )
}

