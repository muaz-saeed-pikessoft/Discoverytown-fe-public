import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { bulkCheckIn } from '@/lib/api/admin/scheduling.api'

export function useBulkCheckIn(slotId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingIds: string[]) => bulkCheckIn(slotId, bookingIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.ROSTER(slotId) })
    },
  })
}

