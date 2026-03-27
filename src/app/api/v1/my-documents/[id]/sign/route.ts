import { NextResponse } from 'next/server'

import { documents, signatures } from '@/app/api/v1/admin/clients/_mockDb'
import type { SignDocumentInput } from '@/types/clients.shared'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as SignDocumentInput
  const document = documents.find(item => item.id === id)
  if (!document) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  const signature = {
    id: `sig-${Date.now()}`,
    documentId: id,
    document: { title: document.title, version: document.version, documentType: document.documentType },
    signedAt: body.acceptedAt,
    documentVersion: document.version,
    isValid: true,
  }
  signatures.unshift(signature)
  return NextResponse.json(signature, { status: 201 })
}

