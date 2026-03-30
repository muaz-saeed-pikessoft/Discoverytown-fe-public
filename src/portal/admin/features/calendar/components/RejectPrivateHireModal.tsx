'use client'

import { useEffect, useId, useState } from 'react'

interface RejectPrivateHireModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (input: { reason: string }) => void | Promise<void>
  isLoading?: boolean
}

export default function RejectPrivateHireModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: RejectPrivateHireModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const [reason, setReason] = useState('')

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  const canSubmit = reason.trim().length > 0

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
          className='w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
        >
          <h2 id={titleId} className='text-lg font-black text-gray-900'>
            Reject request
          </h2>
          <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
            A clear reason helps the guest understand the decision.
          </p>

          <div className='mt-5'>
            <label htmlFor='ph-reason' className='text-xs font-black uppercase tracking-widest text-gray-500'>
              Reason (required)
            </label>
            <textarea
              id='ph-reason'
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              className='mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900'
            />
          </div>

          <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 hover:bg-gray-50 disabled:opacity-60'
            >
              Cancel
            </button>
            <button
              type='button'
              disabled={isLoading || !canSubmit}
              onClick={() => void onConfirm({ reason: reason.trim() })}
              className='h-10 rounded-xl bg-red-600 px-4 text-xs font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isLoading ? 'Working…' : 'Confirm rejection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
