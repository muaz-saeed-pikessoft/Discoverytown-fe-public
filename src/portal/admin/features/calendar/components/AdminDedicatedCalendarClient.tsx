'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import PageHeader from '@/components/shared/PageHeader'
import { ROUTES } from '@/constants/routes'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { useCalendarSlots } from '@/portal/admin/features/scheduling/hooks/useCalendarSlots'
import CalendarGrid from '@/portal/admin/features/scheduling/components/CalendarGrid'
import SlotPopover from '@/portal/admin/features/scheduling/components/SlotPopover'
import QuickCreateModal from '@/portal/admin/features/scheduling/components/QuickCreateModal'
import EventTypeColorLegend from '@/portal/admin/features/scheduling/components/EventTypeColorLegend'
import { useServices } from '@/portal/admin/features/scheduling/hooks/useServices'
import { SERVICE_TYPE_CONFIG } from '@/portal/admin/features/scheduling/constants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCalendarDate, setCalendarView, setSelectedLocationId } from '@/store/slices/schedulingSlice'
import type { CalendarView } from '@/portal/admin/features/scheduling/constants'
import type { ServiceSlot } from '@/portal/admin/features/scheduling/types'
import type { ServiceType } from '@/types/scheduling.shared'
import { addDays, rangeForView, startOfWeekMonday } from '@/portal/admin/features/scheduling/utils/calendar-date-utils'

const ALL_SERVICE_TYPES = Object.keys(SERVICE_TYPE_CONFIG) as ServiceType[]

