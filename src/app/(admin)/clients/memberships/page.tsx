'use client'

import { useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import PlanFormSlideOver from '@/portal/admin/features/clients/components/PlanFormSlideOver'
import { useCreatePlan, usePlans } from '@/portal/admin/features/clients/hooks/usePlans'
import StatusBadge from '@/components/shared/StatusBadge'

export default function AdminClientsMembershipsPage() {
  const { data: plans = [], isLoading } = usePlans()
  const createPlan = useCreatePlan()
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Memberships'
        subtitle='Manage active plans and renewals.'
        actions={
          <button type='button' onClick={() => setOpen(true)} className='h-10 rounded-xl bg-blue-600 px-3 text-xs font-black text-white'>
            New Plan
          </button>
        }
      />
      {isLoading ? (
        <div className='rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-500'>Loading plans…</div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {plans.map(plan => (
            <div key={plan.id} className='rounded-2xl border border-gray-200 bg-white p-4'>
              <div className='flex items-center justify-between gap-2'>
                <h3 className='text-sm font-black text-gray-900'>{plan.name}</h3>
                <StatusBadge status={plan.isActive ? 'active' : 'expired'} variant='membership' />
              </div>
              <div className='mt-2 text-xs font-semibold text-gray-500'>
                {plan.billingCycle} • ${plan.price}
              </div>
              <div className='mt-3 text-xs font-semibold text-gray-600'>{plan.description ?? 'No description'}</div>
            </div>
          ))}
        </div>
      )}
      <PlanFormSlideOver
        open={open}
        onOpenChange={setOpen}
        onSubmit={values => {
          createPlan.mutate({ ...values, benefits: {}, isActive: true })
          setOpen(false)
        }}
      />
    </div>
  )
}

