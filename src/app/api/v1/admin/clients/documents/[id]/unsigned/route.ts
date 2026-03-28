import { NextResponse } from 'next/server'

import { contacts } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  void id
  const summaries = contacts.map(contact => ({
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    contactType: contact.contactType,
  }))
  return NextResponse.json(summaries)
}

