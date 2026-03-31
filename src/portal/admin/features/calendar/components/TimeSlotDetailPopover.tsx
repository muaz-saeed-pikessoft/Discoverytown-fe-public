'use client'

import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import SlotStatusBadge from '@/portal/admin/features/scheduling/components/SlotStatusBadge'
import type { AvailabilityCell } from '@/portal/admin/features/calendar/types'

interface TimeSlotDetailPopoverProps {
  cell: AvailabilityCell | null
  onClose: () => void
}

export default function TimeSlotDetailPopover({ cell, onClose }: TimeSlotDetailPopoverProps) {
  if (!cell) return null

  const label = `${cell.date} · ${String(cell.hour).padStart(2, '0')}:00`

  return (
    <div className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-black/20' onClick={onClose} aria-hidden='true' />
      <div className='relative flex min-h-full items-center justify-center p-5'>
        <div className='w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.14)]'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <h2 className='text-sm font-black text-gray-900'>Sessions in this hour</h2>
              <p className='mt-1 text-xs font-semibold text-gray-500'>{label}</p>
              <p className='mt-1 text-xs text-gray-500'>
                {cell.sessionCount} session{cell.sessionCount !== 1 ? 's' : ''}, {cell.averageCapacityPercent}% avg
                capacity
              </p>
            </div>
            <button
              type='button'
              onClick={onClose}
              className='h-9 w-9 shrink-0 rounded-xl border border-gray-200 bg-white text-sm font-black text-gray-700 transition hover:bg-gray-50'
              aria-label='Close'
            >
              ×
            </button>
          </div>

          <ul className='mt-4 max-h-[320px] space-y-2 overflow-y-auto'>
            {cell.slots.length === 0 ? (
              <li className='rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500'>
                No sessions
              </li>
            ) : (
              cell.slots.map(s => (
                <li key={s.slotId} className='rounded-xl border border-gray-100 bg-gray-50 px-4 py-3'>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='min-w-0'>
                      <div className='truncate text-sm font-black text-gray-900'>{s.serviceName}</div>
                      <div className='mt-1 text-xs font-semibold text-gray-600'>
                        {s.instructorName ?? 'No instructor'} · {s.bookedCount}/{s.capacity}
                      </div>
                    </div>
                    <SlotStatusBadge status={s.status} />
                  </div>
                  <div className='mt-3'>
                    <Link
                      href={ROUTES.ADMIN.SCHEDULING_EVENT(s.slotId)}
                      className='text-xs font-black text-blue-600 underline-offset-2 hover:underline'
                    >
                      View session
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
