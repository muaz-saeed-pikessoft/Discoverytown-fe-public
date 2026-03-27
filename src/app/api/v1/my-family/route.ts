import { NextResponse } from 'next/server'

import { contacts, relationships } from '@/app/api/v1/admin/clients/_mockDb'
import { RelationshipType } from '@/types/clients.shared'

const meId = 'contact-parent-1'

export async function GET() {
  return NextResponse.json(relationships.filter(item => item.contactIdA === meId))
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    firstName: string
    lastName: string
    dob: string
    allergies: string[]
    emergencyContact: { name: string; phone: string; relation: string }
    schoolName?: string
  }
  const child = {
    ...contacts[1],
    id: `contact-child-${Date.now()}`,
    firstName: body.firstName,
    lastName: body.lastName,
    dob: body.dob,
    metadata: {
      allergies: body.allergies,
      emergencyContact: body.emergencyContact,
      schoolName: body.schoolName,
    },
  }
  contacts.push(child)
  const relationship = {
    id: `rel-${Date.now()}`,
    contactIdA: meId,
    contactIdB: child.id,
    relationshipType: RelationshipType.PARENT_CHILD,
    isPrimary: false,
    permissions: { canBook: true, canPay: true },
    partner: {
      id: child.id,
      firstName: child.firstName,
      lastName: child.lastName,
      email: child.email,
      contactType: child.contactType,
    },
  }
  relationships.unshift(relationship)
  return NextResponse.json(relationship, { status: 201 })
}

