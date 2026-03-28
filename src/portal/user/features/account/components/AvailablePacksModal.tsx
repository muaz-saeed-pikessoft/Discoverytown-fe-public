'use client'

import type { CreditPackDefinition } from '@/types/clients.shared'

interface AvailablePacksModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packs: CreditPackDefinition[]
  onPurchase: (packDefinitionId: string) => void
}

export default function AvailablePacksModal({ open, onOpenChange, packs, onPurchase }: AvailablePacksModalProps) {
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4'>
      <div className='w-full max-w-3xl rounded-2xl bg-white p-5 shadow-xl'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-black text-gray-900'>Available Class Packs</h3>
          <button type='button' onClick={() => onOpenChange(false)} className='h-8 rounded-lg border border-gray-200 px-2.5 text-xs font-black text-gray-700'>
            Close
          </button>
        </div>
        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          {packs.map(pack => (
            <div key={pack.id} className='rounded-2xl border border-gray-200 p-4'>
              <div className='text-sm font-black text-gray-900'>{pack.name}</div>
              <div className='mt-1 text-xs font-semibold text-gray-600'>
                {pack.creditCount} credits • ${pack.price} • {pack.validityDays} days
              </div>
              <button
                type='button'
                onClick={() => onPurchase(pack.id)}
                className='mt-3 h-8 rounded-lg bg-blue-600 px-2.5 text-xs font-black text-white'
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

