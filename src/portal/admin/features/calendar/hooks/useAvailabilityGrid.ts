import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getAvailabilityGrid } from '@/lib/api/admin/calendar.api'

export function useAvailabilityGrid(locationId: string, from: string, to: string, enabled = true) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CALENDAR.AVAILABILITY_GRID(locationId, from, to),
    queryFn: () => getAvailabilityGrid(locationId, from, to),
    staleTime: 30_000,
    enabled: enabled && Boolean(locationId) && Boolean(from) && Boolean(to),
  })
}
