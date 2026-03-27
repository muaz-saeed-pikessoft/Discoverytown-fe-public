import { NextResponse } from 'next/server'

import { contacts, tags } from '@/app/api/v1/admin/clients/_mockDb'

export async function POST(request: Request) {
  const body = (await request.json()) as { contactIds: string[]; tagIds: string[] }
  const selectedTags = tags.filter(tag => body.tagIds.includes(tag.id))
  for (const contact of contacts) {
    if (!body.contactIds.includes(contact.id)) continue
    for (const selectedTag of selectedTags) {
      const alreadyAssigned = contact.tags.some(item => item.tagId === selectedTag.id)
      if (alreadyAssigned) continue
      contact.tags.push({ tagId: selectedTag.id, tag: selectedTag, appliedAt: new Date().toISOString() })
    }
  }
  return new NextResponse(null, { status: 204 })
}

