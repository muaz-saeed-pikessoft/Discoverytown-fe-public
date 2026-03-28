import { NextResponse } from 'next/server'

import { publicCategories } from '@/app/api/v1/_publicMockDb'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(publicCategories)
}

