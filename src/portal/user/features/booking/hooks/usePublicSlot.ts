'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getPublicSlot } from '@/lib/api/user/booking.api'

export function usePublicSlot(id: string | null) {
  return useQuery({
    queryKey: id ? QUERY_KEYS.USER.SCHEDULING.PUBLIC_SLOT(id) : QUERY_KEYS.USER.SCHEDULING.PUBLIC_SLOT(''),
    queryFn: async () => {
      if (!id) throw new Error('id is required')
      return await getPublicSlot(id)
    },
    enabled: !!id,
    staleTime: 60_000,
  })
}

