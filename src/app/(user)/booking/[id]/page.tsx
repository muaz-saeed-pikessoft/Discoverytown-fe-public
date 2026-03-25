'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

interface BookingDetailPageProps {
  params: { id: string }
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  return (
    <div className='mx-auto w-full max-w-5xl px-5 py-10'>
      <PageHeader title='Booking' subtitle={`Booking ID: ${params.id}`} />
      <EmptyState title='Coming soon' description='Booking confirmation and details will appear here.' />
    </div>
  )
}

