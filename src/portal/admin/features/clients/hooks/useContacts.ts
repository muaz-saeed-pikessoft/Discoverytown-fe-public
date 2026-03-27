import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getContacts } from '@/lib/api/admin/clients.api'
import type { ContactFilters } from '@/types/clients.shared'

export function useContacts(filters: ContactFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACTS(filters),
    queryFn: () => getContacts(filters),
    staleTime: 30_000,
  })
}

