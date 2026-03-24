import { Suspense } from 'react'
import BookingPageClient from '@/modules/booking/components/BookingPageClient'

export default function BookPage() {
  return (
    <Suspense>
      <BookingPageClient />
    </Suspense>
  )
}
