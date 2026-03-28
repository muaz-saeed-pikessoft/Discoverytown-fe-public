import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getServiceSlots } from '@/lib/api/admin/scheduling.api'
import type { SlotFilters } from '@/portal/admin/features/scheduling/types'

export function useServiceSlots(filters: SlotFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOTS(filters),
    queryFn: () => getServiceSlots(filters),
    staleTime: 30_000,
  })
}

