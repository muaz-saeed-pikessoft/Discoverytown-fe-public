'use client'

import { useMemo, useState } from 'react'

import AvailabilityBadge from '@/portal/user/features/booking/components/AvailabilityBadge'
import type { PublicServiceSlot } from '@/types/scheduling.shared'

interface BookingWidgetProps {
  slot: PublicServiceSlot
  onBookNow: (input: { slotId: string }) => void
  onJoinWaitlist?: (slotId: string) => void
  className?: string
}

export default function BookingWidget({ slot, onBookNow, onJoinWaitlist, className }: BookingWidgetProps) {
  const [step, setStep] = useState<'details' | 'confirm'>('details')

  const isFull = slot.status === 'FULL' || slot.availableSpots <= 0

  const formattedTime = useMemo(() => {
    const start = new Date(slot.startAt)
    const end = new Date(slot.endAt)
    return `${start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · ${start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })} – ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }, [slot.endAt, slot.startAt])

  return (
    <div className={className}>
      <div className='rounded-[22px] border border-[var(--dt-border)] bg-white p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0'>
            <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Total</div>
            <div className='mt-1 text-2xl font-black tracking-[-0.02em] text-[var(--dt-navy)] dt-font-heading'>
              ${slot.effectivePrice}
            </div>
            <div className='mt-1 text-xs font-semibold text-[var(--dt-text-body)]/70'>{formattedTime}</div>
          </div>
          <AvailabilityBadge availableSpots={slot.availableSpots} status={slot.status} capacity={slot.effectiveCapacity} />
        </div>

        {step === 'details' ? (
          <div className='mt-4 space-y-2'>
            <button
              type='button'
              disabled={isFull}
              onClick={() => setStep('confirm')}
              className='dt-btn-primary w-full h-11 disabled:cursor-not-allowed disabled:opacity-60'
            >
              Book now
            </button>
            {isFull ? (
              <button
                type='button'
                onClick={() => (onJoinWaitlist ? onJoinWaitlist(slot.id) : undefined)}
                className='h-11 w-full rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-sm font-black text-[var(--dt-navy)] transition hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
              >
                Join waitlist
              </button>
            ) : null}
          </div>
        ) : (
          <div className='mt-4 space-y-3'>
            <div className='rounded-[16px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-3 text-xs font-semibold text-[var(--dt-text-body)]/75'>
              Payment is stubbed for now. This will create a booking and redirect to confirmation in the next phase.
            </div>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => setStep('details')}
                className='h-11 flex-1 rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-sm font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)]'
              >
                Back
              </button>
              <button
                type='button'
                onClick={() => onBookNow({ slotId: slot.id })}
                className='dt-btn-primary h-11 flex-1'
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

