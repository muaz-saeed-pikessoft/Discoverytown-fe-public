import { NextResponse } from 'next/server'

import { contacts } from '@/app/api/v1/admin/clients/_mockDb'
import type { UpdateProfileInput } from '@/types/clients.shared'

const meId = 'contact-parent-1'

export async function GET() {
  const me = contacts.find(item => item.id === meId)
  if (!me) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(me)
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as UpdateProfileInput
  const index = contacts.findIndex(item => item.id === meId)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  contacts[index] = { ...contacts[index], ...body }
  return NextResponse.json(contacts[index])
}

