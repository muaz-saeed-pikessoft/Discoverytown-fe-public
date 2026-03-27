import { NextResponse } from 'next/server'

import { mockServices } from '@/app/api/v1/admin/scheduling/_mockDb'
import type { Service } from '@/portal/admin/features/scheduling/types'

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params

  const current = mockServices.find(s => s.id === id)
  if (!current) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  const created: Service = {
    ...current,
    id: `svc-mock-${Date.now()}`,
    name: `${current.name} (Copy)`,
    createdAt: new Date().toISOString(),
    deletedAt: null,
  }

  mockServices.unshift(created)
  return NextResponse.json(created, { status: 201 })
}

