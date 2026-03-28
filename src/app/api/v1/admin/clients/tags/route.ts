import { NextResponse } from 'next/server'

import { tags } from '@/app/api/v1/admin/clients/_mockDb'

export async function GET() {
  return NextResponse.json(tags)
}

export async function POST(request: Request) {
  const body = (await request.json()) as { name: string; color: string; isAuto?: boolean }
  const tag = { id: `tag-${Date.now()}`, name: body.name, color: body.color, isAuto: !!body.isAuto, contactCount: 0 }
  tags.unshift(tag)
  return NextResponse.json(tag, { status: 201 })
}

