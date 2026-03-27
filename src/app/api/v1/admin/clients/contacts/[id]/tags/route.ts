import { NextResponse } from 'next/server'

import { contacts, tags } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as { tagId: string }
  const contact = contacts.find(item => item.id === id)
  const tag = tags.find(item => item.id === body.tagId)
  if (!contact || !tag) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  if (!contact.tags.some(item => item.tagId === tag.id)) {
    contact.tags.push({ tagId: tag.id, tag, appliedAt: new Date().toISOString() })
  }
  return new NextResponse(null, { status: 204 })
}

