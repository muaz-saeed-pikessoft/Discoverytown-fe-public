import { NextResponse } from 'next/server'

import { mockLocations } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Location } from '@/portal/admin/features/scheduling/types'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  const body = (await request.json()) as Partial<Location>

  const idx = mockLocations.findIndex(l => l.id === id)
  if (idx < 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  const current = mockLocations[idx]!
  const updated: Location = {
    ...current,
    name: body.name ?? current.name,
    address: body.address ?? current.address,
    city: body.city ?? current.city,
    timezone: body.timezone ?? current.timezone,
    phone: body.phone ?? current.phone,
    email: body.email ?? current.email,
    isActive: body.isActive ?? current.isActive,
    settings: (body.settings as Record<string, unknown> | undefined) ?? current.settings,
  }

  mockLocations[idx] = updated
  return NextResponse.json(updated)
}

