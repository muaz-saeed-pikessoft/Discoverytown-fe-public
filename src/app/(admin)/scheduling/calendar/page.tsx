'use client'

import { useMemo, useState } from 'react'

import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import PageHeader from '@/components/shared/PageHeader'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { useCalendarSlots } from '@/portal/admin/features/scheduling/hooks/useCalendarSlots'
import CalendarGrid from '@/portal/admin/features/scheduling/components/CalendarGrid'
import SlotPopover from '@/portal/admin/features/scheduling/components/SlotPopover'
import QuickCreateModal from '@/portal/admin/features/scheduling/components/QuickCreateModal'
import EventTypeColorLegend from '@/portal/admin/features/scheduling/components/EventTypeColorLegend'
import { useServices } from '@/portal/admin/features/scheduling/hooks/useServices'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCalendarDate, setCalendarView, setSelectedLocationId } from '@/store/slices/schedulingSlice'
import type { CalendarView } from '@/portal/admin/features/scheduling/constants'
import type { ServiceSlot } from '@/portal/admin/features/scheduling/types'

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function addDays(d: Date, n: number): Date {
  const next = new Date(d)
  next.setDate(next.getDate() + n)
  return next
}

function startOfWeekMonday(anchor: Date): Date {
  const d = startOfDay(anchor)
  const weekdayMon0 = (d.getDay() + 6) % 7
  return addDays(d, -weekdayMon0)
}

function rangeForView(view: CalendarView, anchor: Date): { from: string; to: string } {
  if (view === 'day') {
    const start = startOfDay(anchor)
    const end = addDays(start, 1)
    return { from: start.toISOString(), to: end.toISOString() }
  }

  if (view === 'week') {
    const start = startOfWeekMonday(anchor)
    const end = addDays(start, 7)
    return { from: start.toISOString(), to: end.toISOString() }
  }

  // month + agenda
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  return { from: start.toISOString(), to: end.toISOString() }
}

export default function AdminSchedulingCalendarPage() {
  const dispatch = useAppDispatch()
  const selectedLocationId = useAppSelector(s => s.scheduling.selectedLocationId)
  const calendarView = useAppSelector(s => s.scheduling.calendarView) as CalendarView
  const calendarDate = useAppSelector(s => s.scheduling.calendarDate)

  const anchorDate = useMemo(() => new Date(calendarDate), [calendarDate])
  const range = useMemo(() => rangeForView(calendarView, anchorDate), [calendarView, anchorDate])

  const locationsQuery = useLocations()
  const servicesQuery = useServices({})
  const calendarQuery = useCalendarSlots(selectedLocationId, range)

  const [activeSlot, setActiveSlot] = useState<ServiceSlot | null>(null)
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const [quickCreateDate, setQuickCreateDate] = useState<Date>(new Date())
  const [quickCreateTime, setQuickCreateTime] = useState<string>('10:00')

  const slots = calendarQuery.data ?? []
  const locations = locationsQuery.data ?? []

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Calendar'
        subtitle='View schedules across locations.'
        actions={
          <div className='flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={() => void calendarQuery.refetch()}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
            >
              Refresh
            </button>
            <button
              type='button'
              onClick={() => dispatch(setCalendarDate(new Date().toISOString().slice(0, 10)))}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
            >
              Today
            </button>
          </div>
        }
      />

      <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
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

        <div className='flex items-center gap-2'>
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
          <EventTypeColorLegend className='mb-3' />
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
            <div className='fixed inset-0 z-50'>
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