export default function AdminDedicatedCalendarClient() {
  const dispatch = useAppDispatch()
  const selectedLocationId = useAppSelector(s => s.scheduling.selectedLocationId)
  const calendarView = useAppSelector(s => s.scheduling.calendarView) as CalendarView
  const calendarDate = useAppSelector(s => s.scheduling.calendarDate)

  const anchorDate = useMemo(() => new Date(calendarDate), [calendarDate])
  const range = useMemo(() => rangeForView(calendarView, anchorDate), [calendarView, anchorDate])

  const [staffId, setStaffId] = useState<string | null>(null)
  /** `null` = all service types visible */
  const [includedServiceTypes, setIncludedServiceTypes] = useState<ServiceType[] | null>(null)

  const locationsQuery = useLocations()
  const servicesQuery = useServices({})
  const calendarQuery = useCalendarSlots(selectedLocationId, range, staffId)

  const [activeSlot, setActiveSlot] = useState<ServiceSlot | null>(null)
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const [quickCreateDate, setQuickCreateDate] = useState<Date>(new Date())
  const [quickCreateTime, setQuickCreateTime] = useState<string>('10:00')

  const rawSlots = useMemo(() => calendarQuery.data ?? [], [calendarQuery.data])

  const slots = useMemo(() => {
    if (includedServiceTypes === null) return rawSlots
    if (includedServiceTypes.length === 0) return []
    const set = new Set(includedServiceTypes)
    return rawSlots.filter(s => set.has(s.service.serviceType))
  }, [rawSlots, includedServiceTypes])

  const staffOptions = useMemo(() => {
    const map = new Map<string, string>()
    for (const s of rawSlots) {
      if (s.staffId && s.staff) {
        map.set(s.staffId, `${s.staff.firstName} ${s.staff.lastName}`)
      }
    }
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [rawSlots])

  const locations = locationsQuery.data ?? []

  function toggleServiceType(st: ServiceType) {
    setIncludedServiceTypes(prev => {
      if (prev === null) {
        const next = ALL_SERVICE_TYPES.filter(t => t !== st)
        return next.length === 0 ? [] : next
      }
      if (prev.includes(st)) {
        return prev.filter(t => t !== st)
      }
      const next = [...prev, st]
      return next.length === ALL_SERVICE_TYPES.length ? null : next
    })
  }

  function isServiceTypeIncluded(st: ServiceType): boolean {
    return includedServiceTypes === null || includedServiceTypes.includes(st)
  }

  return (
    <div className='space-y-4 print:space-y-2'>
      <PageHeader
        title='Calendar'
        subtitle='Dedicated schedule view — filter by service type and instructor.'
        actions={
          <div className='flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={() => void calendarQuery.refetch()}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 print:hidden'
            >
              Refresh
            </button>
            <button
              type='button'
              onClick={() => window.print()}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 print:hidden'
            >
              Print
            </button>
            <button
              type='button'
              onClick={() => dispatch(setCalendarDate(new Date().toISOString().slice(0, 10)))}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 print:hidden'
            >
              Today
            </button>
          </div>
        }
      />

      <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 print:border-0 print:p-0'>
        <div className='flex flex-wrap items-center gap-2 print:hidden'>
          <select
            value={selectedLocationId ?? ''}
            onChange={e => dispatch(setSelectedLocationId(e.target.value || null))}
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
            onChange={e => setStaffId(e.target.value || null)}
            className='h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
          >
            <option value=''>All instructors</option>
            {staffOptions.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>

          <Link
            href={ROUTES.ADMIN.SCHEDULING_AVAILABILITY}
            className='inline-flex h-10 items-center rounded-xl border border-blue-200 bg-blue-50 px-4 text-xs font-black text-blue-800 transition hover:bg-blue-100'
          >
            Availability view
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
                    active
                      ? `${cfg.colorClass} border-gray-200`
                      : 'border-gray-200 bg-gray-50 text-gray-400 line-through',
                  ].join(' ')}
                >
                  <input type='checkbox' className='sr-only' checked={active} onChange={() => toggleServiceType(st)} />
                  <span>{cfg.label}</span>
                </label>
              )
            })}
            <button
              type='button'
              onClick={() => setIncludedServiceTypes(null)}
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
                onClick={() => dispatch(setCalendarView(v))}
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
            onClick={() => {
              const next =
                calendarView === 'day'
                  ? addDays(anchorDate, -1)
                  : calendarView === 'week'
                    ? addDays(anchorDate, -7)
                    : new Date(anchorDate.getFullYear(), anchorDate.getMonth() - 1, 1)
              dispatch(setCalendarDate(next.toISOString().slice(0, 10)))
            }}
            className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
          >
            Prev
          </button>
          <div className='text-sm font-black text-gray-900'>
            {calendarView === 'week'
              ? `${startOfWeekMonday(anchorDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })} – ${addDays(startOfWeekMonday(anchorDate), 6).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}`
              : calendarView === 'day'
                ? anchorDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
                : anchorDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </div>
          <button
            type='button'
            onClick={() => {
              const next =
                calendarView === 'day'
                  ? addDays(anchorDate, 1)
                  : calendarView === 'week'
                    ? addDays(anchorDate, 7)
                    : new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 1)
              dispatch(setCalendarDate(next.toISOString().slice(0, 10)))
            }}
            className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
          >
            Next
          </button>
        </div>
      </div>

      {calendarQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : calendarQuery.isError ? (
        <ErrorState title='Failed to load calendar' onRetry={() => void calendarQuery.refetch()} />
      ) : (
        <div className='relative'>
          <EventTypeColorLegend className='mb-3 print:hidden' />
          <CalendarGrid
            slots={slots}
            view={calendarView}
            date={anchorDate}
            onSlotClick={s => setActiveSlot(s)}
            onEmptySlotClick={d => {
              setQuickCreateDate(d)
              const hh = String(d.getHours()).padStart(2, '0')
              const mm = String(d.getMinutes()).padStart(2, '0')
              const time = hh === '00' && mm === '00' ? '10:00' : `${hh}:${mm}`
              setQuickCreateTime(time)
              setQuickCreateOpen(true)
            }}
          />

          {activeSlot ? (
            <div className='fixed inset-0 z-50 print:hidden'>
              <div className='absolute inset-0 bg-black/20' onClick={() => setActiveSlot(null)} aria-hidden='true' />
              <div className='relative flex min-h-full items-center justify-center p-5'>
                <SlotPopover slot={activeSlot} onClose={() => setActiveSlot(null)} />
              </div>
            </div>
          ) : null}

          <QuickCreateModal
            open={quickCreateOpen}
            defaultDate={quickCreateDate}
            defaultTime={quickCreateTime}
            services={servicesQuery.data?.data ?? []}
            onClose={() => setQuickCreateOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
