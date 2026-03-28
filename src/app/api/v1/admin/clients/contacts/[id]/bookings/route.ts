import { NextResponse } from 'next/server'

import { bookingsByContact, paginated } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  return NextResponse.json(paginated(bookingsByContact[id] ?? []))
}

