'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { cancelMyBooking, createBooking, initBookingCheckout, joinWaitlist, leaveWaitlist } from '@/lib/api/user/booking.api'
import type { ConsumerCreateBookingInput } from '@/portal/user/features/booking/types'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: ConsumerCreateBookingInput) => createBooking(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.MY_BOOKINGS({}) })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.MY_UPCOMING })
    },
  })
}

export function useCancelMyBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { id: string; reason: string }) => cancelMyBooking(input.id, input.reason),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.MY_BOOKINGS({}) })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.MY_UPCOMING })
    },
  })
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slotId: string) => joinWaitlist(slotId),
    onSuccess: async (_data, slotId) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_SLOT(slotId) })
    },
  })
}

export function useLeaveWaitlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (entryId: string) => leaveWaitlist(entryId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.MY_BOOKINGS({}) })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.SCHEDULING.MY_UPCOMING })
    },
  })
}

export function useInitCheckout() {
  return useMutation({
    mutationFn: (bookingId: string) => initBookingCheckout(bookingId),
  })
}

