import { NextResponse } from 'next/server'

import { slots } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  const slot = slots.find(s => s.id === id)
  if (!slot) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(slot)
}

