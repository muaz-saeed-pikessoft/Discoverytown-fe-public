import { NextResponse } from 'next/server'

import { documents } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  const document = documents.find(item => item.id === id)
  if (!document) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(document)
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as Record<string, unknown>
  const index = documents.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  documents[index] = { ...documents[index], ...body }
  return NextResponse.json(documents[index])
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  const index = documents.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  documents.splice(index, 1)
  return new NextResponse(null, { status: 204 })
}

