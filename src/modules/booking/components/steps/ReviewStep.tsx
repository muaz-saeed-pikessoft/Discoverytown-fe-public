import { BOOKING_INPUT_CLASS } from '../config'
import BackButton from '../BackButton'
import BookingStepHeader from '../BookingStepHeader'
import type { BookingReviewStepProps } from '../types'
import { BookingStepIndex } from '../types'

export default function ReviewStep({
  booking,
  service,
  option,
  accent,
  accentHex,
  update,
  setStep,
  onSubmit,
}: BookingReviewStepProps) {
  const isFormValid = !!booking.name && !!booking.email && !!booking.phone

  return (
    <div className='step-panel dt-surface rounded-[28px] p-6 lg:p-8'>
      <BackButton onClick={() => setStep(BookingStepIndex.Guests)} />
      <BookingStepHeader
        eyebrow='Review'
        title='Almost there!'
        sub='Confirm your details and submit your booking request.'
        accentColor={accent}
      />

      <div className='dt-surface mb-6 rounded-[22px] p-6'>
        <p className='mb-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--dt-text-subtle)]'>
          Booking Summary
        </p>
        <div className='mb-4 grid grid-cols-2 gap-4 text-[14px]'>
          <div>
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Service</p>
            <p className='font-extrabold text-[var(--dt-navy)]'>{service.label}</p>
          </div>
          <div>
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Package</p>
            <p className='font-extrabold text-[var(--dt-navy)]'>{option.label}</p>
          </div>
          <div>
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Date</p>
            <p className='font-extrabold text-[var(--dt-navy)]'>{booking.date}</p>
          </div>
          <div>
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Time</p>
            <p className='font-extrabold text-[var(--dt-navy)]'>{booking.time}</p>
          </div>
          <div>
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Guests</p>
            <p className='font-extrabold text-[var(--dt-navy)]'>{booking.guests}</p>
          </div>
          <div>
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Price</p>
            <p className='text-[16px] font-black' style={{ color: accent }}>
              {option.price} <span className='text-[12px] font-bold text-[var(--dt-text-subtle)]'>{option.unit}</span>
            </p>
          </div>
        </div>

        {booking.addons.length > 0 && (
          <div className='border-t border-[var(--dt-border)] pt-4'>
            <p className='mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
              Add-Ons
            </p>
            <div className='flex flex-wrap gap-2'>
              {booking.addons.map(addon => (
                <span
                  key={addon}
                  className='rounded-full px-3 py-1 text-[12px] font-bold'
                  style={{ background: `${accentHex}14`, color: accentHex }}
                >
                  {addon}
                </span>
              ))}
            </div>
          </div>
        )}

        {booking.ages.length > 0 && (
          <div className='border-t border-[var(--dt-border)] pt-4'>
            <p className='mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--dt-text-subtle)]'>
              Age Groups
            </p>
            <p className='text-[13px] font-bold text-[var(--dt-text-muted)]'>{booking.ages.join(', ')}</p>
          </div>
        )}
      </div>

      <form
        onSubmit={event => {
          event.preventDefault()
          if (!isFormValid) return
          onSubmit()
        }}
        className='dt-surface flex flex-col gap-3.5 rounded-[22px] p-6'
      >
        <p className='text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--dt-text-subtle)]'>
          Your Contact Details
        </p>
        <div className='grid grid-cols-1 gap-3.5 sm:grid-cols-2'>
          <input
            value={booking.name}
            onChange={event => update({ name: event.target.value })}
            placeholder='Full Name *'
            required
            className={BOOKING_INPUT_CLASS}
          />
          <input
            value={booking.email}
            onChange={event => update({ email: event.target.value })}
            placeholder='Email Address *'
            type='email'
            required
            className={BOOKING_INPUT_CLASS}
          />
        </div>
        <input
          value={booking.phone}
          onChange={event => update({ phone: event.target.value })}
          placeholder='Phone Number *'
          required
          className={BOOKING_INPUT_CLASS}
        />
        <textarea
          value={booking.notes}
          onChange={event => update({ notes: event.target.value })}
          placeholder='Any special requests, allergies, or event notes...'
          rows={3}
          className={`${BOOKING_INPUT_CLASS} resize-y`}
        />

        <button
          type='submit'
          disabled={!isFormValid}
          className='mt-1 w-full rounded-xl border-none py-4 text-[15px] font-black text-white transition-all duration-150'
          style={{
            background: isFormValid ? accentHex : 'var(--dt-border)',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
        >
          Send Booking Request
        </button>

        <p className='text-center text-[12px] text-[var(--dt-text-subtle)]'>
          We&apos;ll confirm within 1 business day. No payment is taken at this stage.
        </p>
      </form>
    </div>
  )
}
