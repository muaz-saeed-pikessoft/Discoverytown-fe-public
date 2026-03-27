'use client'

import { useForm } from 'react-hook-form'

import { BillingCycle } from '@/types/clients.shared'

interface PlanFormSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: { name: string; billingCycle: BillingCycle; price: string; description: string | null }) => void
}

export default function PlanFormSlideOver({ open, onOpenChange, onSubmit }: PlanFormSlideOverProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: '', billingCycle: BillingCycle.MONTHLY, price: '', description: '' },
  })
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex justify-end bg-black/30'>
      <div className='h-full w-full max-w-lg bg-white p-5 shadow-2xl'>
        <div className='text-lg font-black text-gray-900'>New Plan</div>
        <form
          className='mt-4 space-y-3'
          onSubmit={handleSubmit(v =>
            onSubmit({ name: v.name, billingCycle: v.billingCycle as BillingCycle, price: v.price, description: v.description || null })
          )}
        >
          <input {...register('name')} placeholder='Plan name' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <select {...register('billingCycle')} className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'>
            {Object.values(BillingCycle).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input {...register('price')} placeholder='Price' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <textarea {...register('description')} placeholder='Description' className='min-h-24 w-full rounded-xl border border-gray-200 p-3 text-sm font-semibold' />
          <div className='flex justify-end gap-2'>
            <button type='button' onClick={() => onOpenChange(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>Cancel</button>
            <button type='submit' className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

