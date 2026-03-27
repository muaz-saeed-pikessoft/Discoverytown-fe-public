import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { checkIn } from '@/lib/api/admin/scheduling.api'
import type { Booking } from '@/portal/admin/features/scheduling/types'

export function useCheckIn(slotId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingId: string) => checkIn(bookingId),
    onMutate: async bookingId => {
      const queryKey = QUERY_KEYS.ADMIN.SCHEDULING.ROSTER(slotId)
      await queryClient.cancelQueries({ queryKey })

      const previous = queryClient.getQueryData<Booking[]>(queryKey)

      const nowIso = new Date().toISOString()
      if (previous) {
        queryClient.setQueryData<Booking[]>(
          queryKey,
          previous.map(b => (b.id === bookingId ? { ...b, checkedInAt: b.checkedInAt ?? nowIso } : b))
        )
      }

      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      const queryKey = QUERY_KEYS.ADMIN.SCHEDULING.ROSTER(slotId)
      if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.ROSTER(slotId) })
    },
  })
}

