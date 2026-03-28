'use client'

import { RECURRENCE_OPTIONS } from '@/portal/admin/features/scheduling/constants'
import type { RecurFrequency } from '@/portal/admin/features/scheduling/types'

export type RecurrenceConfig = {
  isRecurring: boolean
  frequency?: RecurFrequency
  daysOfWeek?: number[]
  validFrom?: string
  validUntil?: string
}

interface RecurrenceSelectorProps {
  value: RecurrenceConfig
  onChange: (next: RecurrenceConfig) => void
}

const DOW = [
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
  { label: 'Sun', value: 0 },
] as const

export default function RecurrenceSelector({ value, onChange }: RecurrenceSelectorProps) {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <div className='text-sm font-black text-gray-900'>Recurrence</div>
          <div className='mt-1 text-xs font-semibold text-gray-500'>Repeat this session on a schedule.</div>
        </div>
        <button
          type='button'
          onClick={() => onChange({ ...value, isRecurring: !value.isRecurring })}
          className={[
            'h-10 rounded-xl px-4 text-xs font-black transition',
            value.isRecurring ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
          ].join(' ')}
        >
          {value.isRecurring ? 'Recurring' : 'No recurrence'}
        </button>
      </div>

      {value.isRecurring ? (
        <div className='mt-4 grid gap-4 sm:grid-cols-2'>
          <div>
            <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='recur-frequency'>
              Frequency
            </label>
            <select
              id='recur-frequency'
              value={value.frequency ?? ''}
              onChange={e => onChange({ ...value, frequency: e.target.value as RecurFrequency })}
              className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
            >
              <option value='' disabled>
                Select…
              </option>
              {RECURRENCE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Days of week</label>
            <div className='mt-2 flex flex-wrap gap-2'>
              {DOW.map(d => {
                const selected = (value.daysOfWeek ?? []).includes(d.value)
                return (
                  <button
                    key={d.value}
                    type='button'
                    onClick={() => {
                      const set = new Set(value.daysOfWeek ?? [])
                      if (set.has(d.value)) set.delete(d.value)
                      else set.add(d.value)
                      onChange({ ...value, daysOfWeek: Array.from(set) })
                    }}
                    className={[
                      'h-9 rounded-xl px-3 text-xs font-black transition',
                      selected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {d.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='valid-from'>
              Valid from
            </label>
            <input
              id='valid-from'
              type='date'
              value={value.validFrom ?? ''}
              onChange={e => onChange({ ...value, validFrom: e.target.value })}
              className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
            />
          </div>

          <div>
            <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='valid-until'>
              Valid until
            </label>
            <input
              id='valid-until'
              type='date'
              value={value.validUntil ?? ''}
              onChange={e => onChange({ ...value, validUntil: e.target.value })}
              className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

