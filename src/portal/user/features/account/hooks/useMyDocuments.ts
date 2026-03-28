import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getMyDocuments, signMyDocument } from '@/lib/api/user/account.api'
import type { SignDocumentInput } from '@/types/clients.shared'

export function useMyDocuments() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.MY_DOCUMENTS,
    queryFn: () => getMyDocuments(),
    staleTime: 60_000,
  })
}

export function useSignMyDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ documentId, input }: { documentId: string; input: SignDocumentInput }) => signMyDocument(documentId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_DOCUMENTS })
    },
  })
}

