import { NextResponse } from 'next/server'

import { contacts, packDefinitions, packsByContact } from '@/app/api/v1/admin/clients/_mockDb'
import { CreditPackStatus } from '@/types/clients.shared'

export async function POST(request: Request) {
  const body = (await request.json()) as { contactId: string; packDefinitionId: string }
  const contact = contacts.find(item => item.id === body.contactId)
  const packDefinition = packDefinitions.find(item => item.id === body.packDefinitionId)
  if (!contact || !packDefinition) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  const purchase = {
    id: `purchase-${Date.now()}`,
    packDefinitionId: packDefinition.id,
    packDefinition,
    creditsPurchased: packDefinition.creditCount,
    creditsRemaining: packDefinition.creditCount,
    pricePaid: packDefinition.price,
    purchasedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + packDefinition.validityDays * 24 * 60 * 60_000).toISOString(),
    status: CreditPackStatus.ACTIVE,
  }
  packsByContact[contact.id] = [purchase, ...(packsByContact[contact.id] ?? [])]
  return NextResponse.json(purchase, { status: 201 })
}

