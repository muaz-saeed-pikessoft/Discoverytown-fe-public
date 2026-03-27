import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { cancelServiceSlot } from '@/lib/api/admin/scheduling.api'

export function useCancelSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: { slotId: string; reason: string }) => cancelServiceSlot(params.slotId, { reason: params.reason }),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOT(variables.slotId) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOTS({}) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CALENDAR({}) }),
      ])
    },
  })
}

