import { NextResponse } from 'next/server'

import { contacts } from '@/app/api/v1/admin/clients/_mockDb'
import type { UpdateContactInput } from '@/types/clients.shared'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  const contact = contacts.find(item => item.id === id)
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(contact)
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as UpdateContactInput
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  contacts[index] = { ...contacts[index], ...body }
  return NextResponse.json(contacts[index])
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  contacts[index] = { ...contacts[index], isActive: false, deletedAt: new Date().toISOString() }
  return new NextResponse(null, { status: 204 })
}

