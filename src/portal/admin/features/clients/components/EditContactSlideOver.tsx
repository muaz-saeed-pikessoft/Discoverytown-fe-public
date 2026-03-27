'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { ContactType, CommunicationChannel, type Contact, type CreateContactInput } from '@/types/clients.shared'

interface EditContactSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Contact | null
  onSubmit: (values: CreateContactInput) => void
}

export default function EditContactSlideOver({ open, onOpenChange, initial, onSubmit }: EditContactSlideOverProps) {
  const defaults = useMemo(
    () => ({
      contactType: initial?.contactType ?? ContactType.CUSTOMER,
      firstName: initial?.firstName ?? '',
      lastName: initial?.lastName ?? '',
      email: initial?.email ?? '',
      phone: initial?.phone ?? '',
      marketingOptIn: initial?.marketingOptIn ?? false,
      preferredChannel: initial?.preferredChannel ?? CommunicationChannel.EMAIL,
    }),
    [initial]
  )

  const { register, handleSubmit } = useForm({ defaultValues: defaults })

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex justify-end bg-black/30'>
      <div className='h-full w-full max-w-xl bg-white p-5 shadow-2xl'>
        <div className='text-lg font-black text-gray-900'>{initial ? 'Edit Contact' : 'New Contact'}</div>
        <form
          className='mt-4 space-y-3'
          onSubmit={handleSubmit(values =>
            onSubmit({
              contactType: values.contactType as ContactType,
              firstName: String(values.firstName),
              lastName: String(values.lastName),
              email: values.email ? String(values.email) : null,
              phone: values.phone ? String(values.phone) : null,
              dob: initial?.dob ?? null,
              gender: initial?.gender ?? null,
              address: initial?.address ?? null,
              referralSource: initial?.referralSource ?? null,
              metadata: initial?.metadata ?? {},
              marketingOptIn: !!values.marketingOptIn,
              preferredChannel: values.preferredChannel as CommunicationChannel,
            })
          )}
        >
          <select {...register('contactType')} className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'>
            {Object.values(ContactType).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input {...register('firstName')} placeholder='First name' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input {...register('lastName')} placeholder='Last name' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input {...register('email')} placeholder='Email' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <input {...register('phone')} placeholder='Phone' className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold' />
          <select {...register('preferredChannel')} className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'>
            {Object.values(CommunicationChannel).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className='flex items-center justify-between text-sm font-semibold text-gray-700'>
            Marketing opt-in
            <input type='checkbox' {...register('marketingOptIn')} />
          </label>
          <div className='flex justify-end gap-2 pt-2'>
            <button type='button' onClick={() => onOpenChange(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>
              Cancel
            </button>
            <button type='submit' className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

