import { NextResponse } from 'next/server'

import { publicServices } from '@/app/api/v1/_publicMockDb'

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url)
  const serviceType = url.searchParams.get('serviceType')
  const categoryId = url.searchParams.get('categoryId')

  let result = [...publicServices]
  if (serviceType) result = result.filter(s => s.serviceType === serviceType)
  if (categoryId) result = result.filter(s => s.categoryId === categoryId)
  return NextResponse.json(result)
}

