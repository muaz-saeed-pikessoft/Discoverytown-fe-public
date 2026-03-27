import { NextResponse } from 'next/server'

import { mockCategories } from '@/app/api/v1/admin/scheduling/_mockDb'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(mockCategories)
}

