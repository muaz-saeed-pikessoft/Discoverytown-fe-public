import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { createRecurringSlots } from '@/lib/api/admin/scheduling.api'
import type { CreateRecurringInput } from '@/portal/admin/features/scheduling/types'

export function useCreateRecurringRule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRecurringInput) => createRecurringSlots(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CALENDAR({}) })
    },
  })
}

