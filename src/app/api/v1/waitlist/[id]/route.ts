import { NextResponse } from 'next/server'

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params
  if (!id) return NextResponse.json({ message: 'id required' }, { status: 400 })
  return NextResponse.json({ ok: true })
}

