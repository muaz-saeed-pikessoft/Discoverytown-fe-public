'use client'

import type { CreditPackPurchase } from '@/types/clients.shared'

interface CreditPackCardProps {
  pack: CreditPackPurchase
}

export default function CreditPackCard({ pack }: CreditPackCardProps) {
  const percent = pack.creditsPurchased > 0 ? Math.round((pack.creditsRemaining / pack.creditsPurchased) * 100) : 0
  return (
    <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-5 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Active pack</div>
          <div className='mt-2 text-[16px] font-black text-[var(--dt-navy)]'>{pack.packDefinition.name}</div>
        </div>
        <div className='rounded-2xl bg-[var(--dt-blue-mid-light)] px-3 py-1.5 text-[12px] font-black text-[var(--dt-primary)]'>
          {percent}%
        </div>
      </div>

      <div className='mt-4'>
        <div className='h-2 w-full rounded-full bg-[rgba(15,29,53,0.08)]'>
          <div className='h-2 rounded-full bg-[var(--dt-primary)]' style={{ width: `${percent}%` }} />
        </div>
        <div className='mt-3 text-[13px] font-semibold text-[var(--dt-text-body)]'>
          <span className='font-black text-[var(--dt-navy)]'>
            {pack.creditsRemaining}/{pack.creditsPurchased}
          </span>{' '}
          credits left
          <span className='mx-2 text-[var(--dt-text-subtle)]'>•</span>
          Expires <span className='font-bold'>{new Date(pack.expiresAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

