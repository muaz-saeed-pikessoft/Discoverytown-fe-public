'use client'

import { useEffect, useId, useMemo, useState } from 'react'

export type AdminRefundType = 'FULL' | 'PARTIAL' | 'NONE'

interface CancelBookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (input: { reason: string; refundType: AdminRefundType; refundAmount?: number }) => void | Promise<void>
  isLoading?: boolean
  maxRefundAmount?: number
}

export default function CancelBookingModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  maxRefundAmount,
}: CancelBookingModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const [reason, setReason] = useState('')
  const [refundType, setRefundType] = useState<AdminRefundType>('NONE')
  const [refundAmount, setRefundAmount] = useState<string>('')

  useEffect(() => {
    if (!open) {
      setReason('')
      setRefundType('NONE')
      setRefundAmount('')
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const refundAmountNumber = useMemo(() => {
    if (refundType !== 'PARTIAL') return undefined
    const n = Number(refundAmount)
    if (!Number.isFinite(n)) return undefined
    if (n < 0) return undefined
    return n
  }, [refundAmount, refundType])

  const canSubmit =
    reason.trim().length > 0 &&
    (refundType !== 'PARTIAL' ||
      (refundAmountNumber !== undefined && (maxRefundAmount === undefined || refundAmountNumber <= maxRefundAmount)))

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div
        className='absolute inset-0 bg-black/35'
        onClick={() => (isLoading ? undefined : onOpenChange(false))}
        aria-hidden='true'
      />
      <div className='relative flex min-h-full items-center justify-center p-5'>
        <div
          role='dialog'
          aria-modal='true'
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className='w-full max-w-[640px] rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
        >
          <div>
            <h2 id={titleId} className='text-lg font-black text-gray-900'>
              Cancel booking
            </h2>
            <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
              This marks the booking as cancelled. Refund behavior depends on your backend/payment provider setup.
            </p>
          </div>

          <div className='mt-5 grid gap-4 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label htmlFor='cancel-booking-reason' className='text-xs font-black uppercase tracking-widest text-gray-500'>
                Reason
              </label>
              <textarea
                id='cancel-booking-reason'
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder='e.g. Customer requested cancellation'
                rows={3}
                className='mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='cancel-booking-refund-type'>
                Refund type
              </label>
              <select
                id='cancel-booking-refund-type'
                value={refundType}
                onChange={e => setRefundType(e.target.value as AdminRefundType)}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              >
                <option value='NONE'>No refund</option>
                <option value='FULL'>Full refund</option>
                <option value='PARTIAL'>Partial refund</option>
              </select>
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='cancel-booking-refund-amount'>
                Refund amount
              </label>
              <input
                id='cancel-booking-refund-amount'
                value={refundAmount}
                onChange={e => setRefundAmount(e.target.value)}
                disabled={refundType !== 'PARTIAL'}
                inputMode='decimal'
                placeholder={maxRefundAmount !== undefined ? `Max ${maxRefundAmount}` : 'e.g. 10.00'}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400'
              />
              {refundType === 'PARTIAL' && maxRefundAmount !== undefined ? (
                <p className='mt-1 text-xs font-semibold text-gray-500'>Max refundable: {maxRefundAmount}</p>
              ) : null}
            </div>
          </div>

          <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              Keep booking
            </button>
            <button
              type='button'
              disabled={isLoading || !canSubmit}
              onClick={() =>
                void onConfirm({
                  reason: reason.trim(),
                  refundType,
                  refundAmount: refundType === 'PARTIAL' ? refundAmountNumber : undefined,
                })
              }
              className='h-10 rounded-xl bg-red-600 px-4 text-xs font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isLoading ? (
                <span className='inline-flex items-center gap-2'>
                  <span className='h-[14px] w-[14px] animate-spin rounded-full border-2 border-white/40 border-t-white' />
                  Cancelling...
                </span>
              ) : (
                'Cancel booking'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

