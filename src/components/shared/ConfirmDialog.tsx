'use client'

import type { ReactNode } from 'react'
import { useEffect, useId } from 'react'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void | Promise<void>
  isLoading?: boolean
  children?: ReactNode
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
}: ConfirmDialogProps) {
  const titleId = useId()
  const descriptionId = useId()

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
          className='w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
        >
          <div>
            <h2 id={titleId} className='text-lg font-black text-gray-900'>
              {title}
            </h2>
            <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
              {description}
            </p>
          </div>

          <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {cancelLabel}
            </button>
            <button
              type='button'
              disabled={isLoading}
              onClick={() => void onConfirm()}
              className='h-10 rounded-xl bg-red-600 px-4 text-xs font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isLoading ? (
                <span className='inline-flex items-center gap-2'>
                  <span className='h-[14px] w-[14px] animate-spin rounded-full border-2 border-white/40 border-t-white' />
                  Working...
                </span>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

