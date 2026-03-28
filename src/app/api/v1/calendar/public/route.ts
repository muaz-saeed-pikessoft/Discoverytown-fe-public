import { NextResponse } from 'next/server'

import { publicSlots } from '@/app/api/v1/_publicMockDb'

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const serviceType = url.searchParams.get('serviceType')

  const result = serviceType ? publicSlots.filter(s => s.service.serviceType === serviceType) : publicSlots
  return NextResponse.json(result)
}

