'use client'

import { Fragment, useMemo, useState } from 'react'

import { AVAILABILITY_COLOR_SCALE, utilizationBand } from '@/portal/admin/features/calendar/constants'
import type { AvailabilityCell } from '@/portal/admin/features/calendar/types'
import TimeSlotDetailPopover from '@/portal/admin/features/calendar/components/TimeSlotDetailPopover'

interface AvailabilityHeatmapProps {
  cells: AvailabilityCell[]
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6)

function cellKey(date: string, hour: number): string {
  return `${date}|${hour}`
}

export default function AvailabilityHeatmap({ cells }: AvailabilityHeatmapProps) {
  const [selected, setSelected] = useState<AvailabilityCell | null>(null)

  const { days, map } = useMemo(() => {
    const map = new Map<string, AvailabilityCell>()
    for (const c of cells) {
      map.set(cellKey(c.date, c.hour), c)
    }
    const daySet = new Set<string>()
    for (const c of cells) daySet.add(c.date)
    const days = Array.from(daySet).sort()
    return { days, map }
  }, [cells])

  if (days.length === 0) {
    return null
  }

  return (
    <>
      <div className='overflow-x-auto rounded-2xl border border-gray-200 bg-white'>
        <div
          className='grid min-w-[720px] gap-px bg-gray-200 p-px'
          style={{ gridTemplateColumns: `72px repeat(${days.length}, minmax(64px, 1fr))` }}
        >
          <div className='bg-gray-50 px-2 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400'>
            Time
          </div>
          {days.map(d => {
            const dt = new Date(`${d}T12:00:00`)
            return (
              <div key={d} className='bg-gray-50 px-1 py-2 text-center text-[10px] font-black uppercase text-gray-600'>
                {dt.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
              </div>
            )
          })}

          {HOURS.map(hour => (
            <Fragment key={hour}>
              <div className='flex items-center justify-end bg-white px-2 py-1 text-[10px] font-black text-gray-400'>
                {String(hour).padStart(2, '0')}:00
              </div>
              {days.map(date => {
                const cell = map.get(cellKey(date, hour))
                const pct = cell?.averageCapacityPercent ?? 0
                const count = cell?.sessionCount ?? 0
                const band = utilizationBand(pct, count)
                const scale = AVAILABILITY_COLOR_SCALE[band]

                return (
                  <button
                    key={cellKey(date, hour)}
                    type='button'
                    onClick={() =>
                      setSelected(cell ?? { date, hour, sessionCount: 0, averageCapacityPercent: 0, slots: [] })
                    }
                    title={`${count} sessions, ${pct}% avg capacity`}
                    className={[
                      'min-h-[36px] px-1 py-1 text-center text-[10px] font-black transition hover:ring-2 hover:ring-blue-400 hover:ring-offset-1',
                      scale.className,
                    ].join(' ')}
                  >
                    {count === 0 ? '—' : `${pct}%`}
                  </button>
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3'>
        <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Legend</span>
        {(Object.keys(AVAILABILITY_COLOR_SCALE) as Array<keyof typeof AVAILABILITY_COLOR_SCALE>).map(k => {
          const s = AVAILABILITY_COLOR_SCALE[k]
          return (
            <span key={k} className='inline-flex items-center gap-2 text-xs font-semibold text-gray-700'>
              <span className={`h-4 w-4 rounded border border-gray-200 ${s.className}`} aria-hidden />
              {s.label}
            </span>
          )
        })}
      </div>

      <TimeSlotDetailPopover cell={selected} onClose={() => setSelected(null)} />
    </>
  )
}
