import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getServices } from '@/lib/api/admin/scheduling.api'
import type { ServiceFilters } from '@/portal/admin/features/scheduling/types'

export function useServices(filters: ServiceFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SERVICES(filters),
    queryFn: () => getServices(filters),
    staleTime: 30_000,
  })
}

