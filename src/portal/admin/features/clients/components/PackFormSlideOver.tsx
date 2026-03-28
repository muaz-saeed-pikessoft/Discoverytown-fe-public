'use client'

import { useForm } from 'react-hook-form'

interface PackFormSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: {
    name: string
    creditCount: number
    price: string
    validityDays: number
    applicableServiceTypes: string[]
  }) => void
}

export default function PackFormSlideOver({ open, onOpenChange, onSubmit }: PackFormSlideOverProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: '', creditCount: 10, price: '', validityDays: 90, applicableServiceTypes: '' },
  })
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex justify-end bg-black/30'>
      <div className='h-full w-full max-w-lg bg-white p-5 shadow-2xl'>
        <div className='text-lg font-black text-gray-900'>New Class Pack</div>
        <form
          className='mt-4 space-y-3'
          onSubmit={handleSubmit(v =>
            onSubmit({
              name: v.name,
              creditCount: Number(v.creditCount),
              price: v.price,
              validityDays: Number(v.validityDays),
              applicableServiceTypes: String(v.applicableServiceTypes)
                .split(',')
                .map(s => s.trim())
                .filter(Boolean),
            })
          )}
        >
          <input {...register('name')} placeholder='Pack name' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input type='number' {...register('creditCount')} className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input {...register('price')} placeholder='Price' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input type='number' {...register('validityDays')} className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input
            {...register('applicableServiceTypes')}
            placeholder='Applicable service types (comma separated)'
            className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'
          />
          <div className='flex justify-end gap-2'>
            <button type='button' onClick={() => onOpenChange(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>Cancel</button>
            <button type='submit' className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

