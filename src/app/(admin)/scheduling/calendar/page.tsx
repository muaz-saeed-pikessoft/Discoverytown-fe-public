'use client'

import { useMemo, useState } from 'react'

import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import PageHeader from '@/components/shared/PageHeader'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { useCalendarSlots } from '@/portal/admin/features/scheduling/hooks/useCalendarSlots'
import CalendarToolbar from '@/portal/admin/features/scheduling/components/CalendarToolbar'
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

export default function AdminSchedulingCalendarPage() {
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
    return Array.from(map.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([id, label]) => ({ id, label }))
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

  const dateLabel =
    calendarView === 'week'
      ? `${startOfWeekMonday(anchorDate).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })} – ${addDays(startOfWeekMonday(anchorDate), 6).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })}`
      : calendarView === 'day'
        ? anchorDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
        : anchorDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

  return (
    <div className='space-y-4 print:space-y-2'>
      <PageHeader
        title='Calendar'
        subtitle='Unified schedule view — filter by service type and instructor.'
      />

      <CalendarToolbar
        locations={locations}
        selectedLocationId={selectedLocationId}
        onLocationChange={locId => dispatch(setSelectedLocationId(locId))}
        staffId={staffId}
        staffOptions={staffOptions}
        onStaffChange={setStaffId}
        calendarView={calendarView}
        onViewChange={v => dispatch(setCalendarView(v))}
        includedServiceTypes={includedServiceTypes}
        onToggleServiceType={toggleServiceType}
        onResetServiceTypes={() => setIncludedServiceTypes(null)}
        dateLabel={dateLabel}
        onPrev={() => {
          const next =
            calendarView === 'day'
              ? addDays(anchorDate, -1)
              : calendarView === 'week'
                ? addDays(anchorDate, -7)
                : new Date(anchorDate.getFullYear(), anchorDate.getMonth() - 1, 1)
          dispatch(setCalendarDate(next.toISOString().slice(0, 10)))
        }}
        onNext={() => {
          const next =
            calendarView === 'day'
              ? addDays(anchorDate, 1)
              : calendarView === 'week'
                ? addDays(anchorDate, 7)
                : new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 1)
          dispatch(setCalendarDate(next.toISOString().slice(0, 10)))
        }}
        onRefresh={() => void calendarQuery.refetch()}
        onToday={() => dispatch(setCalendarDate(new Date().toISOString().slice(0, 10)))}
        onPrint={() => window.print()}
      />

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

