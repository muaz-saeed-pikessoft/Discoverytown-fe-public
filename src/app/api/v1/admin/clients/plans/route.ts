import { NextResponse } from 'next/server'

import { plans } from '@/app/api/v1/admin/clients/_mockDb'

export async function GET() {
  return NextResponse.json(plans)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>
  const plan = { ...plans[0], ...body, id: `plan-${Date.now()}` }
  plans.unshift(plan)
  return NextResponse.json(plan, { status: 201 })
}

