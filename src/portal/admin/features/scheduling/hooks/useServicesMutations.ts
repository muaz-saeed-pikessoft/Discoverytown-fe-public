import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { createService, deleteService, duplicateService, reorderCategories, updateService } from '@/lib/api/admin/scheduling.api'
import type { CreateServiceInput, UpdateServiceInput } from '@/portal/admin/features/scheduling/types'

export function useCreateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateServiceInput) => createService(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SERVICES({}) })
    },
  })
}

export function useUpdateService(serviceId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateServiceInput) => updateService(serviceId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SERVICES({}) })
    },
  })
}

export function useDeleteService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (serviceId: string) => deleteService(serviceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SERVICES({}) })
    },
  })
}

export function useReorderCategories() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (items: { id: string; displayOrder: number }[]) => reorderCategories(items),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CATEGORIES })
    },
  })
}

export function useDuplicateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (serviceId: string) => duplicateService(serviceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.SERVICES({}) })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CATEGORIES })
    },
  })
}

