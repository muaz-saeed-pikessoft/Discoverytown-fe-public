import { NextResponse } from 'next/server'

import { mockAddOns } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { AddOn } from '@/portal/admin/features/scheduling/types'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(mockAddOns)
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Partial<AddOn>
  if (!body.name || !body.pricingType || !body.price) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const created: AddOn = {
    id: `addon-mock-${Date.now()}`,
    name: body.name,
    pricingType: body.pricingType,
    price: body.price,
    applicableBookingTypes: body.applicableBookingTypes ?? [],
    isActive: body.isActive ?? true,
  }

  mockAddOns.unshift(created)
  return NextResponse.json(created, { status: 201 })
}

