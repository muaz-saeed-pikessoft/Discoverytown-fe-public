import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getOpenAvailability } from '@/lib/api/user/booking.api'

export function useOpenAvailability(serviceId: string | null, date: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.OPEN_AVAILABILITY(serviceId ?? '', date ?? ''),
    queryFn: () => getOpenAvailability(serviceId!, date!),
    enabled: !!(serviceId && date),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })
}

