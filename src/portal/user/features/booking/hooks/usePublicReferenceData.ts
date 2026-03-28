'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getPublicLocations, getPublicServiceCategories, getPublicServices } from '@/lib/api/user/booking.api'
import type { ServiceType } from '@/types/scheduling.shared'

export function usePublicServiceCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_SERVICE_CATEGORIES,
    queryFn: () => getPublicServiceCategories(),
    staleTime: 300_000,
  })
}

export function usePublicLocations() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_LOCATIONS,
    queryFn: () => getPublicLocations(),
    staleTime: 300_000,
  })
}

export function usePublicServices(filters?: { serviceType?: ServiceType; categoryId?: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_SERVICES(filters ?? {}),
    queryFn: () => getPublicServices(filters),
    staleTime: 300_000,
  })
}

