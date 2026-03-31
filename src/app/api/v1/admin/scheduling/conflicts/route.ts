import { NextResponse } from 'next/server'

import { slots } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const locationId = url.searchParams.get('locationId')
  const startAt = url.searchParams.get('startAt')
  const endAt = url.searchParams.get('endAt')
  const excludeSlotId = url.searchParams.get('excludeSlotId')

  if (!locationId || !startAt || !endAt) {
    return NextResponse.json({ message: 'locationId, startAt, and endAt are required' }, { status: 400 })
  }

  const start = new Date(startAt)
  const end = new Date(endAt)

  const conflicts = slots.filter(s => {
    if (s.locationId !== locationId) return false
    if (excludeSlotId && s.id === excludeSlotId) return false
    const sStart = new Date(s.startAt)
    const sEnd = new Date(s.endAt)
    return sStart < end && sEnd > start
  })

  return NextResponse.json({ hasConflicts: conflicts.length > 0, conflicts })
}
