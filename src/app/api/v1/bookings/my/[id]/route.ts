import { NextResponse } from 'next/server'

import { myBookings } from '@/app/api/v1/_publicMockDb'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  const booking = myBookings.find(b => b.id === id)
  if (!booking) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(booking)
}

