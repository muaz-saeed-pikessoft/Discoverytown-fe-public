import { NextResponse } from 'next/server'

import { waitlistBySlot } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  return NextResponse.json(waitlistBySlot[id] ?? [])
}

