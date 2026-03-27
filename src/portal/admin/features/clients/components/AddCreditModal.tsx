'use client'

import { useState } from 'react'

interface AddCreditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: { amount: number; reason: string }) => void
  isSubmitting?: boolean
}

export default function AddCreditModal({ open, onOpenChange, onSubmit, isSubmitting = false }: AddCreditModalProps) {
  const [amount, setAmount] = useState(1)
  const [reason, setReason] = useState('')

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-5 shadow-xl'>
        <div className='text-lg font-black text-gray-900'>Add Credit</div>
        <div className='mt-3 space-y-3'>
          <input
            type='number'
            min={1}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'
          />
          <input
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder='Reason'
            className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'
          />
        </div>
        <div className='mt-4 flex justify-end gap-2'>
          <button type='button' onClick={() => onOpenChange(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>
            Cancel
          </button>
          <button
            type='button'
            disabled={isSubmitting}
            onClick={() => onSubmit({ amount, reason })}
            className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white'
          >
            {isSubmitting ? 'Saving…' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

