import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getServiceCategories } from '@/lib/api/admin/scheduling.api'

export function useServiceCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.SCHEDULING.CATEGORIES,
    queryFn: () => getServiceCategories(),
    staleTime: 300_000,
  })
}

