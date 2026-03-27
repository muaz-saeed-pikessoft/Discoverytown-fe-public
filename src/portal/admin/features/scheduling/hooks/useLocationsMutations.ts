import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { createLocation, updateLocation } from '@/lib/api/admin/scheduling.api'
import type { CreateLocationInput, UpdateLocationInput } from '@/portal/admin/features/scheduling/types'

export function useCreateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLocationInput) => createLocation(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.LOCATIONS })
    },
  })
}

export function useUpdateLocation(locationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateLocationInput) => updateLocation(locationId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.SCHEDULING.LOCATIONS })
    },
  })
}

