import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getApiErrorMessage } from '@/lib/api/errors'
import { reviewPrivateHireRequest } from '@/lib/api/admin/calendar.api'
import type { ReviewPrivateHireInput } from '@/portal/admin/features/calendar/types'

export function useReviewPrivateHire() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ReviewPrivateHireInput }) => reviewPrivateHireRequest(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'calendar', 'private-hire'] })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.BOOKINGS({}) })
      toast.success('Request updated')
    },
    onError: (e: unknown) => {
      toast.error(getApiErrorMessage(e))
    },
  })
}
