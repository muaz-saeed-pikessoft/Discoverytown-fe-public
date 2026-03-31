import { NextResponse } from 'next/server'

import { rosterBySlot, standaloneBookings } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Booking, BookingStatus } from '@/portal/admin/features/scheduling/types'

function findBooking(id: string): { booking: Booking; list: 'standalone' | 'roster'; slotId?: string; index: number } | null {
  const sIdx = standaloneBookings.findIndex(b => b.id === id)
  if (sIdx >= 0) return { booking: standaloneBookings[sIdx]!, list: 'standalone', index: sIdx }

  for (const [slotId, list] of Object.entries(rosterBySlot)) {
    const idx = list.findIndex(b => b.id === id)
    if (idx >= 0) return { booking: list[idx]!, list: 'roster', slotId, index: idx }
  }
  return null
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await context.params
  const body = (await request.json()) as {
    status?: 'CONFIRMED' | 'CANCELLED'
    depositAmount?: string
    internalNotes?: string
    reason?: string
  }

  const found = findBooking(id)
  if (!found) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  const next: Booking = { ...found.booking }

  if (body.internalNotes !== undefined) {
    next.internalNotes = body.internalNotes
  }

  if (body.depositAmount !== undefined) {
    next.depositAmount = body.depositAmount
  }

  if (body.status === 'CANCELLED') {
    next.status = 'CANCELLED' as BookingStatus
    next.cancellationReason = body.reason ?? 'Rejected'
    next.cancelledAt = new Date().toISOString()
  } else if (body.status === 'CONFIRMED') {
    next.status = 'CONFIRMED' as BookingStatus
    if (body.depositAmount !== undefined) {
      next.depositAmount = body.depositAmount
    }
  }

  if (found.list === 'standalone') {
    standaloneBookings[found.index] = next
  } else if (found.slotId) {
    const list = rosterBySlot[found.slotId] ?? []
    list[found.index] = next
    rosterBySlot[found.slotId] = list
  }

  return NextResponse.json(next)
}
