import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { createServiceSlot } from '@/lib/api/admin/scheduling.api'
import type { CreateSlotInput } from '@/portal/admin/features/scheduling/types'

export function useCreateSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSlotInput) => createServiceSlot(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOTS({}) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CALENDAR({}) }),
      ])
    },
  })
}

