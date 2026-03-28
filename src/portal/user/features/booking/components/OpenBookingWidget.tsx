'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import MiniCalendar from '@/modules/booking/components/MiniCalendar'
import type { PublicService } from '@/types/scheduling.shared'
import { ROUTES } from '@/constants/routes'
import { useOpenAvailability } from '@/portal/user/features/booking/hooks/useOpenAvailability'
import { calculateOpenBookingPrice, formatDuration, formatDurationLabel, generateDurationOptions } from '@/lib/utils/open-booking-price'
import { createOpenBooking } from '@/lib/api/user/booking.api'

interface OpenBookingWidgetProps {
  service: PublicService
}

function toYmd(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatTimeLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function OpenBookingWidget({ service }: OpenBookingWidgetProps) {
  const router = useRouter()
  const pricingModel = ((service.metadata as Record<string, unknown> | undefined)?.pricingModel as any) ?? 'flat'

  const minDuration = (service as any).minDurationMinutes ?? 60
  const maxDuration = (service as any).maxDurationMinutes ?? minDuration
  const increment = (service as any).slotIncrementMinutes ?? 30
  const maxConcurrent = (service as any).maxConcurrent ?? 10
  const showDurationStep = maxDuration > minDuration

  const [step, setStep] = useState<'date' | 'time' | 'duration' | 'confirm'>('date')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedStartAt, setSelectedStartAt] = useState<string | null>(null)
  const [selectedEndAt, setSelectedEndAt] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<number>(minDuration)
  const [guestCount, setGuestCount] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const availability = useOpenAvailability(service.id, selectedDate)

  const durationOptions = useMemo(() => generateDurationOptions(minDuration, maxDuration, increment), [increment, maxDuration, minDuration])

  const total = useMemo(() => {
    if (!selectedStartAt || !selectedEndAt) return 0
    return calculateOpenBookingPrice(service.basePrice, pricingModel, selectedStartAt, selectedEndAt, guestCount)
  }, [guestCount, pricingModel, selectedEndAt, selectedStartAt, service.basePrice])

  async function confirm() {
    if (!selectedStartAt || !selectedEndAt) return
    const locationId = service.locationId ?? 'loc-public-2'
    setSubmitting(true)
    try {
      const booking = await createOpenBooking({
        serviceId: service.id,
        locationId,
        startAt: selectedStartAt,
        endAt: selectedEndAt,
        guestCount,
      })
      router.push(`${ROUTES.USER.BOOKING_SUCCESS}?bookingId=${encodeURIComponent(booking.id)}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='rounded-[22px] border border-[var(--dt-border)] bg-white p-4'>
      {step === 'date' ? (
        <div className='space-y-3'>
          <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Select a date</div>
          <MiniCalendar
            selected={selectedDate}
            onSelect={date => {
              setSelectedDate(date)
              setSelectedStartAt(null)
              setSelectedEndAt(null)
              setStep('time')
            }}
            accentHex='#1d7fe5'
          />
        </div>
      ) : null}

      {step === 'time' ? (
        <div className='space-y-3'>
          <div className='flex items-center justify-between gap-2'>
            <div>
              <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Choose a start time</div>
              <div className='mt-1 text-sm font-black text-[var(--dt-navy)]'>{selectedDate}</div>
            </div>
            <button
              type='button'
              onClick={() => setStep('date')}
              className='h-9 rounded-xl border border-[var(--dt-border)] bg-white px-3 text-xs font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)]'
            >
              Back
            </button>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            {availability.isLoading ? (
              <>
                <div className='h-12 animate-pulse rounded-[12px] bg-black/5' />
                <div className='h-12 animate-pulse rounded-[12px] bg-black/5' />
                <div className='h-12 animate-pulse rounded-[12px] bg-black/5' />
                <div className='h-12 animate-pulse rounded-[12px] bg-black/5' />
              </>
            ) : availability.data?.windows?.length ? (
              availability.data.windows.map(w => {
                const selected = selectedStartAt === w.startAt
                const isFull = w.spotsRemaining <= 0
                const limited = w.spotsRemaining > 0 && w.spotsRemaining < maxConcurrent

                return (
                  <button
                    key={w.startAt}
                    type='button'
                    disabled={isFull}
                    onClick={() => {
                      setSelectedStartAt(w.startAt)
                      const end = new Date(new Date(w.startAt).getTime() + selectedDuration * 60_000).toISOString()
                      setSelectedEndAt(end)
                      if (showDurationStep) setStep('duration')
                      else setStep('confirm')
                    }}
                    className='cursor-pointer rounded-[12px] border-[1.5px] py-3 text-center text-[13px] font-bold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50'
                    style={{
                      background: selected ? '#1d7fe5' : 'white',
                      borderColor: selected ? '#1d7fe5' : 'var(--dt-border)',
                      color: selected ? '#fff' : 'var(--dt-text-muted)',
                    }}
                  >
                    <div>{formatTimeLabel(w.startAt)}</div>
                    {limited ? <div className='mt-0.5 text-[10px] font-black'>Limited</div> : null}
                  </button>
                )
              })
            ) : (
              <div className='col-span-2 rounded-[14px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-3 text-xs font-semibold text-[var(--dt-text-body)]/75'>
                No availability on this date. Please select another date.
              </div>
            )}
          </div>
        </div>
      ) : null}

      {step === 'duration' ? (
        <div className='space-y-3'>
          <div className='flex items-center justify-between gap-2'>
            <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>How long do you need?</div>
            <button
              type='button'
              onClick={() => setStep('time')}
              className='h-9 rounded-xl border border-[var(--dt-border)] bg-white px-3 text-xs font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)]'
            >
              Back
            </button>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            {durationOptions.map(m => {
              const selected = selectedDuration === m
              const previewEndAt = selectedStartAt ? new Date(new Date(selectedStartAt).getTime() + m * 60_000).toISOString() : null
              const previewPrice =
                selectedStartAt && previewEndAt ? calculateOpenBookingPrice(service.basePrice, pricingModel, selectedStartAt, previewEndAt, guestCount) : 0

              return (
                <button
                  key={m}
                  type='button'
                  onClick={() => {
                    setSelectedDuration(m)
                    if (selectedStartAt) setSelectedEndAt(new Date(new Date(selectedStartAt).getTime() + m * 60_000).toISOString())
                    setStep('confirm')
                  }}
                  className='cursor-pointer rounded-[12px] border-[1.5px] px-3 py-3 text-left text-[13px] font-bold transition-all duration-150'
                  style={{
                    background: selected ? '#1d7fe5' : 'white',
                    borderColor: selected ? '#1d7fe5' : 'var(--dt-border)',
                    color: selected ? '#fff' : 'var(--dt-text-muted)',
                  }}
                >
                  <div className='font-black'>{formatDurationLabel(m)}</div>
                  <div className='mt-0.5 text-[11px] font-black opacity-80'>${previewPrice}</div>
                </button>
              )
            })}
          </div>

          {pricingModel === 'per_person' ? (
            <div className='rounded-[14px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-3'>
              <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Guests</div>
              <div className='mt-2 flex items-center gap-2'>
                <button
                  type='button'
                  onClick={() => setGuestCount(v => Math.max(1, v - 1))}
                  className='h-10 w-10 rounded-xl border border-[var(--dt-border)] bg-white text-sm font-black text-[var(--dt-navy)]'
                >
                  −
                </button>
                <div className='flex-1 text-center text-sm font-black text-[var(--dt-navy)]'>{guestCount}</div>
                <button
                  type='button'
                  onClick={() => setGuestCount(v => v + 1)}
                  className='h-10 w-10 rounded-xl border border-[var(--dt-border)] bg-white text-sm font-black text-[var(--dt-navy)]'
                >
                  +
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {step === 'confirm' ? (
        <div className='space-y-3'>
          <div className='flex items-center justify-between gap-2'>
            <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Review</div>
            <button
              type='button'
              onClick={() => setStep(showDurationStep ? 'duration' : 'time')}
              className='h-9 rounded-xl border border-[var(--dt-border)] bg-white px-3 text-xs font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)]'
            >
              Back
            </button>
          </div>

          <div className='rounded-[16px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-3 text-xs font-semibold text-[var(--dt-text-body)]/80'>
            <div className='flex items-center justify-between gap-2'>
              <div className='font-black text-[var(--dt-navy)]'>{service.name}</div>
              <div className='font-black text-[var(--dt-navy)]'>${total}</div>
            </div>
            <div className='mt-2'>
              Date: {selectedDate ?? '—'}
              <br />
              Time: {selectedStartAt && selectedEndAt ? `${formatTimeLabel(selectedStartAt)} – ${formatTimeLabel(selectedEndAt)}` : '—'}
              <br />
              Duration: {selectedStartAt && selectedEndAt ? formatDuration(selectedStartAt, selectedEndAt) : '—'}
              {pricingModel === 'per_person' ? (
                <>
                  <br />
                  Guests: {guestCount}
                </>
              ) : null}
            </div>
          </div>

          <button
            type='button'
            disabled={submitting || !selectedStartAt || !selectedEndAt}
            onClick={() => void confirm()}
            className='dt-btn-primary w-full h-11 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {submitting ? 'Booking…' : 'Confirm booking'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

