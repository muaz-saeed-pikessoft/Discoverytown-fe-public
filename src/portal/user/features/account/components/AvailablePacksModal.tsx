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
      <div className='dt-surface w-full max-w-3xl rounded-[28px] border border-[var(--dt-border)] p-5 shadow-xl'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-black text-[var(--dt-navy)]'>Available Class Packs</h3>
          <button type='button' onClick={() => onOpenChange(false)} className='dt-btn-outline h-8 px-2.5 text-xs'>
            Close
          </button>
        </div>
        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          {packs.map(pack => (
            <div key={pack.id} className='dt-card-interactive rounded-[20px] p-4'>
              <div className='text-sm font-black text-[var(--dt-navy)]'>{pack.name}</div>
              <div className='mt-1 text-xs font-semibold text-[var(--dt-text-muted)]'>
                {pack.creditCount} credits • ${pack.price} • {pack.validityDays} days
              </div>
              <button
                type='button'
                onClick={() => onPurchase(pack.id)}
                className='dt-btn-primary mt-3 h-8 px-2.5 text-xs'
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

