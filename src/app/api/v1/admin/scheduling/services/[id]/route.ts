import { NextResponse } from 'next/server'

import { mockServices } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Service } from '@/portal/admin/features/scheduling/types'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  const body = (await request.json()) as Partial<Service>

  const idx = mockServices.findIndex(s => s.id === id)
  if (idx < 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  const current = mockServices[idx]!
  const updated: Service = {
    ...current,
    locationId: body.locationId ?? current.locationId,
    categoryId: body.categoryId ?? current.categoryId,
    category: body.category ?? current.category,
    serviceType: body.serviceType ?? current.serviceType,
    name: body.name ?? current.name,
    description: body.description ?? current.description,
    durationMinutes: body.durationMinutes ?? current.durationMinutes,
    capacity: body.capacity ?? current.capacity,
    basePrice: body.basePrice ?? current.basePrice,
    subscriptionPrice: body.subscriptionPrice ?? current.subscriptionPrice,
    requiresWaiver: body.requiresWaiver ?? current.requiresWaiver,
    ageMin: body.ageMin ?? current.ageMin,
    ageMax: body.ageMax ?? current.ageMax,
    isActive: body.isActive ?? current.isActive,
    metadata: body.metadata ?? current.metadata,
  }

  mockServices[idx] = updated
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params

  const idx = mockServices.findIndex(s => s.id === id)
  if (idx < 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  mockServices.splice(idx, 1)
  return NextResponse.json({ ok: true })
}

