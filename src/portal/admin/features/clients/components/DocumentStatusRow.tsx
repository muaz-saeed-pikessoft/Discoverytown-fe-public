'use client'

import StatusBadge from '@/components/shared/StatusBadge'
import type { DocumentSignatureStatus } from '@/types/clients.shared'

interface DocumentStatusRowProps {
  item: DocumentSignatureStatus
  onSendRequest?: () => void
  onSignNow?: () => void
}

export default function DocumentStatusRow({ item, onSendRequest, onSignNow }: DocumentStatusRowProps) {
  const signed = !!item.signature
  const status = signed ? (item.signature?.isValid ? 'active' : 'expired') : 'paused'
  const canSend = typeof onSendRequest === 'function'
  const canSign = typeof onSignNow === 'function'

  return (
    <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='min-w-0'>
        <div className='text-sm font-black text-gray-900'>{item.document.title}</div>
        <div className='mt-1 text-xs font-semibold text-gray-500'>
          {item.document.documentType} • v{item.document.version}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <StatusBadge status={status} variant='membership' />
        <button
          type='button'
          disabled={!canSend}
          onClick={() => (canSend ? onSendRequest() : undefined)}
          className={[
            'h-8 rounded-lg border px-2.5 text-xs font-black transition',
            canSend
              ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400 opacity-80',
          ].join(' ')}
        >
          Send Request
        </button>
        <button
          type='button'
          disabled={!canSign}
          onClick={() => (canSign ? onSignNow() : undefined)}
          className={[
            'h-8 rounded-lg px-2.5 text-xs font-black transition',
            canSign ? 'bg-blue-600 text-white hover:bg-blue-700' : 'cursor-not-allowed bg-gray-200 text-gray-500 opacity-80',
          ].join(' ')}
        >
          Sign Now
        </button>
      </div>
    </div>
  )
}

