import { NextResponse } from 'next/server'

import { plans, subscriptionsByContact } from '@/app/api/v1/admin/clients/_mockDb'
import { SubscriptionStatus } from '@/types/clients.shared'

const meId = 'contact-parent-1'

export async function GET() {
  return NextResponse.json(subscriptionsByContact[meId] ?? null)
}

export async function POST(request: Request) {
  const body = (await request.json()) as { planId: string }
  const plan = plans.find(item => item.id === body.planId)
  if (!plan) return NextResponse.json({ message: 'Plan not found' }, { status: 404 })
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
  subscriptionsByContact[meId] = subscription
  return NextResponse.json(subscription, { status: 201 })
}

