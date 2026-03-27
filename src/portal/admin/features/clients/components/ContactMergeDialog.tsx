'use client'

import { useState } from 'react'

interface ContactMergeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sourceLabel: string
  targetLabel: string
  onConfirm: () => void
}

export default function ContactMergeDialog({ open, onOpenChange, sourceLabel, targetLabel, onConfirm }: ContactMergeDialogProps) {
  const [text, setText] = useState('')
  if (!open) return null
  const valid = text.trim().toUpperCase() === 'MERGE'
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-5 shadow-xl'>
        <div className='text-lg font-black text-gray-900'>Merge Contacts</div>
        <p className='mt-2 text-sm font-semibold text-gray-600'>
          Merge <strong>{sourceLabel}</strong> into <strong>{targetLabel}</strong>. This cannot be undone.
        </p>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Type MERGE to confirm'
          className='mt-3 h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'
        />
        <div className='mt-4 flex justify-end gap-2'>
          <button type='button' onClick={() => onOpenChange(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>Cancel</button>
          <button type='button' disabled={!valid} onClick={onConfirm} className='h-9 rounded-lg bg-red-600 px-3 text-xs font-black text-white disabled:opacity-60'>
            Merge
          </button>
        </div>
      </div>
    </div>
  )
}

