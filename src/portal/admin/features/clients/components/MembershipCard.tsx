'use client'

import StatusBadge from '@/components/shared/StatusBadge'
import type { SubscriptionWithPlan } from '@/types/clients.shared'

interface MembershipCardProps {
  subscription: SubscriptionWithPlan
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
}

export default function MembershipCard({ subscription, onPause, onResume, onCancel }: MembershipCardProps) {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-5'>
      <div className='flex flex-wrap items-center gap-2'>
        <h3 className='text-lg font-black text-gray-900'>{subscription.plan.name}</h3>
        <StatusBadge status={subscription.status.toLowerCase()} variant='membership' />
      </div>
      <div className='mt-2 text-sm font-semibold text-gray-600'>
        {subscription.plan.billingCycle} • ${subscription.plan.price}
      </div>
      <div className='mt-3 text-xs font-semibold text-gray-500'>
        Period: {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        <button type='button' onClick={onPause} className='h-8 rounded-lg border border-gray-200 px-2.5 text-xs font-black text-gray-700'>
          Pause
        </button>
        <button type='button' onClick={onResume} className='h-8 rounded-lg border border-gray-200 px-2.5 text-xs font-black text-gray-700'>
          Resume
        </button>
        <button type='button' onClick={onCancel} className='h-8 rounded-lg bg-red-600 px-2.5 text-xs font-black text-white'>
          Cancel
        </button>
      </div>
    </div>
  )
}

