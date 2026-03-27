'use client'

import { useMemo, useState } from 'react'

import AccountShell from '@/portal/user/features/account/components/AccountShell'
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
    <AccountShell title='Bookings' subtitle='See your upcoming bookings and your history.'>
      <div className='space-y-4'>
        <div className='flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--dt-border)] bg-white/80 p-2 shadow-sm backdrop-blur-xl'>
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
                'rounded-[999px] px-4 py-2 text-[12px] font-black uppercase tracking-[0.14em] transition',
                tab === t.id
                  ? 'bg-[var(--dt-primary)] text-white shadow-[0_14px_34px_rgba(47,111,237,0.24)]'
                  : 'text-[var(--dt-text-body)] hover:bg-[var(--dt-bg-page)] hover:text-[var(--dt-primary)]',
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
    </AccountShell>
  )
}

