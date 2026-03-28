import { NextResponse } from 'next/server'

import { contacts } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  const contact = contacts.find(item => item.id === id)
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ totalSpend: contact.totalSpend, lastBookingAt: null })
}

