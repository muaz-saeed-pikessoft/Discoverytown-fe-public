import { Suspense } from 'react'
import BookingPageClient from '@/components/booking/BookingPageClient'

export default function BookPage() {
  return (
    <Suspense>
      <BookingPageClient />
    </Suspense>
  )
}
