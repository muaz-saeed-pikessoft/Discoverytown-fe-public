'use client'

import { useMemo, useState } from 'react'

import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import TimeSlotPill from '@/components/shared/TimeSlotPill'
import { usePrivateHireAvailability } from '@/portal/user/features/privatehire/hooks/usePrivateHireAvailability'
import type { AvailabilityCell } from '@/types/scheduling.shared'

export interface PrivateHireAvailabilityPickerProps {
  locations: Array<{ id: string; name: string; city: string | null }>
  onTimeSelected?: (time: string) => void
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatYmd(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

function suggestedStartsForDate(cells: AvailabilityCell[], dateYmd: string, durationHours: number): number[] {
  const hours = cells.filter(c => c.date === dateYmd).sort((a, b) => a.hour - b.hour)
  const ok: number[] = []
  for (const cell of hours) {
    if (cell.hour + durationHours > 23) continue
    let blocked = false
    for (let h = 0; h < durationHours; h += 1) {
      const slot = hours.find(x => x.hour === cell.hour + h)
      if (!slot || slot.sessionCount > 0) {
        blocked = true
        break
      }
    }
    if (!blocked) ok.push(cell.hour)
  }
  return ok
}

export default function PrivateHireAvailabilityPicker({
  locations,
  onTimeSelected,
}: PrivateHireAvailabilityPickerProps) {
  const [locationId, setLocationId] = useState(locations[0]?.id ?? '')
  const [dateStr, setDateStr] = useState(() => formatYmd(new Date()))
  const [durationHours, setDurationHours] = useState(4)
  const [run, setRun] = useState(false)
  const [selectedHour, setSelectedHour] = useState<number | null>(null)

  const parsedDate = useMemo(() => {
    const [y, m, d] = dateStr.split('-').map(Number)
    if (!y || !m || !d) return null
    return new Date(y, m - 1, d)
  }, [dateStr])

  const fromIso = useMemo(() => {
    if (!parsedDate) return ''
    return startOfDay(parsedDate).toISOString()
  }, [parsedDate])

  const toIso = useMemo(() => {
    if (!parsedDate) return ''
    return addDays(startOfDay(parsedDate), 1).toISOString()
  }, [parsedDate])

  const query = usePrivateHireAvailability(locationId, fromIso, toIso, run && Boolean(locationId) && Boolean(fromIso))

  const suggestions = useMemo(() => {
    if (!query.data || !parsedDate) return []
    return suggestedStartsForDate(query.data, formatYmd(parsedDate), durationHours)
  }, [query.data, parsedDate, durationHours])

  return (
    <div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div>
          <label htmlFor='ph-loc' className='dt-sub-label'>
            Location
          </label>
          <select
            id='ph-loc'
            value={locationId}
            onChange={e => setLocationId(e.target.value)}
            className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)]'
          >
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='ph-date' className='dt-sub-label'>
            Date
          </label>
          <input
            id='ph-date'
            type='date'
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)]'
          />
        </div>
        <div>
          <label htmlFor='ph-dur' className='dt-sub-label'>
            Duration (hours)
          </label>
          <select
            id='ph-dur'
            value={durationHours}
            onChange={e => setDurationHours(Number(e.target.value))}
            className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)]'
          >
            {[2, 3, 4, 5, 6, 8].map(h => (
              <option key={h} value={h}>
                {h} hours
              </option>
            ))}
          </select>
        </div>
        <div className='flex items-end'>
          <button
            type='button'
            onClick={() => setRun(true)}
            className='dt-btn-primary h-11 w-full rounded-xl px-5 text-sm'
          >
            Check availability
          </button>
        </div>
      </div>

      <div className='mt-8'>
        {!run ? (
          <EmptyState title='Ready when you are' description='Choose options above and tap Check availability.' />
        ) : query.isLoading ? (
          <LoadingSkeleton variant='card' />
        ) : query.isError ? (
          <ErrorState title='Could not load availability' onRetry={() => void query.refetch()} />
        ) : suggestions.length === 0 ? (
          <EmptyState
            title='No open windows found'
            description='Try another date or shorter duration — or send an enquiry and we will help.'
          />
        ) : (
          <div>
            <p className='text-sm font-black text-[var(--dt-navy)]'>Suggested start times</p>
            <p className='mt-1 text-xs text-[var(--dt-navy)]/60'>
              Tap a time to carry it into your enquiry notes.
            </p>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {suggestions.map(h => (
                <li key={h}>
                  <TimeSlotPill
                    label={`${pad2(h)}:00`}
                    selected={selectedHour === h}
                    onSelect={() => {
                      setSelectedHour(h)
                      if (onTimeSelected) {
                        onTimeSelected(`${pad2(h)}:00`)
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
