import { NextResponse } from 'next/server'

import { contacts } from '@/app/api/v1/admin/clients/_mockDb'

export async function POST(request: Request) {
  const body = (await request.json()) as { sourceId: string; targetId: string }
  const source = contacts.find(item => item.id === body.sourceId)
  const target = contacts.find(item => item.id === body.targetId)
  if (!source || !target) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  source.isActive = false
  source.deletedAt = new Date().toISOString()
  return NextResponse.json(target)
}

