import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { updateServiceSlot } from '@/lib/api/admin/scheduling.api'
import type { UpdateSlotInput } from '@/portal/admin/features/scheduling/types'

export function useUpdateSlot(slotId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSlotInput) => updateServiceSlot(slotId, data),
    onSuccess: async updated => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOT(slotId) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CALENDAR({}) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOTS({}) }),
      ])
      queryClient.setQueryData(QUERY_KEYS.ADMIN.SCHEDULING.SLOT(slotId), updated)
    },
  })
}

