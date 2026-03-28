'use client'

import { useMemo, useState } from 'react'

interface DateRange {
  from: Date
  to: Date
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (value: DateRange) => void
}

function format(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function parseDate(value: string): Date | null {
  const parts = value.split('-')
  if (parts.length !== 3) return null
  const [y, m, d] = parts.map(Number)
  if (!y || !m || !d) return null
  const dt = new Date(y, m - 1, d)
  if (Number.isNaN(dt.getTime())) return null
  return dt
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)

  const label = useMemo(() => `${format(value.from)} → ${format(value.to)}`, [value.from, value.to])

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen(o => !o)}
        className='inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-black text-gray-900 transition hover:bg-gray-50'
      >
        <span className='text-gray-400'>📅</span>
        <span>{label}</span>
      </button>

      {open ? (
        <div className='absolute right-0 z-20 mt-2 w-[320px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.14)]'>
          <div className='grid grid-cols-1 gap-3'>
            <label className='text-xs font-black text-gray-500'>
              From
              <input
                type='date'
                value={format(value.from)}
                onChange={e => {
                  const dt = parseDate(e.target.value)
                  if (!dt) return
                  onChange({ from: dt, to: value.to })
                }}
                className='mt-1 h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              />
            </label>
            <label className='text-xs font-black text-gray-500'>
              To
              <input
                type='date'
                value={format(value.to)}
                onChange={e => {
                  const dt = parseDate(e.target.value)
                  if (!dt) return
                  onChange({ from: value.from, to: dt })
                }}
                className='mt-1 h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              />
            </label>
          </div>

          <div className='mt-4 flex items-center justify-end gap-2'>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 hover:bg-gray-50'
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

