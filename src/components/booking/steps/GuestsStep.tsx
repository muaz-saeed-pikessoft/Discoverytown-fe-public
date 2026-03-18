import BackButton from '../BackButton'
import BookingStepHeader from '../BookingStepHeader'
import NextButton from '../NextButton'
import type { BookingGuestsStepProps } from '../types'
import { BookingStepIndex } from '../types'

export default function GuestsStep({
  booking,
  ageOptions,
  accent,
  accentHex,
  update,
  setStep,
  toggleAge,
}: BookingGuestsStepProps) {
  return (
    <div className='step-panel dt-surface rounded-[28px] p-6 lg:p-8'>
      <BackButton onClick={() => setStep(BookingStepIndex.DateTime)} />
      <BookingStepHeader
        eyebrow='Guests'
        title="Who's coming?"
        sub='Tell us about your group so we can prepare the right experience.'
        accentColor={accent}
      />

      <div className='dt-surface mb-5 rounded-[22px] p-7'>
        <p className='mb-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
          Number of Guests
        </p>
        <div className='flex items-center gap-4'>
          <button
            type='button'
            onClick={() => update({ guests: Math.max(1, booking.guests - 1) })}
            className='flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] text-xl font-black text-[var(--dt-navy)] transition-colors hover:bg-[var(--dt-border)]'
          >
            −
          </button>
          <span className='min-w-[48px] text-center text-[28px] font-black text-[var(--dt-navy)]'>{booking.guests}</span>
          <button
            type='button'
            onClick={() => update({ guests: booking.guests + 1 })}
            className='flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] text-xl font-black text-white transition-opacity hover:opacity-90'
            style={{ background: accentHex, borderColor: accentHex }}
          >
            +
          </button>
        </div>
      </div>

      <div className='dt-surface mb-6 rounded-[22px] p-7'>
        <p className='mb-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
          Age Groups (select all that apply)
        </p>
        <div className='flex flex-wrap gap-2.5'>
          {ageOptions.map(age => {
            const selected = booking.ages.includes(age)

            return (
              <button
                key={age}
                type='button'
                onClick={() => toggleAge(age)}
                className='cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-[13px] font-extrabold transition-all duration-150'
                style={{
                  borderColor: selected ? accentHex : 'var(--dt-border)',
                  background: selected ? `${accentHex}14` : 'white',
                  color: selected ? accentHex : 'var(--dt-text-muted)',
                }}
              >
                {selected ? '✓ ' : ''}
                {age}
              </button>
            )
          })}
        </div>
      </div>

      <NextButton
        label='Continue to Review'
        disabled={booking.guests < 1}
        accentHex={accentHex}
        onClick={() => setStep(BookingStepIndex.Review)}
      />
    </div>
  )
}
