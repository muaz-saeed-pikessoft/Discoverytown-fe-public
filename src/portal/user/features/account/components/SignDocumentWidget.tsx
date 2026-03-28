'use client'

import { useState } from 'react'

import SignatureCanvas from '@/components/shared/SignatureCanvas'

interface SignDocumentWidgetProps {
  title: string
  content: string
  onSubmit: (values: { signatureDataUrl: string; acceptedAt: string }) => void
}

export default function SignDocumentWidget({ title, content, onSubmit }: SignDocumentWidgetProps) {
  const [accepted, setAccepted] = useState(false)
  const [signature, setSignature] = useState('')

  return (
    <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-5 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Document</div>
          <div className='mt-2 text-[18px] font-black tracking-[-0.01em] text-[var(--dt-navy)]'>{title}</div>
        </div>
        <div className='rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-primary-light)] px-3 py-1.5 text-[12px] font-black text-[var(--dt-primary)]'>
          Required
        </div>
      </div>

      <div 
        className='mt-4 max-h-48 overflow-auto rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-4 text-[13px] font-semibold text-[var(--dt-text-body)] prose prose-sm'
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <label className='mt-4 flex items-center gap-3 rounded-2xl border border-[var(--dt-border)] bg-white px-4 py-3 text-[13px] font-bold text-[var(--dt-text-body)]'>
        <input
          type='checkbox'
          checked={accepted}
          onChange={e => setAccepted(e.target.checked)}
          className='h-5 w-5 accent-[var(--dt-primary)]'
        />
        I have read and agree to the document above
      </label>

      <div className='mt-4'>
        <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Signature</div>
        <div className='mt-2'>
          <SignatureCanvas onSave={setSignature} />
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
        <div className='text-[13px] font-semibold text-[var(--dt-text-muted)]'>
          {accepted && signature ? 'Ready to submit.' : 'Please accept and save your signature.'}
        </div>
        <button
          type='button'
          disabled={!accepted || !signature}
          onClick={() => onSubmit({ signatureDataUrl: signature, acceptedAt: new Date().toISOString() })}
          className='dt-btn-primary px-6 py-2.5 disabled:opacity-60'
        >
          Submit signature
        </button>
      </div>
    </div>
  )
}

