import { NextResponse } from 'next/server'

import { contacts, paginated } from '@/app/api/v1/admin/clients/_mockDb'
import type { CreateContactInput } from '@/types/clients.shared'

export async function GET() {
  return NextResponse.json(paginated(contacts))
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateContactInput
  const contact = {
    ...contacts[0],
    ...body,
    id: `contact-${Date.now()}`,
    createdAt: new Date().toISOString(),
    deletedAt: null,
  }
  contacts.unshift(contact)
  return NextResponse.json(contact, { status: 201 })
}

