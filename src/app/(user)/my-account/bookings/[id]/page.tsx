'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

import AccountShell from '@/portal/user/features/account/components/AccountShell'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import { ROUTES } from '@/constants/routes'
import { useMyBooking } from '@/portal/user/features/booking/hooks/useMyBookings'
import QRCodeDisplay from '@/portal/user/features/booking/components/QRCodeDisplay'

export default function MyBookingDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ?? null

  const bookingQuery = useMyBooking(id)
  const booking = bookingQuery.data ?? null

  return (
    <AccountShell title='Booking details' subtitle={id ? `Booking ID: ${id}` : undefined}>
      {bookingQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : bookingQuery.isError ? (
        <ErrorState title='Failed to load booking' onRetry={() => void bookingQuery.refetch()} />
      ) : !booking ? (
        <EmptyState title='Not found' description='This booking could not be found.' />
      ) : (
        <div className='grid gap-4 rounded-3xl border border-[var(--dt-border)] bg-white/85 p-6 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
          <div className='grid gap-2 sm:grid-cols-3'>
            <div className='rounded-2xl border border-[var(--dt-border)] bg-white/70 p-4'>
              <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Service</div>
              <div className='mt-2 text-[14px] font-black text-[var(--dt-navy)]'>{booking.service.name}</div>
            </div>
            <div className='rounded-2xl border border-[var(--dt-border)] bg-white/70 p-4'>
              <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Status</div>
              <div className='mt-2 text-[14px] font-bold text-[var(--dt-text-body)]'>{booking.status}</div>
            </div>
            <div className='rounded-2xl border border-[var(--dt-border)] bg-white/70 p-4'>
              <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Total</div>
              <div className='mt-2 text-[14px] font-black text-[var(--dt-navy)]'>${booking.totalAmount}</div>
            </div>
          </div>

          <QRCodeDisplay value={booking.id} />

          <div className='flex justify-end'>
            <Link
              href={ROUTES.USER.MY_BOOKINGS}
              className='rounded-[999px] border border-[var(--dt-border)] bg-white px-4 py-2.5 text-[14px] font-bold text-[var(--dt-text-body)] no-underline transition-all hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
            >
              Back to bookings
            </Link>
          </div>
        </div>
      )}
    </AccountShell>
  )
}

