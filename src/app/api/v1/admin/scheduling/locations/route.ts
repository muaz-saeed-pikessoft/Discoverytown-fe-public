import { NextResponse } from 'next/server'

import { mockLocations } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Location } from '@/portal/admin/features/scheduling/types'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(mockLocations)
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Partial<Location>

  if (!body.name) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const created: Location = {
    id: `loc-mock-${Date.now()}`,
    tenantId: 'tenant-mock-1',
    name: body.name,
    address: body.address ?? null,
    city: body.city ?? null,
    timezone: body.timezone ?? null,
    phone: body.phone ?? null,
    email: body.email ?? null,
    isActive: body.isActive ?? true,
    settings: (body.settings as Record<string, unknown> | undefined) ?? {},
    createdAt: new Date().toISOString(),
    deletedAt: null,
  }

  mockLocations.unshift(created)
  return NextResponse.json(created, { status: 201 })
}

