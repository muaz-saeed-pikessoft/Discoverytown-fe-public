import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import {
  assignTag,
  bulkAssignTags,
  createTag,
  deleteTag,
  getTags,
  removeTag,
  updateTag,
} from '@/lib/api/admin/clients.api'
import type { Tag } from '@/types/clients.shared'

export function useTags() {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.TAGS,
    queryFn: () => getTags(),
    staleTime: 300_000,
  })
}

export function useCreateTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: { name: string; color: string; isAuto?: boolean }) => createTag(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.TAGS })
    },
  })
}

export function useUpdateTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<Tag> }) => updateTag(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.TAGS })
    },
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.TAGS })
    },
  })
}

export function useAssignTag() {
  return useMutation({
    mutationFn: ({ contactId, tagId }: { contactId: string; tagId: string }) => assignTag(contactId, tagId),
  })
}

export function useRemoveTag() {
  return useMutation({
    mutationFn: ({ contactId, tagId }: { contactId: string; tagId: string }) => removeTag(contactId, tagId),
  })
}

export function useBulkAssignTags() {
  return useMutation({
    mutationFn: ({ contactIds, tagIds }: { contactIds: string[]; tagIds: string[] }) => bulkAssignTags(contactIds, tagIds),
  })
}

