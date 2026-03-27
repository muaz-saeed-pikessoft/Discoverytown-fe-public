import { Suspense } from 'react'
import BookingPageClient from '@/modules/booking/components/BookingPageClient'
import OpenBookRedirector from '@/app/(user)/book/OpenBookRedirector'

export default function BookPage() {
  return (
    <Suspense>
      <OpenBookRedirector />
      <BookingPageClient />
    </Suspense>
  )
}
