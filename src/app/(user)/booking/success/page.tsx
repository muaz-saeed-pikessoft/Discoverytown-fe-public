'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

import PageHeader from '@/components/shared/PageHeader'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import { ROUTES } from '@/constants/routes'
import { useMyBooking } from '@/portal/user/features/booking/hooks/useMyBookings'
import QRCodeDisplay from '@/portal/user/features/booking/components/QRCodeDisplay'
import AddToCalendarButton from '@/portal/user/features/booking/components/AddToCalendarButton'

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams?.get('bookingId') ?? null

  const bookingQuery = useMyBooking(bookingId)
  const booking = bookingQuery.data ?? null

  return (
    <div className='min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#EEF4FF_0%,#FFF6EE_100%)] dt-font-body'>
      <div className='dt-container py-8'>
        <div className='space-y-6'>
          <PageHeader title='Booking Confirmed' subtitle='Your booking has been created.' />

          {bookingQuery.isLoading ? (
            <LoadingSkeleton variant='page' />
          ) : bookingQuery.isError ? (
            <ErrorState title='Failed to load booking' onRetry={() => void bookingQuery.refetch()} />
          ) : !booking ? (
            <EmptyState title='Missing booking' description='Please check your link and try again.' />
          ) : (
            <div className='grid gap-6 lg:grid-cols-[1.3fr_1fr]'>
              <div className='rounded-[28px] border border-black/[0.06] bg-white/90 p-6 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='flex items-center gap-3'>
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    className='flex h-12 w-12 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-700 text-2xl font-black'
                    aria-hidden='true'
                  >
                    ✓
                  </motion.div>
                  <div>
                    <div className='text-lg font-black text-[var(--dt-navy)] dt-font-heading'>Booking confirmed!</div>
                    <div className='mt-1 text-sm font-semibold text-[var(--dt-text-body)]/75'>{booking.service.name}</div>
                  </div>
                </div>

                <div className='mt-5 grid gap-4 sm:grid-cols-2'>
                  <div className='rounded-[18px] bg-[var(--dt-bg-page)] px-4 py-3'>
                    <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Booking ID</div>
                    <div className='mt-1 font-mono text-sm font-black text-[var(--dt-navy)]'>{booking.id}</div>
                  </div>
                  <div className='rounded-[18px] bg-[var(--dt-bg-page)] px-4 py-3'>
                    <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>When</div>
                    <div className='mt-1 text-sm font-semibold text-[var(--dt-navy)]'>
                      {booking.startAt ? new Date(booking.startAt).toLocaleString() : '—'}
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <QRCodeDisplay value={booking.id} />
                </div>
              </div>

              <div className='lg:sticky lg:top-6 h-fit rounded-[28px] border border-black/[0.06] bg-white/90 p-6 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Next steps</div>
                <div className='mt-2 text-lg font-black text-[var(--dt-navy)] dt-font-heading'>Save & share</div>

                <div className='mt-4 flex flex-col gap-2'>
                  <AddToCalendarButton
                    booking={booking}
                    className='h-11 rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-sm font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)]'
                  />
                  <Link href={ROUTES.USER.MY_BOOKINGS} className='dt-btn-primary h-11 flex items-center justify-center px-4'>
                    View my bookings
                  </Link>
                  <Link
                    href={ROUTES.USER.ACTIVITIES}
                    className='h-11 rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-sm font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)] flex items-center justify-center'
                  >
                    Book another
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

