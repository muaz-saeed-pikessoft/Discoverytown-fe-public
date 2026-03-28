'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import PageHeader from '@/components/shared/PageHeader'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import { ROUTES } from '@/constants/routes'
import { usePublicSlot } from '@/portal/user/features/booking/hooks/usePublicSlot'
import { useCreateBooking, useJoinWaitlist } from '@/portal/user/features/booking/hooks/useBookingMutations'

export default function BookingConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const slotId = searchParams?.get('slotId') ?? null
  const waitlist = (searchParams?.get('waitlist') ?? '') === '1'

  const slotQuery = usePublicSlot(slotId)
  const createBooking = useCreateBooking()
  const joinWaitlist = useJoinWaitlist()

  const slot = slotQuery.data ?? null

  const title = useMemo(() => {
    if (!slot) return 'Confirm booking'
    return slot.service.name
  }, [slot])

  return (
    <div className='min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#EEF4FF_0%,#FFF6EE_100%)] dt-font-body'>
      <div className='dt-container py-8'>
        <div className='space-y-6'>
          <PageHeader title={title} subtitle='Review details and confirm.' />

          {slotQuery.isLoading ? (
            <LoadingSkeleton variant='page' />
          ) : slotQuery.isError ? (
            <ErrorState title='Failed to load session' onRetry={() => void slotQuery.refetch()} />
          ) : !slot ? (
            <EmptyState title='Missing session' description='Please select a session again.' />
          ) : (
            <div className='grid gap-6 lg:grid-cols-[1.35fr_1fr]'>
              <div className='rounded-[28px] border border-black/[0.06] bg-white/90 p-6 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Order summary</div>
                <div className='mt-2 text-2xl font-black tracking-[-0.02em] text-[var(--dt-navy)] dt-font-heading'>
                  {slot.service.name}
                </div>
                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                  <div className='rounded-[18px] bg-[var(--dt-bg-page)] px-4 py-3'>
                    <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>When</div>
                    <div className='mt-1 text-sm font-semibold text-[var(--dt-navy)]'>
                      {new Date(slot.startAt).toLocaleString()} – {new Date(slot.endAt).toLocaleString()}
                    </div>
                  </div>
                  <div className='rounded-[18px] bg-[var(--dt-bg-page)] px-4 py-3'>
                    <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Where</div>
                    <div className='mt-1 text-sm font-semibold text-[var(--dt-navy)]'>{slot.location.name}</div>
                  </div>
                  <div className='rounded-[18px] bg-[var(--dt-bg-page)] px-4 py-3'>
                    <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Price</div>
                    <div className='mt-1 text-lg font-black text-[var(--dt-navy)]'>${slot.effectivePrice}</div>
                  </div>
                  <div className='rounded-[18px] bg-[var(--dt-bg-page)] px-4 py-3'>
                    <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Availability</div>
                    <div className='mt-1 text-sm font-semibold text-[var(--dt-navy)]'>
                      {slot.availableSpots <= 0 ? 'Full' : `${slot.availableSpots} spots left`}
                    </div>
                  </div>
                </div>

                <div className='mt-5 rounded-[18px] border border-[var(--dt-border)] bg-white p-4 text-sm font-semibold text-[var(--dt-text-body)]/75'>
                  Payment is stubbed for now (no Stripe). Confirming will create a booking record (mock/backend required).
                </div>
              </div>

              <div className='lg:sticky lg:top-6 h-fit rounded-[28px] border border-black/[0.06] bg-white/90 p-6 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>
                  {waitlist ? 'Waitlist' : 'Confirm'}
                </div>
                <div className='mt-2 text-lg font-black text-[var(--dt-navy)] dt-font-heading'>
                  {waitlist ? 'Join the waitlist' : 'Confirm your booking'}
                </div>

                <div className='mt-4 flex flex-col gap-2'>
                  <button
                    type='button'
                    onClick={() => router.push(ROUTES.USER.ACTIVITIES)}
                    className='h-11 rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-sm font-black text-[var(--dt-navy)] transition hover:bg-[var(--dt-bg-page)]'
                  >
                    Back
                  </button>
                  <button
                    type='button'
                    disabled={createBooking.isPending || joinWaitlist.isPending}
                    onClick={async () => {
                      if (waitlist) {
                        await joinWaitlist.mutateAsync(slot.id)
                        router.push(ROUTES.USER.ACTIVITIES)
                        return
                      }
                      const booking = await createBooking.mutateAsync({ slotId: slot.id })
                      router.push(`${ROUTES.USER.BOOKING_SUCCESS}?bookingId=${encodeURIComponent(booking.id)}`)
                    }}
                    className='dt-btn-primary h-11 disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    {waitlist ? 'Join waitlist' : createBooking.isPending ? 'Confirming…' : 'Confirm booking'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

