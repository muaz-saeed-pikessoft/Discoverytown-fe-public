import type { SuccessScreenProps } from './types'

export default function SuccessScreen({ booking, svcLabel, optLabel, accentHex, onReset }: SuccessScreenProps) {
  const isPartyBooking = booking.service === 'events'
  return (
    <div className='dt-font-body flex min-h-screen items-center justify-center bg-[var(--dt-bg-page)] px-5'>
      <div className='w-full max-w-[520px] rounded-[28px] bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.1)]'>
        <div
          className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white'
          style={{ background: accentHex }}
        >
          ✓
        </div>
        <h2 className='dt-font-heading mb-2 text-[2rem] font-black text-[var(--dt-navy)]'>Request Sent!</h2>
        <p className='mb-6 text-[15px] leading-[1.75] text-[var(--dt-text-muted)]'>
          Your booking request for{' '}
          <strong>
            {svcLabel} — {optLabel}
          </strong>{' '}
          on <strong>{booking.date}</strong> at <strong>{booking.time}</strong> has been received. We&apos;ll contact{' '}
          <strong>{booking.email}</strong> within 1 business day to confirm.
        </p>
        <p className='mb-6 text-[14px] leading-[1.7] text-[var(--dt-text-muted)]'>
          Next, watch for waiver instructions — signing before you arrive keeps check-in fast.
          {isPartyBooking ? (
            <>
              {' '}
              For parties, you can forward the guest waiver link from your confirmation so other parents can sign ahead
              of time.
            </>
          ) : null}
        </p>
        <button
          type='button'
          onClick={onReset}
          className='cursor-pointer rounded-xl border-none px-7 py-3 text-[14px] font-bold text-white transition-opacity hover:opacity-90'
          style={{ background: accentHex }}
        >
          Make Another Booking
        </button>
        <a
          href='/'
          className='mt-3 block text-[13px] font-bold text-[var(--dt-text-muted)] no-underline hover:underline'
        >
          Return to Home
        </a>
      </div>
    </div>
  )
}
