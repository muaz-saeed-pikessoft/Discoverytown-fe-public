'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getUpcomingBookings } from '@/lib/api/user/booking.api'

export function useUpcomingBookings() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.MY_UPCOMING,
    queryFn: () => getUpcomingBookings(),
    staleTime: 60_000,
    refetchInterval: 300_000,
  })
}

