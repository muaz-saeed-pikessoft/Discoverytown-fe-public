'use client'

import { useMemo } from 'react'

import type { CalendarView } from '@/portal/admin/features/scheduling/constants'
import type { Booking, ServiceSlot } from '@/portal/admin/features/scheduling/types'
import { SERVICE_TYPE_CONFIG } from '@/portal/admin/features/scheduling/constants'

interface CalendarGridProps {
  slots: ServiceSlot[]
  openBookings?: Booking[]
  view: CalendarView
  date: Date
  onSlotClick: (slot: ServiceSlot) => void
  onEmptySlotClick: (date: Date) => void
}

type DayCell = { day: Date; slots: ServiceSlot[]; isCurrentMonth: boolean }
type WeekDay = { day: Date; slots: ServiceSlot[] }

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

function formatYmd(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatHm(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getMonthGrid(anchor: Date, slots: ServiceSlot[]): DayCell[] {
  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  const startWeekday = (monthStart.getDay() + 6) % 7 // Monday=0
  const gridStart = addDays(monthStart, -startWeekday)
  const days = 42

  const byDay = new Map<string, ServiceSlot[]>()
  for (const s of slots) {
    const key = formatYmd(new Date(s.startAt))
    byDay.set(key, [...(byDay.get(key) ?? []), s])
  }

  const cells: DayCell[] = []
  for (let i = 0; i < days; i += 1) {
    const day = addDays(gridStart, i)
    const key = formatYmd(day)
    const inMonth = day >= startOfDay(monthStart) && day <= startOfDay(monthEnd)
    cells.push({ day, slots: byDay.get(key) ?? [], isCurrentMonth: inMonth })
  }
  return cells
}

function getWeekDays(anchor: Date, slots: ServiceSlot[]): WeekDay[] {
  const start = startOfWeekMonday(anchor)
  const byDay = new Map<string, ServiceSlot[]>()
  for (const s of slots) {
    const key = formatYmd(new Date(s.startAt))
    byDay.set(key, [...(byDay.get(key) ?? []), s])
  }
  return Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(start, i)
    const key = formatYmd(day)
    return { day, slots: (byDay.get(key) ?? []).slice().sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()) }
  })
}

type PositionedSlot = {
  slot: ServiceSlot
  top: number
  height: number
  colIndex: number
  colCount: number
}

function layoutDaySlots(day: Date, daySlots: ServiceSlot[], pxPerMinute: number): PositionedSlot[] {
  const dayStart = startOfDay(day).getTime()

  const items = daySlots
    .map(s => {
      const start = new Date(s.startAt).getTime()
      const end = new Date(s.endAt).getTime()
      const startMin = Math.max(0, Math.floor((start - dayStart) / 60000))
      const endMin = Math.max(startMin + 15, Math.floor((end - dayStart) / 60000))
      return { slot: s, startMin, endMin }
    })
    .sort((a, b) => a.startMin - b.startMin || a.endMin - b.endMin)

  const positioned: PositionedSlot[] = []
  const active: Array<{ endMin: number; col: number }> = []
  let maxCols = 1

  for (const it of items) {
    for (let i = active.length - 1; i >= 0; i -= 1) {
      if (active[i]!.endMin <= it.startMin) active.splice(i, 1)
    }

    const used = new Set(active.map(a => a.col))
    let col = 0
    while (used.has(col)) col += 1

    active.push({ endMin: it.endMin, col })
    maxCols = Math.max(maxCols, active.length)

    const top = it.startMin * pxPerMinute
    const height = Math.max(18, (it.endMin - it.startMin) * pxPerMinute)

    positioned.push({
      slot: it.slot,
      top,
      height,
      colIndex: col,
      colCount: 1,
    })
  }

  return positioned.map(p => ({ ...p, colCount: maxCols }))
}

