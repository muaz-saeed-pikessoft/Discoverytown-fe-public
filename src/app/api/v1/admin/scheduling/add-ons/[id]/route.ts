import { NextResponse } from 'next/server'

import { mockAddOns } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { AddOn } from '@/portal/admin/features/scheduling/types'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  const body = (await request.json()) as Partial<AddOn>

  const idx = mockAddOns.findIndex(a => a.id === id)
  if (idx < 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  const current = mockAddOns[idx]!
  const updated: AddOn = {
    ...current,
    name: body.name ?? current.name,
    pricingType: body.pricingType ?? current.pricingType,
    price: body.price ?? current.price,
    applicableBookingTypes: body.applicableBookingTypes ?? current.applicableBookingTypes,
    isActive: body.isActive ?? current.isActive,
  }

  mockAddOns[idx] = updated
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params

  const idx = mockAddOns.findIndex(a => a.id === id)
  if (idx < 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  mockAddOns.splice(idx, 1)
  return NextResponse.json({ ok: true })
}

