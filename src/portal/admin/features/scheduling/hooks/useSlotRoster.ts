import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getSlotRoster } from '@/lib/api/admin/scheduling.api'

export function useSlotRoster(slotId: string | null) {
  return useQuery({
    queryKey: slotId ? QUERY_KEYS.ADMIN.SCHEDULING.ROSTER(slotId) : QUERY_KEYS.ADMIN.SCHEDULING.ROSTER(''),
    queryFn: () => {
      if (!slotId) throw new Error('slotId is required')
      return getSlotRoster(slotId)
    },
    enabled: !!slotId,
    staleTime: 30_000,
  })
}

