import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getContact } from '@/lib/api/admin/clients.api'

export function useContact(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.CONTACT(id),
    queryFn: () => getContact(id),
    staleTime: 60_000,
    enabled: !!id,
  })
}

