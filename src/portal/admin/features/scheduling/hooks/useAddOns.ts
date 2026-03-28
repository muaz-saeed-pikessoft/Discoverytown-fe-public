import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getAddOns } from '@/lib/api/admin/scheduling.api'
import type { BookingType } from '@/portal/admin/features/scheduling/types'

export function useAddOns(filters?: { bookingType?: BookingType }) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.ADD_ONS(filters ?? {}),
    queryFn: () => getAddOns(filters),
    staleTime: 300_000,
  })
}

