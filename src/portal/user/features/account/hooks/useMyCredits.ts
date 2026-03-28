import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getAvailableCreditPacks, getMyCreditLedger, getMyCredits, purchaseCreditPack } from '@/lib/api/user/account.api'
import type { PurchasePackInput } from '@/types/clients.shared'

export function useMyCredits() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.MY_CREDITS,
    queryFn: () => getMyCredits(),
    staleTime: 60_000,
  })
}

export function useMyCreditLedger(filters?: object) {
  return useQuery({
    queryKey: QUERY_KEYS.USER.MY_CREDIT_LEDGER(filters),
    queryFn: () => getMyCreditLedger(filters),
    staleTime: 60_000,
  })
}

export function useAvailableCreditPacks() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.AVAILABLE_PACKS,
    queryFn: () => getAvailableCreditPacks(),
    staleTime: 300_000,
  })
}

export function usePurchaseMyPack() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ packDefinitionId, input }: { packDefinitionId: string; input: PurchasePackInput }) =>
      purchaseCreditPack(packDefinitionId, input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_CREDITS }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_CREDIT_LEDGER({}) }),
      ])
    },
  })
}

