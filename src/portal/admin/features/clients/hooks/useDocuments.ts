import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import {
  createDocument,
  deleteDocument,
  getDocuments,
  sendSigningRequest,
  signDocument,
  updateDocument,
} from '@/lib/api/admin/clients.api'
import type { CreateDocumentInput, SignDocumentInput } from '@/types/clients.shared'

export function useDocuments(filters?: object) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.DOCUMENTS(filters),
    queryFn: () => getDocuments(filters),
    staleTime: 300_000,
  })
}

export function useSignDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ documentId, input }: { documentId: string; input: SignDocumentInput }) => signDocument(documentId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.DOCUMENTS({}) })
    },
  })
}

export function useSendSigningRequest() {
  return useMutation({
    mutationFn: ({ documentId, contactId }: { documentId: string; contactId: string }) => sendSigningRequest(documentId, contactId),
  })
}

export function useCreateDocument() {
  return useMutation({
    mutationFn: (input: CreateDocumentInput) => createDocument(input),
  })
}

export function useUpdateDocument() {
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CreateDocumentInput> }) => updateDocument(id, input),
  })
}

export function useDeleteDocument() {
  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
  })
}

