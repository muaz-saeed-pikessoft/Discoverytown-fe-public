import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { cancelBooking } from '@/lib/api/admin/scheduling.api'
import type { CancelBookingInput } from '@/portal/admin/features/scheduling/types'

export function useCancelBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: { bookingId: string; data: CancelBookingInput; slotId?: string }) =>
      cancelBooking(params.bookingId, params.data),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.BOOKINGS({}) }),
        variables.slotId ? queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SLOT(variables.slotId) }) : Promise.resolve(),
      ])
    },
  })
}

