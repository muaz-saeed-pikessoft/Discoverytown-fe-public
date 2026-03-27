'use client'

import type { CreditPackPurchase } from '@/types/clients.shared'

interface CreditPackProgressBarProps {
  pack: CreditPackPurchase
}

export default function CreditPackProgressBar({ pack }: CreditPackProgressBarProps) {
  const percent = pack.creditsPurchased > 0 ? Math.round((pack.creditsRemaining / pack.creditsPurchased) * 100) : 0
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex items-center justify-between gap-2'>
        <div className='text-sm font-black text-gray-900'>{pack.packDefinition.name}</div>
        <div className='text-xs font-black text-gray-600'>{pack.creditsRemaining}/{pack.creditsPurchased}</div>
      </div>
      <div className='mt-2 h-2 w-full rounded-full bg-gray-100'>
        <div className='h-2 rounded-full bg-blue-600 transition-all' style={{ width: `${percent}%` }} />
      </div>
      <div className='mt-2 text-xs font-semibold text-gray-500'>Expires {new Date(pack.expiresAt).toLocaleDateString()}</div>
    </div>
  )
}

