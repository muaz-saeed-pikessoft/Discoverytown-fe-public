import { useMutation, useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import {
  createCreditPackDefinition,
  deleteCreditPackDefinition,
  getContactBookingHistory,
  getContactCreditLedger,
  getContactSpendSummary,
  getCreditPackDefinitions,
  purchaseCreditPack,
  updateCreditPackDefinition,
} from '@/lib/api/admin/clients.api'
import type { CreatePackInput, PurchasePackInput } from '@/types/clients.shared'

export function useCreditPackDefinitions(filters?: object) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.PACK_DEFINITIONS(filters),
    queryFn: () => getCreditPackDefinitions(),
    staleTime: 300_000,
  })
}

export function usePurchaseCreditPack() {
  return useMutation({
    mutationFn: ({
      contactId,
      packDefinitionId,
      input,
    }: {
      contactId: string
      packDefinitionId: string
      input: PurchasePackInput
    }) => purchaseCreditPack(contactId, packDefinitionId, input),
  })
}

export function useCreateCreditPackDefinition() {
  return useMutation({
    mutationFn: (input: CreatePackInput) => createCreditPackDefinition(input),
  })
}

export function useUpdateCreditPackDefinition() {
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CreatePackInput> }) => updateCreditPackDefinition(id, input),
  })
}

export function useDeleteCreditPackDefinition() {
  return useMutation({
    mutationFn: (id: string) => deleteCreditPackDefinition(id),
  })
}

export function useContactCreditLedger(contactId: string, filters?: object) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT_LEDGER(contactId, filters),
    queryFn: () => getContactCreditLedger(contactId, filters),
    staleTime: 30_000,
    enabled: !!contactId,
  })
}

export function useContactBookingHistory(contactId: string, filters?: object) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT_BOOKINGS(contactId, filters),
    queryFn: () => getContactBookingHistory(contactId, filters),
    staleTime: 30_000,
    enabled: !!contactId,
  })
}

export function useContactSpendSummary(contactId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT_SPEND(contactId),
    queryFn: () => getContactSpendSummary(contactId),
    staleTime: 60_000,
    enabled: !!contactId,
  })
}

