import { NextResponse } from 'next/server'

import { paginated, rosterBySlot, standaloneBookings } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Booking, BookingStatus, BookingType } from '@/portal/admin/features/scheduling/types'

function allBookings(): Booking[] {
  return [...Object.values(rosterBySlot).flat(), ...standaloneBookings]
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const serviceSlotId = url.searchParams.get('serviceSlotId')
  const bookingTypes = [
    ...url.searchParams.getAll('bookingType'),
    ...url.searchParams.getAll('bookingType[]'),
  ]
  const statuses = [...url.searchParams.getAll('status'), ...url.searchParams.getAll('status[]')]

  let bookings = serviceSlotId ? (rosterBySlot[serviceSlotId] ?? []) : allBookings()

  if (bookingTypes.length > 0) {
    const set = new Set(bookingTypes as BookingType[])
    bookings = bookings.filter(b => set.has(b.bookingType))
  }

  if (statuses.length > 0) {
    const set = new Set(statuses as BookingStatus[])
    bookings = bookings.filter(b => set.has(b.status))
  }

  return NextResponse.json(paginated(bookings))
}
