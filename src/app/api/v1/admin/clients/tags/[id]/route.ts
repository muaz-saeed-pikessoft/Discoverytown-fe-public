import { NextResponse } from 'next/server'

import { tags } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as Record<string, unknown>
  const index = tags.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  tags[index] = { ...tags[index], ...body }
  return NextResponse.json(tags[index])
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  const index = tags.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  tags.splice(index, 1)
  return new NextResponse(null, { status: 204 })
}

