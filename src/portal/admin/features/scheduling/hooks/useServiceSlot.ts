import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getServiceSlot } from '@/lib/api/admin/scheduling.api'

export function useServiceSlot(slotId: string | null) {
  return useQuery({
    queryKey: slotId ? QUERY_KEYS.ADMIN.SCHEDULING.SLOT(slotId) : QUERY_KEYS.ADMIN.SCHEDULING.SLOT(''),
    queryFn: () => {
      if (!slotId) throw new Error('slotId is required')
      return getServiceSlot(slotId)
    },
    enabled: !!slotId,
    staleTime: 60_000,
  })
}

