import { NextResponse } from 'next/server'

import { contacts, relationships } from '@/app/api/v1/admin/clients/_mockDb'
import type { CreateRelationshipInput } from '@/types/clients.shared'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  return NextResponse.json(relationships.filter(item => item.contactIdA === id))
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as CreateRelationshipInput
  const partner = contacts.find(item => item.id === body.contactIdB)
  if (!partner) return NextResponse.json({ message: 'Partner not found' }, { status: 404 })
  const rel = {
    id: `rel-${Date.now()}`,
    contactIdA: id,
    contactIdB: body.contactIdB,
    relationshipType: body.relationshipType,
    isPrimary: body.isPrimary,
    permissions: body.permissions,
    partner: {
      id: partner.id,
      firstName: partner.firstName,
      lastName: partner.lastName,
      email: partner.email,
      contactType: partner.contactType,
    },
  }
  relationships.unshift(rel)
  return NextResponse.json(rel, { status: 201 })
}

