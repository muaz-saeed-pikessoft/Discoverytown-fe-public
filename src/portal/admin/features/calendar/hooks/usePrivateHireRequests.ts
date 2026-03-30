import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getPrivateHireRequests } from '@/lib/api/admin/calendar.api'
import type { PrivateHireRequestFilters } from '@/portal/admin/features/calendar/types'

export function usePrivateHireRequests(filters: PrivateHireRequestFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CALENDAR.PRIVATE_HIRE_REQUESTS(filters),
    queryFn: () => getPrivateHireRequests(filters),
    staleTime: 30_000,
  })
}
