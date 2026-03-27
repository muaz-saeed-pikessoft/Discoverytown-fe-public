import { NextResponse } from 'next/server'

import { documents } from '@/app/api/v1/admin/clients/_mockDb'
import type { CreateDocumentInput } from '@/types/clients.shared'

export async function GET() {
  return NextResponse.json(documents)
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateDocumentInput
  const document = {
    id: `doc-${Date.now()}`,
    documentType: body.documentType,
    title: body.title,
    content: body.content,
    version: 1,
    isActive: true,
    requiresFor: body.requiresFor,
  }
  documents.unshift(document)
  return NextResponse.json(document, { status: 201 })
}

