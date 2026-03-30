import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Record<string, unknown>
  if (!body?.email || !body?.firstName) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }

  const id = `ph-${Date.now()}`
  return NextResponse.json({
    id,
    message: 'Thank you — our team will contact you within 24 hours.',
  })
}
