import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import {
  cancelMySubscription,
  getAvailablePlans,
  getMySubscription,
  pauseMySubscription,
  subscribeToPlan,
} from '@/lib/api/user/account.api'
import type { SubscribeInput } from '@/types/clients.shared'

export function useMySubscription() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.MY_SUBSCRIPTION,
    queryFn: () => getMySubscription(),
    staleTime: 60_000,
  })
}

export function useAvailablePlans() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.AVAILABLE_PLANS,
    queryFn: () => getAvailablePlans(),
    staleTime: 300_000,
  })
}

export function useSubscribeToPlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ planId, input }: { planId: string; input: SubscribeInput }) => subscribeToPlan(planId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_SUBSCRIPTION })
    },
  })
}

export function useCancelMySubscription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (reason: string) => cancelMySubscription(reason),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_SUBSCRIPTION })
    },
  })
}

export function usePauseMySubscription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (pauseUntil: string) => pauseMySubscription(pauseUntil),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_SUBSCRIPTION })
    },
  })
}

