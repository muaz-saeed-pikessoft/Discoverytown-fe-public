import { NextResponse } from 'next/server'

import { buildAvailabilityGrid } from '@/app/api/v1/admin/scheduling/calendar/availability/build-availability-grid'
import { slots } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const locationId = url.searchParams.get('locationId')
  const from = url.searchParams.get('from')
  const to = url.searchParams.get('to')

  if (!locationId || !from || !to) {
    return NextResponse.json({ message: 'locationId, from, and to are required' }, { status: 400 })
  }

  const locationSlots = slots.filter(s => s.locationId === locationId)
  return NextResponse.json(buildAvailabilityGrid(locationSlots, from, to))
}
