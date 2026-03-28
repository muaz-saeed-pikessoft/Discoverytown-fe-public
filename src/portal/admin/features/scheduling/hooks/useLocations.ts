import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getLocations } from '@/lib/api/admin/scheduling.api'

export function useLocations() {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.LOCATIONS,
    queryFn: () => getLocations(),
    staleTime: 300_000,
  })
}

