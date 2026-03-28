'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getMyBooking, getMyBookings } from '@/lib/api/user/booking.api'
import type { BookingStatus } from '@/types/scheduling.shared'

export function useMyBookings(filters?: { status?: BookingStatus; page?: number; limit?: number }) {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.MY_BOOKINGS(filters ?? {}),
    queryFn: () => getMyBookings(filters),
    staleTime: 30_000,
  })
}

export function useMyBooking(id: string | null) {
  return useQuery({
    queryKey: id ? QUERY_KEYS.USER.SCHEDULING.MY_BOOKING(id) : QUERY_KEYS.USER.SCHEDULING.MY_BOOKING(''),
    queryFn: async () => {
      if (!id) throw new Error('id is required')
      return await getMyBooking(id)
    },
    enabled: !!id,
    staleTime: 60_000,
  })
}

