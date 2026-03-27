import { NextResponse } from 'next/server'

import { contacts, plans, subscriptionsByContact } from '@/app/api/v1/admin/clients/_mockDb'
import { SubscriptionStatus } from '@/types/clients.shared'

export async function POST(request: Request) {
  const body = (await request.json()) as { contactId: string; planId: string }
  const contact = contacts.find(item => item.id === body.contactId)
  const plan = plans.find(item => item.id === body.planId)
  if (!contact || !plan) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  const subscription = {
    id: `sub-${Date.now()}`,
    planId: plan.id,
    plan,
    status: SubscriptionStatus.ACTIVE,
    currentPeriodStart: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString(),
    pausedUntil: null,
    cancelledAt: null,
  }
  subscriptionsByContact[contact.id] = subscription
  return NextResponse.json(subscription, { status: 201 })
}

