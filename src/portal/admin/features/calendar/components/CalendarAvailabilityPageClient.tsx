'use client'

import { useMemo, useState } from 'react'

import DateRangePicker from '@/components/shared/DateRangePicker'
import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import PageHeader from '@/components/shared/PageHeader'
import AvailabilityHeatmap from '@/portal/admin/features/calendar/components/AvailabilityHeatmap'
import { useAvailabilityGrid } from '@/portal/admin/features/calendar/hooks/useAvailabilityGrid'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

function toIsoStart(d: Date): string {
  return startOfDay(d).toISOString()
}

function toIsoEnd(d: Date): string {
  return addDays(startOfDay(d), 1).toISOString()
}

const MAX_RANGE_DAYS = 60
const DEFAULT_RANGE_DAYS = 14

export default function CalendarAvailabilityPageClient() {
  const locationsQuery = useLocations()
  const locations = useMemo(() => locationsQuery.data ?? [], [locationsQuery.data])

  const [locationOverride, setLocationOverride] = useState<string | null>(null)

  const [range, setRange] = useState(() => {
    const from = startOfDay(new Date())
    const to = addDays(from, DEFAULT_RANGE_DAYS - 1)
    return { from, to }
  })

  const locationId = locationOverride ?? locations[0]?.id ?? ''

  const fromIso = useMemo(() => toIsoStart(range.from), [range.from])
  const toIso = useMemo(() => toIsoEnd(range.to), [range.to])

  const rangeDays = useMemo(() => {
    const ms = startOfDay(range.to).getTime() - startOfDay(range.from).getTime()
    return Math.floor(ms / (24 * 60 * 60_000)) + 1
  }, [range.from, range.to])

  const gridQuery = useAvailabilityGrid(locationId, fromIso, toIso, Boolean(locationId))

  const clampedRange = (next: { from: Date; to: Date }) => {
    let { from, to } = next
    if (to < from) to = from
    const days = Math.floor((startOfDay(to).getTime() - startOfDay(from).getTime()) / (24 * 60 * 60_000)) + 1
    if (days > MAX_RANGE_DAYS) {
      to = addDays(from, MAX_RANGE_DAYS - 1)
    }
    setRange({ from, to })
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Availability overview' subtitle='See open slots across your schedule (utilization by hour).' />

      <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center'>
        <select
          value={locationId}
          onChange={e => setLocationOverride(e.target.value || null)}
          className='h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
        >
          <option value=''>Select location</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
        <DateRangePicker value={range} onChange={clampedRange} />
        <p className='text-xs font-semibold text-gray-500'>
          {rangeDays} day{rangeDays !== 1 ? 's' : ''} (max {MAX_RANGE_DAYS})
        </p>
      </div>

      {!locationId ? (
        <EmptyState title='Choose a location' description='Select a location to load the heatmap.' />
      ) : gridQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : gridQuery.isError ? (
        <ErrorState title='Failed to load availability' onRetry={() => void gridQuery.refetch()} />
      ) : !gridQuery.data?.length ? (
        <EmptyState title='No data' description='No cells returned for this range.' />
      ) : (
        <AvailabilityHeatmap cells={gridQuery.data} />
      )}
    </div>
  )
}
