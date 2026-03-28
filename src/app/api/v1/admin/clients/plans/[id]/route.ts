import { NextResponse } from 'next/server'

import { plans } from '@/app/api/v1/admin/clients/_mockDb'

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as Record<string, unknown>
  const index = plans.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  plans[index] = { ...plans[index], ...body }
  return NextResponse.json(plans[index])
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  const index = plans.findIndex(item => item.id === id)
  if (index === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  plans.splice(index, 1)
  return new NextResponse(null, { status: 204 })
}