export default function CalendarGrid({ slots, view, date, onSlotClick, onEmptySlotClick }: CalendarGridProps) {
  const openBookings = arguments[0].openBookings ?? []
  const monthCells = useMemo(() => getMonthGrid(date, slots), [date, slots])
  const weekDays = useMemo(() => getWeekDays(date, slots), [date, slots])
  const openByDay = useMemo(() => {
    const byDay = new Map<string, Booking[]>()
    for (const b of openBookings) {
      if (!b.startAt || !b.endAt) continue
      if (b.serviceSlotId) continue
      const key = formatYmd(new Date(b.startAt))
      byDay.set(key, [...(byDay.get(key) ?? []), b])
    }
    return byDay
  }, [openBookings])

  const pxPerMinute = 0.9
  const hourRowHeight = 60 * pxPerMinute
  const hours = Array.from({ length: 24 }).map((_, i) => i)

  if (view === 'agenda') {
    const byDay = new Map<string, ServiceSlot[]>()
    for (const s of slots) {
      const key = formatYmd(new Date(s.startAt))
      byDay.set(key, [...(byDay.get(key) ?? []), s])
    }
    const days = Array.from(new Set([...byDay.keys(), ...openByDay.keys()])).sort()
    return (
      <div className='rounded-2xl border border-gray-200 bg-white'>
        <div className='border-b border-gray-100 px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-500'>Agenda</div>
        {days.length === 0 ? <div className='px-5 py-10 text-center text-sm font-semibold text-gray-600'>No events to show.</div> : null}
        <div className='divide-y divide-gray-100'>
          {days.map(d => {
            const daySlots = (byDay.get(d) ?? []).slice().sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
            const dayOpenBookings = (openByDay.get(d) ?? [])
              .slice()
              .sort((a, b) => new Date(a.startAt ?? 0).getTime() - new Date(b.startAt ?? 0).getTime())
            const dayDate = new Date(d)
            return (
              <div key={d} className='px-5 py-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='text-sm font-black text-gray-900'>
                    {dayDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                  <button
                    type='button'
                    onClick={() => onEmptySlotClick(dayDate)}
                    className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50'
                  >
                    New
                  </button>
                </div>
                <div className='mt-3 space-y-2'>
                  {daySlots.map(s => (
                    <button
                      key={s.id}
                      type='button'
                      onClick={() => onSlotClick(s)}
                      className='flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left hover:bg-gray-50'
                    >
                      <div className='min-w-0'>
                        <div className='truncate text-sm font-black text-gray-900'>{s.service.name}</div>
                        <div className='mt-1 text-xs font-semibold text-gray-500'>
                          {formatHm(new Date(s.startAt))} – {formatHm(new Date(s.endAt))} · {s.location.name}
                        </div>
                      </div>
                      <div className='shrink-0 text-xs font-black text-gray-600'>{s.status}</div>
                    </button>
                  ))}
                  {dayOpenBookings.map(b => (
                    <div
                      key={b.id}
                      className='flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-left'
                      title='Open booking'
                    >
                      <div className='min-w-0'>
                        <div className='truncate text-sm font-black text-gray-900'>
                          {b.contact.lastName} · {b.service.name}
                        </div>
                        <div className='mt-1 text-xs font-semibold text-gray-500'>
                          {formatHm(new Date(b.startAt!))} – {formatHm(new Date(b.endAt!))}
                        </div>
                      </div>
                      <div className='shrink-0 text-xs font-black text-gray-600'>OPEN</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (view === 'week') {
    return (
      <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
        <div className='grid grid-cols-[72px_repeat(7,1fr)] border-b border-gray-100 bg-gray-50'>
          <div className='px-2 py-3 text-center text-[11px] font-black uppercase tracking-widest text-gray-400'>Time</div>
          {weekDays.map(wd => (
            <div key={formatYmd(wd.day)} className='px-2 py-3 text-center'>
              <div className='text-[11px] font-black uppercase tracking-widest text-gray-500'>
                {wd.day.toLocaleDateString(undefined, { weekday: 'short' })}
              </div>
              <div className='mt-0.5 text-sm font-black text-gray-900'>{wd.day.getDate()}</div>
            </div>
          ))}
        </div>

        <div className='relative max-h-[760px] overflow-auto'>
          <div className='grid grid-cols-[72px_repeat(7,1fr)]'>
            <div className='border-r border-gray-100'>
              {hours.map(h => (
                <div
                  key={h}
                  className='flex items-start justify-end border-b border-gray-100 px-2 pt-1 text-[10px] font-black text-gray-400'
                  style={{ height: hourRowHeight }}
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {weekDays.map(wd => {
              const positioned = layoutDaySlots(wd.day, wd.slots, pxPerMinute)
              const openBookingsForDay = (openByDay.get(formatYmd(wd.day)) ?? [])
                .filter(b => b.startAt && b.endAt && !b.serviceSlotId)
                .map(b => {
                  const startAt = new Date(b.startAt!)
                  const endAt = new Date(b.endAt!)
                  const dayStart = startOfDay(wd.day).getTime()
                  const startMin = Math.max(0, Math.floor((startAt.getTime() - dayStart) / 60_000))
                  const endMin = Math.max(startMin + 15, Math.floor((endAt.getTime() - dayStart) / 60_000))
                  return {
                    booking: b,
                    top: startMin * pxPerMinute,
                    height: Math.max(18, (endMin - startMin) * pxPerMinute),
                  }
                })
              return (
                <div key={formatYmd(wd.day)} className='relative border-r border-gray-100'>
                  {hours.map(h => (
                    <button
                      key={h}
                      type='button'
                      onClick={() => {
                        const d = new Date(wd.day)
                        d.setHours(h, 0, 0, 0)
                        onEmptySlotClick(d)
                      }}
                      className='block w-full border-b border-gray-100 hover:bg-gray-50'
                      style={{ height: hourRowHeight }}
                      aria-label={`Create on ${wd.day.toDateString()} at ${h}:00`}
                    />
                  ))}

                  {positioned.map(p => {
                    const cfg = SERVICE_TYPE_CONFIG[p.slot.service.serviceType]
                    const leftPct = (p.colIndex / p.colCount) * 100
                    const widthPct = 100 / p.colCount
                    return (
                      <button
                        key={p.slot.id}
                        type='button'
                        onClick={() => onSlotClick(p.slot)}
                        className={`absolute rounded-xl border px-2 py-1 text-left text-[11px] font-black shadow-sm hover:opacity-95 ${cfg.colorClass}`}
                        style={{
                          top: p.top,
                          height: p.height,
                          left: `calc(${leftPct}% + 4px)`,
                          width: `calc(${widthPct}% - 8px)`,
                        }}
                        title={`${p.slot.service.name} · ${formatHm(new Date(p.slot.startAt))}`}
                      >
                        <div className='truncate'>{formatHm(new Date(p.slot.startAt))} · {p.slot.service.name}</div>
                      </button>
                    )
                  })}

                  {openBookingsForDay.map(p => {
                    const cfg = SERVICE_TYPE_CONFIG[p.booking.service.serviceType]
                    return (
                      <div
                        key={p.booking.id}
                        className={`absolute rounded-xl border border-dashed px-2 py-1 text-left text-[11px] font-black shadow-sm ${cfg.colorClass}`}
                        style={{
                          top: p.top,
                          height: p.height,
                          left: '4px',
                          width: 'calc(100% - 8px)',
                        }}
                        title='Open booking'
                      >
                        <div className='truncate'>
                          {formatHm(new Date(p.booking.startAt!))} · {p.booking.contact.lastName}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (view === 'day') {
    const day = startOfDay(date)
    const dayKey = formatYmd(day)
    const daySlots = slots
      .filter(s => formatYmd(new Date(s.startAt)) === dayKey)
      .slice()
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    const positioned = layoutDaySlots(day, daySlots, pxPerMinute)
    const openBookingsForDay = (openByDay.get(dayKey) ?? [])
      .filter(b => b.startAt && b.endAt && !b.serviceSlotId)
      .map(b => {
        const startAt = new Date(b.startAt!)
        const endAt = new Date(b.endAt!)
        const dayStart = startOfDay(day).getTime()
        const startMin = Math.max(0, Math.floor((startAt.getTime() - dayStart) / 60_000))
        const endMin = Math.max(startMin + 15, Math.floor((endAt.getTime() - dayStart) / 60_000))
        return {
          booking: b,
          top: startMin * pxPerMinute,
          height: Math.max(18, (endMin - startMin) * pxPerMinute),
        }
      })

    return (
      <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
        <div className='border-b border-gray-100 bg-gray-50 px-5 py-3'>
          <div className='text-sm font-black text-gray-900'>{day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        </div>
        <div className='relative max-h-[760px] overflow-auto'>
          <div className='grid grid-cols-[72px_1fr]'>
            <div className='border-r border-gray-100'>
              {hours.map(h => (
                <div
                  key={h}
                  className='flex items-start justify-end border-b border-gray-100 px-2 pt-1 text-[10px] font-black text-gray-400'
                  style={{ height: hourRowHeight }}
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>
            <div className='relative'>
              {hours.map(h => (
                <button
                  key={h}
                  type='button'
                  onClick={() => {
                    const d = new Date(day)
                    d.setHours(h, 0, 0, 0)
                    onEmptySlotClick(d)
                  }}
                  className='block w-full border-b border-gray-100 hover:bg-gray-50'
                  style={{ height: hourRowHeight }}
                  aria-label={`Create on ${day.toDateString()} at ${h}:00`}
                />
              ))}

              {positioned.map(p => {
                const cfg = SERVICE_TYPE_CONFIG[p.slot.service.serviceType]
                const leftPct = (p.colIndex / p.colCount) * 100
                const widthPct = 100 / p.colCount
                return (
                  <button
                    key={p.slot.id}
                    type='button'
                    onClick={() => onSlotClick(p.slot)}
                    className={`absolute rounded-xl border px-2 py-1 text-left text-[11px] font-black shadow-sm hover:opacity-95 ${cfg.colorClass}`}
                    style={{
                      top: p.top,
                      height: p.height,
                      left: `calc(${leftPct}% + 4px)`,
                      width: `calc(${widthPct}% - 8px)`,
                    }}
                    title={`${p.slot.service.name} · ${formatHm(new Date(p.slot.startAt))}`}
                  >
                    <div className='truncate'>{formatHm(new Date(p.slot.startAt))} · {p.slot.service.name}</div>
                    <div className='mt-0.5 truncate text-[10px] font-bold opacity-80'>{p.slot.location.name}</div>
                  </button>
                )
              })}

              {openBookingsForDay.map(p => {
                const cfg = SERVICE_TYPE_CONFIG[p.booking.service.serviceType]
                return (
                  <div
                    key={p.booking.id}
                    className={`absolute rounded-xl border border-dashed px-2 py-1 text-left text-[11px] font-black shadow-sm ${cfg.colorClass}`}
                    style={{
                      top: p.top,
                      height: p.height,
                      left: '4px',
                      width: 'calc(100% - 8px)',
                    }}
                    title='Open booking'
                  >
                    <div className='truncate'>
                      {formatHm(new Date(p.booking.startAt!))} · {p.booking.contact.lastName}
                    </div>
                    <div className='mt-0.5 truncate text-[10px] font-bold opacity-80'>{p.booking.service.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
      <div className='grid grid-cols-7 border-b border-gray-100 bg-gray-50 text-center text-[11px] font-black uppercase tracking-widest text-gray-500'>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
          <div key={d} className='px-2 py-3'>
            {d}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7'>
        {monthCells.map(cell => {
          const ymd = formatYmd(cell.day)
          const dayNum = cell.day.getDate()
          const maxChips = 3
          const chips = cell.slots.slice(0, maxChips)
          const overflow = Math.max(0, cell.slots.length - maxChips)
          const openCount = openByDay.get(ymd)?.length ?? 0

          return (
            <div
              key={ymd}
              className={[
                'min-h-[120px] border-b border-r border-gray-100 p-2',
                cell.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              ].join(' ')}
            >
              <button
                type='button'
                onClick={() => onEmptySlotClick(cell.day)}
                className='flex w-full items-center justify-between gap-2 rounded-lg px-1 py-1 text-left hover:bg-gray-50'
              >
                <span className={['text-xs font-black', cell.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'].join(' ')}>
                  {dayNum}
                </span>
                <span className='text-[10px] font-black uppercase tracking-widest text-gray-300'>New</span>
              </button>

              <div className='mt-2 space-y-1'>
                {chips.map(s => (
                  <button
                    key={s.id}
                    type='button'
                    onClick={() => onSlotClick(s)}
                    className='w-full truncate rounded-lg border border-gray-200 bg-white px-2 py-1 text-left text-[11px] font-bold text-gray-800 hover:bg-gray-50'
                    title={`${s.service.name} · ${new Date(s.startAt).toLocaleTimeString()}`}
                  >
                    {new Date(s.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {s.service.name}
                  </button>
                ))}
                {overflow > 0 ? (
                  <div className='text-[11px] font-bold text-gray-400'>+{overflow} more</div>
                ) : null}
                {openCount > 0 ? (
                  <div className='text-[11px] font-bold text-gray-400'>+{openCount} open booking{openCount !== 1 ? 's' : ''}</div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

