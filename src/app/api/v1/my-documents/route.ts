import { NextResponse } from 'next/server'

import { documents, signatures } from '@/app/api/v1/admin/clients/_mockDb'

export async function GET() {
  const data = documents.map(document => {
    const signature = signatures.find(sig => sig.documentId === document.id) ?? null
    return {
      document,
      signature,
      isRequired: true,
    }
  })
  return NextResponse.json(data)
}

