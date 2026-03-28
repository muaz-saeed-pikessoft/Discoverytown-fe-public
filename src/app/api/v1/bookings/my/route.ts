import { NextResponse } from 'next/server'

import { myBookings } from '@/app/api/v1/_publicMockDb'
import type { PaginatedResponse } from '@/types/api.types'
import type { Booking } from '@/types/scheduling.shared'

function paginated(items: Booking[]): PaginatedResponse<Booking> {
  return {
    success: true,
    statusCode: 200,
    message: 'OK',
    data: items,
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: items.length,
      itemsPerPage: items.length,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(paginated(myBookings))
}

