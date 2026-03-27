'use client'

import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import CapacityRing from '@/portal/admin/features/scheduling/components/CapacityRing'
import ServiceTypeBadge from '@/portal/admin/features/scheduling/components/ServiceTypeBadge'
import SlotStatusBadge from '@/portal/admin/features/scheduling/components/SlotStatusBadge'
import type { ServiceSlot } from '@/portal/admin/features/scheduling/types'

interface SlotPopoverProps {
  slot: ServiceSlot
  onClose: () => void
  onQuickCancel?: () => void
}

export default function SlotPopover({ slot, onClose, onQuickCancel }: SlotPopoverProps) {
  return (
    <div className='w-[340px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.14)]'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='truncate text-sm font-black text-gray-900'>{slot.service.name}</div>
          <div className='mt-2 flex flex-wrap items-center gap-2'>
            <ServiceTypeBadge serviceType={slot.service.serviceType} />
            <SlotStatusBadge status={slot.status} />
          </div>
        </div>
        <button
          type='button'
          onClick={onClose}
          className='h-9 w-9 rounded-xl border border-gray-200 bg-white text-sm font-black text-gray-700 transition hover:bg-gray-50'
          aria-label='Close'
        >
          ×
        </button>
      </div>

      <div className='mt-4 space-y-2 text-sm text-gray-700'>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs font-black uppercase tracking-widest text-gray-500'>When</span>
          <span className='font-semibold'>{new Date(slot.startAt).toLocaleString()}</span>
        </div>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Instructor</span>
          <span className='font-semibold'>
            {slot.staff ? `${slot.staff.firstName} ${slot.staff.lastName}` : '—'}
          </span>
        </div>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Capacity</span>
          <CapacityRing booked={slot.bookedCount} capacity={slot.effectiveCapacity} size='sm' />
        </div>
      </div>

      <div className='mt-5 grid grid-cols-2 gap-2'>
        <Link
          href={ROUTES.ADMIN.SCHEDULING_EVENT(slot.id)}
          className='h-10 rounded-xl border border-gray-200 bg-white px-3 text-center text-xs font-black leading-10 text-gray-700 transition hover:bg-gray-50'
        >
          View full
        </Link>
        <button
          type='button'
          onClick={onQuickCancel}
          className='h-10 rounded-xl bg-red-600 px-3 text-xs font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
          disabled={!onQuickCancel}
        >
          Quick cancel
        </button>
      </div>
    </div>
  )
}

