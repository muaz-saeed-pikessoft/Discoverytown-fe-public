'use client'

import type React from 'react'

export type OperatingHoursDayValue = { open: string; close: string } | null
export type OperatingHoursValue = Record<string, OperatingHoursDayValue>

interface OperatingHoursGridProps {
  value: OperatingHoursValue
  onChange: (value: OperatingHoursValue) => void
  className?: string
}

const DAYS: Array<{ key: string; label: string }> = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
]

function normalizeTime(value: string): string {
  // Keep input as HH:MM, but tolerate empty.
  return value.slice(0, 5)
}

export default function OperatingHoursGrid({ value, onChange, className }: OperatingHoursGridProps) {
  function setDay(dayKey: string, dayValue: OperatingHoursDayValue) {
    onChange({ ...value, [dayKey]: dayValue })
  }

  return (
    <div className={className}>
      <div className='grid gap-2'>
        {DAYS.map(d => {
          const dayValue = value[d.key] ?? null
          const isClosed = dayValue === null

          return (
            <div
              key={d.key}
              className='grid items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:grid-cols-[80px_1fr_1fr_auto]'
            >
              <div className='text-sm font-black text-gray-900'>{d.label}</div>

              <label className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                <input
                  type='checkbox'
                  checked={isClosed}
                  onChange={e => {
                    if (e.target.checked) {
                      setDay(d.key, null)
                    } else {
                      setDay(d.key, { open: '09:00', close: '17:00' })
                    }
                  }}
                  className='h-4 w-4 rounded border-gray-300'
                />
                Closed
              </label>

              <div className='grid grid-cols-2 gap-2 sm:col-span-2 sm:grid-cols-2'>
                <div>
                  <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Open</div>
                  <input
                    type='time'
                    value={dayValue?.open ?? ''}
                    disabled={isClosed}
                    onChange={e => {
                      const open = normalizeTime(e.target.value)
                      setDay(d.key, { open, close: dayValue?.close ?? '17:00' })
                    }}
                    className='mt-1 h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400'
                  />
                </div>
                <div>
                  <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Close</div>
                  <input
                    type='time'
                    value={dayValue?.close ?? ''}
                    disabled={isClosed}
                    onChange={e => {
                      const close = normalizeTime(e.target.value)
                      setDay(d.key, { open: dayValue?.open ?? '09:00', close })
                    }}
                    className='mt-1 h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400'
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

