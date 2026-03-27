'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

import PageHeader from '@/components/shared/PageHeader'
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
    <div className='space-y-4'>
      <PageHeader title='Booking details' subtitle={id ? `Booking ID: ${id}` : ''} />

      {bookingQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : bookingQuery.isError ? (
        <ErrorState title='Failed to load booking' onRetry={() => void bookingQuery.refetch()} />
      ) : !booking ? (
        <EmptyState title='Not found' description='This booking could not be found.' />
      ) : (
        <div className='grid gap-4 rounded-2xl border border-gray-200 bg-white p-6'>
          <div className='grid gap-1'>
            <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Service</div>
            <div className='text-sm font-black text-gray-900'>{booking.service.name}</div>
          </div>
          <div className='grid gap-1'>
            <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Status</div>
            <div className='text-sm font-semibold text-gray-800'>{booking.status}</div>
          </div>
          <div className='grid gap-1'>
            <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Total</div>
            <div className='text-sm font-black text-gray-900'>${booking.totalAmount}</div>
          </div>

          <QRCodeDisplay value={booking.id} />

          <div className='flex justify-end'>
            <Link
              href={ROUTES.USER.MY_BOOKINGS}
              className='h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-black text-gray-700 transition hover:bg-gray-50 flex items-center justify-center'
            >
              Back to bookings
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

