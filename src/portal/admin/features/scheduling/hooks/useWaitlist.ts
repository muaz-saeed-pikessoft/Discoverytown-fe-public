import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getWaitlist } from '@/lib/api/admin/scheduling.api'

export function useWaitlist(slotId: string | null) {
  return useQuery({
    queryKey: slotId ? QUERY_KEYS.ADMIN.SCHEDULING.WAITLIST(slotId) : QUERY_KEYS.ADMIN.SCHEDULING.WAITLIST(''),
    queryFn: () => {
      if (!slotId) throw new Error('slotId is required')
      return getWaitlist(slotId)
    },
    enabled: !!slotId,
    staleTime: 30_000,
  })
}

