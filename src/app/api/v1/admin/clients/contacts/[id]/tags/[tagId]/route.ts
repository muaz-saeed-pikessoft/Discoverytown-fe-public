import { NextResponse } from 'next/server'

import { contacts } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string; tagId: string }>
}

export async function DELETE(_: Request, { params }: Params) {
  const { id, tagId } = await params
  const contact = contacts.find(item => item.id === id)
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  contact.tags = contact.tags.filter(item => item.tagId !== tagId)
  return new NextResponse(null, { status: 204 })
}

