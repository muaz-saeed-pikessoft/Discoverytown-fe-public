import { NextResponse } from 'next/server'

import { mockLocations, mockServices, paginated, rosterBySlot, slots, waitlistBySlot } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { ServiceSlot } from '@/portal/admin/features/scheduling/types'
import { SlotStatus } from '@/portal/admin/features/scheduling/types'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(paginated(slots))
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Partial<ServiceSlot> & {
    serviceId?: string
    locationId?: string
    startAt?: string
    endAt?: string
  }

  const service = mockServices.find(s => s.id === body.serviceId)
  const location = mockLocations.find(l => l.id === body.locationId)
  if (!service || !location || !body.startAt || !body.endAt) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const created: ServiceSlot = {
    id: `slot-mock-${Date.now()}`,
    tenantId: service.tenantId,
    serviceId: service.id,
    service,
    locationId: location.id,
    location,
    staffId: null,
    staff: null,
    startAt: body.startAt,
    endAt: body.endAt,
    capacityOverride: null,
    priceOverride: null,
    bookedCount: 0,
    effectiveCapacity: service.capacity,
    status: SlotStatus.SCHEDULED,
    isRecurring: false,
    notes: null,
  }

  slots.unshift(created)
  rosterBySlot[created.id] = []
  waitlistBySlot[created.id] = []

  return NextResponse.json(created, { status: 201 })
}

