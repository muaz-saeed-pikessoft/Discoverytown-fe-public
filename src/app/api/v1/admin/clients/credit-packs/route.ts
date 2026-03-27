import { NextResponse } from 'next/server'

import { packDefinitions } from '@/app/api/v1/admin/clients/_mockDb'

export async function GET() {
  return NextResponse.json(packDefinitions)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>
  const pack = { ...packDefinitions[0], ...body, id: `pack-${Date.now()}` }
  packDefinitions.unshift(pack)
  return NextResponse.json(pack, { status: 201 })
}

