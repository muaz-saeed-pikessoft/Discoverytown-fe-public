'use client'

import { useMemo } from 'react'

import DateRangePicker from '@/components/shared/DateRangePicker'
import type { SlotFilters, SlotStatus, ServiceType } from '@/portal/admin/features/scheduling/types'
import { SERVICE_TYPE_CONFIG, SLOT_STATUS_LABELS } from '@/portal/admin/features/scheduling/constants'

interface SlotFilterPanelProps {
  value: SlotFilters
  onChange: (next: SlotFilters) => void
  locations: Array<{ id: string; name: string }>
  staff: Array<{ id: string; name: string }>
}

export default function SlotFilterPanel({ value, onChange, locations, staff }: SlotFilterPanelProps) {
  const serviceTypes = useMemo(() => Object.keys(SERVICE_TYPE_CONFIG) as ServiceType[], [])
  const statuses = useMemo(() => Object.keys(SLOT_STATUS_LABELS) as SlotStatus[], [])
  const fallbackFrom = useMemo(() => new Date(), [])
  const fallbackTo = useMemo(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), [])

  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Filters</div>

      <div className='mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div>
          <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='filter-location'>
            Location
          </label>
          <select
            id='filter-location'
            value={value.locationId ?? ''}
            onChange={e => onChange({ ...value, locationId: e.target.value || undefined })}
            className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
          >
            <option value=''>All locations</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='filter-staff'>
            Instructor
          </label>
          <select
            id='filter-staff'
            value={value.staffId ?? ''}
            onChange={e => onChange({ ...value, staffId: e.target.value || undefined })}
            className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
          >
            <option value=''>All staff</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className='lg:col-span-1'>
          <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Date range</label>
          <div className='mt-2'>
            <DateRangePicker
              value={{
                from: value.dateRange?.from ? new Date(value.dateRange.from) : fallbackFrom,
                to: value.dateRange?.to ? new Date(value.dateRange.to) : fallbackTo,
              }}
              onChange={r =>
                onChange({
                  ...value,
                  dateRange: { from: r.from.toISOString(), to: r.to.toISOString() },
                })
              }
            />
          </div>
        </div>

        <div className='md:col-span-2 lg:col-span-3'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Service types</label>
              <div className='mt-2 flex flex-wrap gap-2'>
                {serviceTypes.map(t => {
                  const selected = (value.serviceType ?? []).includes(t)
                  return (
                    <button
                      key={t}
                      type='button'
                      onClick={() => {
                        const set = new Set(value.serviceType ?? [])
                        if (set.has(t)) set.delete(t)
                        else set.add(t)
                        onChange({ ...value, serviceType: Array.from(set) })
                      }}
                      className={[
                        'h-9 rounded-xl px-3 text-xs font-black transition',
                        selected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
                      ].join(' ')}
                    >
                      {SERVICE_TYPE_CONFIG[t].label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Status</label>
              <div className='mt-2 flex flex-wrap gap-2'>
                {statuses.map(s => {
                  const selected = (value.status ?? []).includes(s)
                  return (
                    <button
                      key={s}
                      type='button'
                      onClick={() => {
                        const set = new Set(value.status ?? [])
                        if (set.has(s)) set.delete(s)
                        else set.add(s)
                        onChange({ ...value, status: Array.from(set) })
                      }}
                      className={[
                        'h-9 rounded-xl px-3 text-xs font-black transition',
                        selected ? 'bg-gray-900 text-white hover:bg-gray-800' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
                      ].join(' ')}
                    >
                      {SLOT_STATUS_LABELS[s]}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

