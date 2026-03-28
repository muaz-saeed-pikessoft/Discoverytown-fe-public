import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { promoteWaitlist } from '@/lib/api/admin/scheduling.api'

export function usePromoteWaitlist(slotId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => promoteWaitlist(slotId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.WAITLIST(slotId) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOT(slotId) }),
      ])
    },
  })
}

