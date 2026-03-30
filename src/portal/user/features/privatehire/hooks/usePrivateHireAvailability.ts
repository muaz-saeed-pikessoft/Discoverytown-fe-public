import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getPrivateHireAvailability } from '@/lib/api/user/privatehire.api'

export function usePrivateHireAvailability(locationId: string, from: string, to: string, enabled: boolean) {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PRIVATE_HIRE_AVAILABILITY(locationId, from, to),
    queryFn: () => getPrivateHireAvailability(locationId, from, to),
    staleTime: 30_000,
    enabled: enabled && Boolean(locationId) && Boolean(from) && Boolean(to),
  })
}
