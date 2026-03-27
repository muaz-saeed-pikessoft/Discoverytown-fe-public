'use client'

import { useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import PackFormSlideOver from '@/portal/admin/features/clients/components/PackFormSlideOver'
import { useCreateCreditPackDefinition, useCreditPackDefinitions } from '@/portal/admin/features/clients/hooks/useCredits'

export default function AdminClientsClassPacksPage() {
  const { data: packs = [], isLoading } = useCreditPackDefinitions()
  const createPack = useCreateCreditPackDefinition()
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Class packs'
        subtitle='Manage class pack products and balances.'
        actions={
          <button type='button' onClick={() => setOpen(true)} className='h-10 rounded-xl bg-blue-600 px-3 text-xs font-black text-white'>
            New Pack
          </button>
        }
      />
      {isLoading ? (
        <div className='rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-500'>Loading packs…</div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {packs.map(pack => (
            <div key={pack.id} className='rounded-2xl border border-gray-200 bg-white p-4'>
              <div className='text-sm font-black text-gray-900'>{pack.name}</div>
              <div className='mt-2 text-xs font-semibold text-gray-500'>
                {pack.creditCount} credits • ${pack.price} • {pack.validityDays} days
              </div>
              <div className='mt-2 flex flex-wrap gap-1'>
                {pack.applicableServiceTypes.map(type => (
                  <span key={type} className='rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-700'>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <PackFormSlideOver
        open={open}
        onOpenChange={setOpen}
        onSubmit={values => {
          createPack.mutate({ ...values, isActive: true })
          setOpen(false)
        }}
      />
    </div>
  )
}

