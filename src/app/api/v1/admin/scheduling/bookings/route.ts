import { NextResponse } from 'next/server'

import { paginated, rosterBySlot } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const serviceSlotId = url.searchParams.get('serviceSlotId')

  const bookings = serviceSlotId ? (rosterBySlot[serviceSlotId] ?? []) : Object.values(rosterBySlot).flat()
  return NextResponse.json(paginated(bookings))
}

