import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getCalendarSlots } from '@/lib/api/admin/scheduling.api'

export function useCalendarSlots(locationId: string | null, dateRange: { from: string; to: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CALENDAR({ locationId, ...dateRange }),
    queryFn: () => getCalendarSlots(locationId, dateRange.from, dateRange.to),
    staleTime: 30_000,
    refetchInterval: 60_000,
  })
}

