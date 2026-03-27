'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import type { PublicSlotFilters } from '@/portal/user/features/booking/types'

interface ActivityFiltersProps {
  className?: string
}

export default function ActivityFilters({ className }: ActivityFiltersProps) {
  const router = useRouter()
  const pathname = usePathname() ?? ROUTES.USER.ACTIVITIES
  const sp = useSearchParams()
  const searchParams = sp ?? new URLSearchParams()

  const locationId = searchParams.get('locationId') ?? ''
  const day = searchParams.get('day') ?? 'ANY'
  const timeOfDay = searchParams.get('timeOfDay') ?? 'ANY'
  const ageGroup = searchParams.get('ageGroup') ?? 'ALL'

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === 'ANY' || value === 'ALL') params.delete(key)
    else params.set(key, value)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  const filters: PublicSlotFilters = {
    locationId: locationId || undefined,
    day: (day as PublicSlotFilters['day']) || 'ANY',
    timeOfDay: (timeOfDay as PublicSlotFilters['timeOfDay']) || 'ANY',
    ageGroup: (ageGroup as PublicSlotFilters['ageGroup']) || 'ALL',
  }

  // keep for future: wire filters into server fetch via search params
  void filters

  const canClear = useMemo(() => !!(locationId || day !== 'ANY' || timeOfDay !== 'ANY' || ageGroup !== 'ALL'), [
    ageGroup,
    day,
    locationId,
    timeOfDay,
  ])

  return (
    <div className={className}>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Age</div>
          <select
            value={ageGroup}
            onChange={e => setParam('ageGroup', e.target.value)}
            className='mt-2 h-11 w-full rounded-[16px] border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)] focus:border-[var(--dt-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--dt-primary-light)]'
          >
            <option value='ALL'>All</option>
            <option value='UNDER_5'>Under 5</option>
            <option value='AGE_5_10'>5–10</option>
            <option value='AGE_11_16'>11–16</option>
            <option value='ADULT'>Adult</option>
          </select>
        </div>

        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Day</div>
          <select
            value={day}
            onChange={e => setParam('day', e.target.value)}
            className='mt-2 h-11 w-full rounded-[16px] border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)] focus:border-[var(--dt-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--dt-primary-light)]'
          >
            <option value='ANY'>Any day</option>
            <option value='TODAY'>Today</option>
            <option value='THIS_WEEKEND'>This weekend</option>
            <option value='THIS_WEEK'>This week</option>
          </select>
        </div>

        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Time of day</div>
          <select
            value={timeOfDay}
            onChange={e => setParam('timeOfDay', e.target.value)}
            className='mt-2 h-11 w-full rounded-[16px] border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)] focus:border-[var(--dt-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--dt-primary-light)]'
          >
            <option value='ANY'>Any</option>
            <option value='MORNING'>Morning</option>
            <option value='AFTERNOON'>Afternoon</option>
            <option value='EVENING'>Evening</option>
          </select>
        </div>

        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Location</div>
          <input
            value={locationId}
            onChange={e => setParam('locationId', e.target.value)}
            placeholder='(optional) location id'
            className='mt-2 h-11 w-full rounded-[16px] border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)] placeholder:text-[var(--dt-text-subtle)] focus:border-[var(--dt-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--dt-primary-light)]'
          />
        </div>

        <div className='sm:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-3 pt-1'>
          <button
            type='button'
            onClick={() => {
              router.replace(pathname)
            }}
            disabled={!canClear}
            className='h-10 rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-xs font-black text-[var(--dt-text-body)] transition hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)] disabled:opacity-60 disabled:hover:border-[var(--dt-border)] disabled:hover:text-[var(--dt-text-body)]'
          >
            Clear filters
          </button>
          <div className='text-xs font-semibold text-[var(--dt-text-body)]/60'>Filters are reflected in the URL.</div>
        </div>
      </div>
    </div>
  )
}

