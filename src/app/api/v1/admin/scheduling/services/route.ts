import { NextResponse } from 'next/server'

import { mockServices, paginated } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Service } from '@/portal/admin/features/scheduling/types'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(paginated(mockServices))
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Partial<Service>
  if (!body.name || !body.categoryId || !body.serviceType) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const created: Service = {
    id: `svc-mock-${Date.now()}`,
    tenantId: 'tenant-mock-1',
    locationId: body.locationId ?? null,
    categoryId: body.categoryId,
    category: body.category ?? { id: body.categoryId, tenantId: 'tenant-mock-1', name: 'Category', icon: null, displayOrder: '1', isActive: true },
    serviceType: body.serviceType,
    bookingMode: (body as any).bookingMode ?? 'SCHEDULED',
    name: body.name,
    description: body.description ?? null,
    durationMinutes: body.durationMinutes ?? 60,
    capacity: body.capacity ?? 1,
    basePrice: body.basePrice ?? '0.00',
    subscriptionPrice: body.subscriptionPrice ?? null,
    requiresWaiver: body.requiresWaiver ?? false,
    ageMin: body.ageMin ?? null,
    ageMax: body.ageMax ?? null,
    isActive: body.isActive ?? true,
    minDurationMinutes: (body as any).minDurationMinutes ?? null,
    maxDurationMinutes: (body as any).maxDurationMinutes ?? null,
    slotIncrementMinutes: (body as any).slotIncrementMinutes ?? null,
    maxConcurrent: (body as any).maxConcurrent ?? null,
    minAdvanceHours: (body as any).minAdvanceHours ?? null,
    maxAdvanceHours: (body as any).maxAdvanceHours ?? null,
    metadata: body.metadata ?? {},
    createdAt: new Date().toISOString(),
    deletedAt: null,
  }

  mockServices.unshift(created)
  return NextResponse.json(created, { status: 201 })
}

