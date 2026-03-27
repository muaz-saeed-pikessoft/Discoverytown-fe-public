import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { checkStaffAvailability } from '@/lib/api/admin/scheduling.api'
import type { ServiceSlot } from '@/portal/admin/features/scheduling/types'

type StaffAvailability = {
  conflicts: ServiceSlot[]
}

export function useStaffAvailability(staffId: string | null, startAt: string | null, endAt: string | null) {
  return useQuery({
    queryKey:
      staffId && startAt && endAt
        ? QUERY_KEYS.ADMIN.SCHEDULING.STAFF_AVAILABILITY(staffId, startAt, endAt)
        : QUERY_KEYS.ADMIN.SCHEDULING.STAFF_AVAILABILITY('', '', ''),
    queryFn: async (): Promise<StaffAvailability> => {
      if (!staffId || !startAt || !endAt) throw new Error('staffId, startAt, endAt are required')
      return await checkStaffAvailability({ staffId, startAt, endAt })
    },
    enabled: !!(staffId && startAt && endAt),
    staleTime: 30_000,
  })
}

