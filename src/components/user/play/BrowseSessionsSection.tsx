import { useQuery } from '@tanstack/react-query'

import ErrorState from '@/components/shared/ErrorState'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { QUERY_KEYS } from '@/constants/query-keys'
import {
  getPublicLocations,
  getPublicServices,
  getPublicSlots,
} from '@/lib/api/user/booking.api'
import ActivitiesCatalogClient from '@/portal/user/features/booking/components/ActivitiesCatalogClient'
import type { PublicService, PublicServiceSlot } from '@/types/scheduling.shared'

type PublicLocation = { id: string; name: string; address: string; city: string }

export default function BrowseSessionsSection() {
  const slots = useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_SLOTS(undefined),
    queryFn: () => getPublicSlots({}),
    staleTime: 30_000,
  })

  const services = useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_SERVICES(undefined),
    queryFn: () => getPublicServices(),
    staleTime: 300_000,
  })

  const locations = useQuery({
    queryKey: QUERY_KEYS.USER.SCHEDULING.PUBLIC_LOCATIONS,
    queryFn: async () => (await getPublicLocations()) as PublicLocation[],
    staleTime: 300_000,
  })

  if (slots.isLoading || services.isLoading || locations.isLoading) {
    return <LoadingSkeleton variant='card' />
  }

  if (slots.isError || services.isError || locations.isError) {
    return <ErrorState title='Could not load sessions' onRetry={() => void Promise.all([slots.refetch(), services.refetch(), locations.refetch()])} />
  }

  return (
    <ActivitiesCatalogClient
      slots={(slots.data ?? []) as PublicServiceSlot[]}
      services={(services.data ?? []) as PublicService[]}
      locations={(locations.data ?? []) as PublicLocation[]}
    />
  )
}

