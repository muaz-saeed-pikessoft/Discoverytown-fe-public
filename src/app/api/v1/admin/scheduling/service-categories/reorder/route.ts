import { NextResponse } from 'next/server'

import { mockCategories } from '@/app/api/v1/admin/scheduling/_mockDb'

type ReorderPayload = {
  items?: Array<{ id: string; displayOrder: number }>
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as ReorderPayload
  const items = body.items ?? []

  if (!Array.isArray(items)) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const orderMap = new Map(items.map(i => [i.id, i.displayOrder]))

  for (const category of mockCategories) {
    const nextOrder = orderMap.get(category.id)
    if (nextOrder !== undefined) {
      category.displayOrder = String(nextOrder)
    }
  }

  mockCategories.sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder))

  return NextResponse.json({ success: true })
}

