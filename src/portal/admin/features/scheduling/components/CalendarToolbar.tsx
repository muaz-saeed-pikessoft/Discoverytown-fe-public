'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { ROUTES } from '@/constants/routes'
import { SERVICE_TYPE_CONFIG } from '@/portal/admin/features/scheduling/constants'
import type { CalendarView } from '@/portal/admin/features/scheduling/constants'
import type { ServiceType } from '@/types/scheduling.shared'

interface CalendarToolbarProps {
  locations: Array<{ id: string; name: string }>
  selectedLocationId: string | null
  onLocationChange: (locationId: string | null) => void

  staffId: string | null
  staffOptions: Array<{ id: string; label: string }>
  onStaffChange: (staffId: string | null) => void

  calendarView: CalendarView
  onViewChange: (view: CalendarView) => void

  includedServiceTypes: ServiceType[] | null
  onToggleServiceType: (serviceType: ServiceType) => void
  onResetServiceTypes: () => void

  dateLabel: string
  onPrev: () => void
  onNext: () => void

  onRefresh: () => void
  onToday: () => void
  onPrint?: () => void

  extraActions?: ReactNode
}

const ALL_SERVICE_TYPES = Object.keys(SERVICE_TYPE_CONFIG) as ServiceType[]

export default function CalendarToolbar({
  locations,
  selectedLocationId,
  onLocationChange,
  staffId,
  staffOptions,
  onStaffChange,
  calendarView,
  onViewChange,
  includedServiceTypes,
  onToggleServiceType,
  onResetServiceTypes,
  dateLabel,
  onPrev,
  onNext,
  onRefresh,
  onToday,
  onPrint,
  extraActions,
}: CalendarToolbarProps) {
  function isServiceTypeIncluded(st: ServiceType): boolean {
    return includedServiceTypes === null || includedServiceTypes.includes(st)
  }

  return (
    <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 print:border-0 print:p-0'>
      <div className='flex flex-wrap items-center gap-2 print:hidden'>
        <button
          type='button'
          onClick={onRefresh}
          className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          Refresh
        </button>
        {onPrint ? (
          <button
            type='button'
            onClick={onPrint}
            className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
          >
            Print
          </button>
        ) : null}
        <button
          type='button'
          onClick={onToday}
          className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          Today
        </button>
        {extraActions}
      </div>

      <div className='flex flex-wrap items-center gap-2 print:hidden'>
        <select
          value={selectedLocationId ?? ''}
          onChange={e => onLocationChange(e.target.value || null)}
          className='h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
        >
          <option value=''>All locations</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>

        <select
          value={staffId ?? ''}
          onChange={e => onStaffChange(e.target.value || null)}
          className='h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
        >
          <option value=''>All instructors</option>
          {staffOptions.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>

        <Link
          href={ROUTES.ADMIN.SCHEDULING_AVAILABILITY}
          className='inline-flex h-10 items-center rounded-xl border border-blue-200 bg-blue-50 px-4 text-xs font-black text-blue-800 transition hover:bg-blue-100'
        >
          Availability view
        </Link>
        <Link
          href={ROUTES.ADMIN.SCHEDULING_PRIVATE_HIRE}
          className='inline-flex h-10 items-center rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          Private hire
        </Link>
      </div>

      <div className='print:hidden'>
        <p className='mb-2 text-xs font-black uppercase tracking-widest text-gray-500'>Service types</p>
        <div className='flex flex-wrap gap-2'>
          {ALL_SERVICE_TYPES.map(st => {
            const cfg = SERVICE_TYPE_CONFIG[st]
            const active = isServiceTypeIncluded(st)
            return (
              <label
                key={st}
                className={[
                  'inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black transition',
                  active ? `${cfg.colorClass} border-gray-200` : 'border-gray-200 bg-gray-50 text-gray-400 line-through',
                ].join(' ')}
              >
                <input type='checkbox' className='sr-only' checked={active} onChange={() => onToggleServiceType(st)} />
                <span>{cfg.label}</span>
              </label>
            )
          })}
          <button
            type='button'
            onClick={onResetServiceTypes}
            className='h-9 rounded-full border border-gray-200 px-3 text-xs font-black text-gray-600 hover:bg-gray-50'
          >
            All types
          </button>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-2 print:hidden'>
        <div className='flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1'>
          {(['month', 'week', 'day', 'agenda'] as CalendarView[]).map(v => (
            <button
              key={v}
              type='button'
              onClick={() => onViewChange(v)}
              className={[
                'h-9 rounded-lg px-3 text-xs font-black uppercase tracking-widest transition',
                calendarView === v ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50',
              ].join(' ')}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2 print:hidden'>
        <button
          type='button'
          onClick={onPrev}
          className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          Prev
        </button>
        <div className='text-sm font-black text-gray-900'>{dateLabel}</div>
        <button
          type='button'
          onClick={onNext}
          className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          Next
        </button>
      </div>
    </div>
  )
}

