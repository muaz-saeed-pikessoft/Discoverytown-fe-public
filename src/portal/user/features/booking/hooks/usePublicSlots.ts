'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getPublicSlots } from '@/lib/api/user/booking.api'
import type { PublicSlotFilters } from '@/portal/user/features/booking/types'

export function usePublicSlots(filters: PublicSlotFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_SLOTS(filters),
    queryFn: () => getPublicSlots(filters),
    staleTime: 60_000,
  })
}

