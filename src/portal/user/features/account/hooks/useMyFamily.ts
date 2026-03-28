import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { addFamilyMember, getMyFamily, removeFamilyMember, updateFamilyMember } from '@/lib/api/user/account.api'
import type { AddFamilyMemberInput } from '@/types/clients.shared'

export function useMyFamily() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.MY_FAMILY,
    queryFn: () => getMyFamily(),
    staleTime: 60_000,
  })
}

export function useAddFamilyMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: AddFamilyMemberInput) => addFamilyMember(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_FAMILY })
    },
  })
}

export function useUpdateFamilyMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ relationshipId, input }: { relationshipId: string; input: Partial<AddFamilyMemberInput> }) =>
      updateFamilyMember(relationshipId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_FAMILY })
    },
  })
}

export function useRemoveFamilyMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (relationshipId: string) => removeFamilyMember(relationshipId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_FAMILY })
    },
  })
}

