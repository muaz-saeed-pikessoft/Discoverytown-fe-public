import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import {
  addCredit,
  createContact,
  mergeContacts,
  softDeleteContact,
  updateContact,
} from '@/lib/api/admin/clients.api'
import type { CreateContactInput, UpdateContactInput } from '@/types/clients.shared'

export function useCreateContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateContactInput) => createContact(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACTS({}) })
    },
  })
}

export function useUpdateContact(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateContactInput) => updateContact(id, input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT(id) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACTS({}) }),
      ])
    },
  })
}

export function useSoftDeleteContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => softDeleteContact(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACTS({}) })
    },
  })
}

export function useMergeContacts() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ sourceId, targetId }: { sourceId: string; targetId: string }) => mergeContacts(sourceId, targetId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACTS({}) })
    },
  })
}

export function useAddCredit() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ contactId, amount, reason }: { contactId: string; amount: number; reason: string }) =>
      addCredit(contactId, amount, reason),
    onSuccess: async (_, vars) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT(vars.contactId) }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT_LEDGER(vars.contactId, {}) }),
      ])
    },
  })
}

