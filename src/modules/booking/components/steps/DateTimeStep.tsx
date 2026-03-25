'use client'

import { useQuery } from '@tanstack/react-query'
import { getTimeSlots } from '@/api/bookingApi'
import BackButton from '../BackButton'
import BookingStepHeader from '../BookingStepHeader'
import MiniCalendar from '../MiniCalendar'
import NextButton from '../NextButton'
import type { BookingDateTimeStepProps } from '../types'
import { BookingStepIndex } from '../types'

export default function DateTimeStep({
  booking,
  service,
  option,
  accent,
  accentHex,
  update,
  setStep,
}: BookingDateTimeStepProps) {
  // Fetch slots for selected date range
  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['booking', 'slots', booking.date],
    queryFn: () => getTimeSlots(booking.date || undefined),
    enabled: !!booking.date,
  })

  const availableTimes =
    slots.length > 0
      ? slots.map(slot => ({ key: slot.id, time: slot.startTime }))
      : service.times.map((time, idx) => ({ key: `${time}-${idx}`, time }))

  return (
    <div className='step-panel dt-surface rounded-[28px] p-6 lg:p-8'>
      <BackButton onClick={() => setStep(BookingStepIndex.Package)} />
      <BookingStepHeader
        eyebrow='Availability'
        title='When works for you?'
        sub='Choose your preferred date and time slot.'
        accentColor={accent}
      />

      {option && (
        <div className='mb-6 flex items-center gap-4 rounded-[18px] border border-[var(--dt-border)] bg-white px-5 py-4 shadow-sm'>
          <div className='flex-1'>
            <p className='mb-0.5 text-[12px] font-bold text-[var(--dt-text-subtle)]'>{service.label}</p>
            <p className='text-[15px] font-extrabold text-[var(--dt-navy)]'>{option.label}</p>
          </div>
          <div className='text-right'>
            <span className='block text-[22px] font-black' style={{ color: accent }}>
              {option.price}
            </span>
            <span className='text-[11px] text-[var(--dt-text-subtle)]'>{option.unit}</span>
          </div>
          {option.badge && (
            <span
              className='rounded-full px-2.5 py-1 text-[10px] font-black uppercase text-white'
              style={{ background: accentHex }}
            >
              {option.badge}
            </span>
          )}
        </div>
      )}

      <div className='mb-6 grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div>
          <p className='mb-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
            Select Date
          </p>
          <MiniCalendar selected={booking.date} onSelect={date => update({ date })} accentHex={accentHex} />
        </div>

        <div>
          <p className='mb-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
            Select Time
          </p>
          <div className='grid grid-cols-2 gap-2'>
            {isLoading ? (
              <>
                <div className='h-12 animate-pulse rounded-[12px] bg-black/5' />
                <div className='h-12 animate-pulse rounded-[12px] bg-black/5' />
              </>
            ) : booking.date ? (
              availableTimes.map(({ key, time }) => {
                const selected = booking.time === time

                return (
                  <button
                    key={key}
                    type='button'
                    onClick={() => update({ time })}
                    className='cursor-pointer rounded-[12px] border-[1.5px] py-3 text-center text-[13px] font-bold transition-all duration-150'
                    style={{
                      background: selected ? accentHex : 'white',
                      borderColor: selected ? accentHex : 'var(--dt-border)',
                      color: selected ? '#fff' : 'var(--dt-text-muted)',
                    }}
                  >
                    {time}
                  </button>
                )
              })
            ) : (
              <p className='col-span-2 py-4 text-center text-[13px] text-[var(--dt-text-muted)]'>
                Please select a date first
              </p>
            )}
          </div>
        </div>
      </div>

      <NextButton
        label='Continue to Guest Info'
        disabled={!booking.date || !booking.time}
        accentHex={accentHex}
        onClick={() => setStep(BookingStepIndex.Guests)}
      />
    </div>
  )
}
