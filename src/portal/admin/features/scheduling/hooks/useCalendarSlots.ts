import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getCalendarSlots } from '@/lib/api/admin/scheduling.api'

export function useCalendarSlots(
  locationId: string | null,
  dateRange: { from: string; to: string },
  staffId?: string | null
) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CALENDAR({ locationId, staffId: staffId ?? null, ...dateRange }),
    queryFn: () => getCalendarSlots(locationId, dateRange.from, dateRange.to, staffId),
    staleTime: 30_000,
    refetchInterval: 60_000,
  })
}

