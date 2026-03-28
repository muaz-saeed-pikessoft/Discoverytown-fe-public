'use client'

import { useEffect, useId, useState } from 'react'

interface CancelSlotModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => void | Promise<void>
  isLoading?: boolean
  title?: string
}

export default function CancelSlotModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  title = 'Cancel session',
}: CancelSlotModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!open) setReason('')
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

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
          className='w-full max-w-[560px] rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
        >
          <div>
            <h2 id={titleId} className='text-lg font-black text-gray-900'>
              {title}
            </h2>
            <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
              Provide a reason so your staff have context and customers can be informed if needed.
            </p>
          </div>

          <div className='mt-5'>
            <label htmlFor='cancel-slot-reason' className='text-xs font-black uppercase tracking-widest text-gray-500'>
              Reason
            </label>
            <textarea
              id='cancel-slot-reason'
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder='e.g. Instructor unavailable'
              rows={4}
              className='mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
            />
          </div>

          <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              Keep session
            </button>
            <button
              type='button'
              disabled={isLoading || reason.trim().length === 0}
              onClick={() => void onConfirm(reason.trim())}
              className='h-10 rounded-xl bg-red-600 px-4 text-xs font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isLoading ? (
                <span className='inline-flex items-center gap-2'>
                  <span className='h-[14px] w-[14px] animate-spin rounded-full border-2 border-white/40 border-t-white' />
                  Cancelling...
                </span>
              ) : (
                'Cancel session'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

