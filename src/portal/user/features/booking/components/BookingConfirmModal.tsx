'use client'

import type { ReactNode } from 'react'

interface BookingConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: ReactNode
}

export default function BookingConfirmModal({ open, onOpenChange, title = 'Confirm booking', children }: BookingConfirmModalProps) {
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-black/35' onClick={() => onOpenChange(false)} aria-hidden='true' />
      <div className='relative flex min-h-full items-center justify-center p-5'>
        <div className='w-full max-w-[720px] rounded-2xl border border-base-300 bg-base-100 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <div className='text-lg font-black text-base-content'>{title}</div>
              <div className='mt-1 text-sm font-semibold text-base-content/60'>Review details and confirm.</div>
            </div>
            <button
              type='button'
              onClick={() => onOpenChange(false)}
              className='h-9 w-9 rounded-xl border border-base-300 bg-base-100 text-sm font-black text-base-content/70 transition hover:bg-base-200'
              aria-label='Close'
            >
              ×
            </button>
          </div>

          <div className='mt-5'>{children}</div>
        </div>
      </div>
    </div>
  )
}

