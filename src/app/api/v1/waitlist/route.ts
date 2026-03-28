import { NextResponse } from 'next/server'

import type { WaitlistEntry } from '@/types/scheduling.shared'
import { WaitlistStatus } from '@/types/scheduling.shared'

type Body = {
  slotId?: string
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Body
  if (!body.slotId) return NextResponse.json({ message: 'slotId is required' }, { status: 400 })

  const entry: WaitlistEntry = {
    id: `wl_${Date.now()}`,
    serviceSlotId: body.slotId,
    contactId: 'contact-1',
    contact: { id: 'contact-1', firstName: 'Test', lastName: 'User' },
    position: 1,
    notifiedAt: null,
    expiresAt: null,
    status: WaitlistStatus.WAITING,
  }

  return NextResponse.json(entry, { status: 201 })
}

