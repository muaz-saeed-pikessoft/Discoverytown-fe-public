import { NextResponse } from 'next/server'

import { contacts, creditLedgerByContact } from '@/app/api/v1/admin/clients/_mockDb'
import { CreditTransactionType } from '@/types/clients.shared'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as { amount: number; reason: string }
  const contact = contacts.find(item => item.id === id)
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  const current = Number(contact.creditBalance)
  contact.creditBalance = String(current + body.amount)
  const ledger = creditLedgerByContact[id] ?? []
  ledger.unshift({
    id: `ledger-${Date.now()}`,
    transactionType: CreditTransactionType.MANUAL_ADD,
    creditsChange: body.amount,
    balanceAfter: Number(contact.creditBalance),
    bookingId: null,
    notes: body.reason,
    createdAt: new Date().toISOString(),
  })
  creditLedgerByContact[id] = ledger
  return new NextResponse(null, { status: 204 })
}

