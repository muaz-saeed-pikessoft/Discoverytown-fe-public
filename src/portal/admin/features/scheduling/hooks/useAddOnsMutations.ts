import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { createAddOn, deleteAddOn, updateAddOn } from '@/lib/api/admin/scheduling.api'
import type { CreateAddOnInput, UpdateAddOnInput } from '@/portal/admin/features/scheduling/types'

export function useCreateAddOn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAddOnInput) => createAddOn(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.ADD_ONS({}) })
    },
  })
}

export function useUpdateAddOn(addOnId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAddOnInput) => updateAddOn(addOnId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.ADD_ONS({}) })
    },
  })
}

export function useDeleteAddOn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (addOnId: string) => deleteAddOn(addOnId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.ADD_ONS({}) })
    },
  })
}

