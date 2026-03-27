import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getBookings } from '@/lib/api/admin/scheduling.api'
import type { BookingFilters } from '@/portal/admin/features/scheduling/types'

export function useBookings(filters: BookingFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.BOOKINGS(filters),
    queryFn: () => getBookings(filters),
    staleTime: 30_000,
  })
}

