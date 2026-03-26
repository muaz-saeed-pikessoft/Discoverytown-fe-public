'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { createBooking } from '@/api/bookingApi'
import BackButton from '../BackButton'
import BookingStepHeader from '../BookingStepHeader'
import {
  CARD_PROCESSING_RATE,
  ESTIMATED_TAX_RATE,
  computeCheckoutTotals,
  formatUsd,
  parseListedPrice,
} from '../bookingPricing'
import { BOOKING_INPUT_CLASS } from '../config'
import type { BookingReviewStepProps } from '../types'
import { BookingStepIndex } from '../types'

const TIP_PRESETS = [0, 10, 15, 20] as const

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [guestWaiverUrl, setGuestWaiverUrl] = useState('')

  useEffect(() => {
    setGuestWaiverUrl(`${window.location.origin}/waiver/guest?ref=preview`)
  }, [])

  const packageBase = useMemo(() => parseListedPrice(option.price), [option.price])

  const breakdown = useMemo(
    () =>
      computeCheckoutTotals({
        packageBase,
        addonLabels: booking.addons,
        discountCode: booking.discountCode,
        tipPercent: booking.tipPercent,
        donationDollars: booking.donationDollars,
        passCardFee: booking.passCardFee,
      }),
    [
      packageBase,
      booking.addons,
      booking.discountCode,
      booking.tipPercent,
      booking.donationDollars,
      booking.passCardFee,
    ],
  )

  const isFormValid =
    !!booking.name && !!booking.email && !!booking.phone && booking.waiverAccepted

  async function copyGuestWaiverLink() {
    if (!guestWaiverUrl) return
    try {
      await navigator.clipboard.writeText(guestWaiverUrl)
      toast.success('Guest waiver link copied')
    } catch {
      toast.error('Could not copy — select and copy the link manually.')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isFormValid || isSubmitting) return

    setIsSubmitting(true)
    try {
      await createBooking({
        service_id: service.id,
        option_id: option.slug,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        user_name: booking.name,
        user_email: booking.email,
        user_phone: booking.phone,
        notes: booking.notes,
        addons: booking.addons,
        ages: booking.ages,
        waiver_accepted: booking.waiverAccepted,
        discount_code: booking.discountCode,
        tip_percent: booking.tipPercent,
        donation: breakdown.donation,
        pass_card_fee: booking.passCardFee,
        estimated_total: breakdown.total,
      })
      onSubmit()
    } catch {
      onSubmit()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='step-panel dt-surface rounded-[28px] p-6 lg:p-8'>
      <BackButton onClick={() => setStep(BookingStepIndex.Guests)} />
      <BookingStepHeader
        eyebrow='Review'
        title='Almost there!'
        sub='Confirm your details, waivers, and estimated totals — then submit your booking request.'
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
            <p className='mb-1 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Package price</p>
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

      <div className='dt-surface mb-6 rounded-[22px] p-6'>
        <p className='mb-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--dt-text-subtle)]'>
          Estimated checkout
        </p>
        <p className='mb-4 text-[12px] leading-relaxed text-[var(--dt-text-muted)]'>
          Estimates only — final invoice may differ. Tax uses a sample {Math.round(ESTIMATED_TAX_RATE * 100)}% rate.
        </p>

        <label className='mb-3 block'>
          <span className='mb-1.5 block text-[11px] font-bold text-[var(--dt-text-subtle)]'>Discount code</span>
          <input
            value={booking.discountCode}
            onChange={event => update({ discountCode: event.target.value })}
            placeholder='e.g. SAVE10, PARTY5'
            className={BOOKING_INPUT_CLASS}
          />
        </label>

        <p className='mb-2 text-[11px] font-bold text-[var(--dt-text-subtle)]'>Tip (optional)</p>
        <div className='mb-4 flex flex-wrap gap-2'>
          {TIP_PRESETS.map(pct => {
            const selected = booking.tipPercent === pct

            return (
              <button
                key={pct}
                type='button'
                onClick={() => update({ tipPercent: pct })}
                className='cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-[12px] font-extrabold transition-all duration-150'
                style={{
                  borderColor: selected ? accentHex : 'var(--dt-border)',
                  background: selected ? `${accentHex}14` : 'white',
                  color: selected ? accentHex : 'var(--dt-text-muted)',
                }}
              >
                {pct === 0 ? 'No tip' : `${pct}%`}
              </button>
            )
          })}
        </div>

        <label className='mb-4 block'>
          <span className='mb-1.5 block text-[11px] font-bold text-[var(--dt-text-subtle)]'>
            Optional donation
          </span>
          <input
            value={booking.donationDollars}
            onChange={event => update({ donationDollars: event.target.value })}
            placeholder='0.00'
            inputMode='decimal'
            className={BOOKING_INPUT_CLASS}
          />
        </label>

        <label className='mb-4 flex cursor-pointer items-start gap-3 text-[13px] font-bold text-[var(--dt-text-muted)]'>
          <input
            type='checkbox'
            checked={booking.passCardFee}
            onChange={event => update({ passCardFee: event.target.checked })}
            className='mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--dt-teal)]'
          />
          <span>
            Add card processing fee ({Math.round(CARD_PROCESSING_RATE * 100)}%) so the card fee is covered on this
            estimate.
          </span>
        </label>

        <div className='space-y-2 rounded-xl border border-[var(--dt-border)] bg-white/80 p-4 text-[13px]'>
          <div className='flex justify-between font-bold text-[var(--dt-navy)]'>
            <span>Subtotal (package + flat add-ons)</span>
            <span>{formatUsd(breakdown.packageSubtotal)}</span>
          </div>
          {breakdown.discountAmount > 0 && (
            <div className='flex justify-between font-bold text-emerald-700'>
              <span>Discount</span>
              <span>−{formatUsd(breakdown.discountAmount)}</span>
            </div>
          )}
          <div className='flex justify-between text-[var(--dt-text-muted)]'>
            <span>After discount</span>
            <span className='font-bold text-[var(--dt-navy)]'>{formatUsd(breakdown.afterDiscount)}</span>
          </div>
          <div className='flex justify-between text-[var(--dt-text-muted)]'>
            <span>Est. tax</span>
            <span className='font-bold text-[var(--dt-navy)]'>{formatUsd(breakdown.tax)}</span>
          </div>
          <div className='flex justify-between text-[var(--dt-text-muted)]'>
            <span>Tip</span>
            <span className='font-bold text-[var(--dt-navy)]'>{formatUsd(breakdown.tip)}</span>
          </div>
          <div className='flex justify-between text-[var(--dt-text-muted)]'>
            <span>Donation</span>
            <span className='font-bold text-[var(--dt-navy)]'>{formatUsd(breakdown.donation)}</span>
          </div>
          {breakdown.cardFee > 0 && (
            <div className='flex justify-between text-[var(--dt-text-muted)]'>
              <span>Card processing</span>
              <span className='font-bold text-[var(--dt-navy)]'>{formatUsd(breakdown.cardFee)}</span>
            </div>
          )}
          <div
            className='flex justify-between border-t border-[var(--dt-border)] pt-3 text-[15px] font-black'
            style={{ color: accentHex }}
          >
            <span>Estimated total</span>
            <span>{formatUsd(breakdown.total)}</span>
          </div>
        </div>
      </div>

      <div className='dt-surface mb-6 rounded-[22px] p-6'>
        <p className='mb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--dt-text-subtle)]'>
          Waivers
        </p>
        <p className='mb-4 text-[13px] leading-relaxed text-[var(--dt-text-muted)]'>
          Participation waivers are part of checkout. Please sign yours after we confirm — you&apos;ll get a link by
          email. We recommend completing waivers before you arrive.
        </p>
        {service.id === 'events' && (
          <div className='mb-4 rounded-xl border border-[var(--dt-border)] bg-white/80 p-4'>
            <p className='mb-2 text-[12px] font-bold text-[var(--dt-navy)]'>Guest parents & guardians</p>
            <p className='mb-3 text-[12px] leading-relaxed text-[var(--dt-text-muted)]'>
              Share this link with invitees so each child&apos;s adult can sign before the party (preview URL until live
              checkout is wired).
            </p>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <code className='block max-w-full flex-1 truncate rounded-lg bg-[var(--dt-bg-page)] px-3 py-2 text-[11px] text-[var(--dt-text-muted)]'>
                {guestWaiverUrl || '…'}
              </code>
              <button
                type='button'
                onClick={() => void copyGuestWaiverLink()}
                className='cursor-pointer rounded-xl border-none bg-[var(--dt-navy)] px-4 py-2.5 text-[12px] font-black text-white transition-opacity hover:opacity-90'
              >
                Copy link
              </button>
            </div>
          </div>
        )}
        <label className='flex cursor-pointer items-start gap-3 text-[13px] font-bold text-[var(--dt-navy)]'>
          <input
            type='checkbox'
            checked={booking.waiverAccepted}
            onChange={event => update({ waiverAccepted: event.target.checked })}
            className='mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--dt-teal)]'
          />
          <span>I understand that waivers are required for participation and will be completed as instructed.</span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className='dt-surface flex flex-col gap-3.5 rounded-[22px] p-6'>
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
          disabled={!isFormValid || isSubmitting}
          className='mt-1 w-full rounded-xl border-none py-4 text-[15px] font-black text-white transition-all duration-150'
          style={{
            background: isFormValid && !isSubmitting ? accentHex : 'var(--dt-border)',
            cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Send Booking Request'}
        </button>

        <p className='text-center text-[12px] text-[var(--dt-text-subtle)]'>
          We&apos;ll confirm within 1 business day. No payment is taken at this stage.
        </p>
      </form>
    </div>
  )
}
