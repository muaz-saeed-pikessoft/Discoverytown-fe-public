import { NextResponse } from 'next/server'

import { slots } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const locationId = url.searchParams.get('locationId')
  const staffId = url.searchParams.get('staffId')
  const from = url.searchParams.get('from')
  const to = url.searchParams.get('to')

  const filtered = slots.filter(s => {
    if (locationId && s.locationId !== locationId) return false
    if (staffId && s.staffId !== staffId) return false
    if (from && new Date(s.startAt) < new Date(from)) return false
    if (to && new Date(s.startAt) > new Date(to)) return false
    return true
  })

  return NextResponse.json(filtered)
}

