'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useId, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { createLocationSchema } from '@/lib/validations/admin/scheduling.validations'
import type { CreateLocationInput, Location } from '@/portal/admin/features/scheduling/types'
import OperatingHoursGrid, { type OperatingHoursValue } from '@/portal/admin/features/scheduling/components/OperatingHoursGrid'

type LocationFormValues = {
  name: string
  address: string | null
  city: string | null
  timezone: string | null
  phone: string | null
  email: string | null
  isActive: boolean
}

interface LocationFormSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Location | null
  onSubmit: (values: CreateLocationInput) => void | Promise<void>
  isSubmitting?: boolean
}

function parseOperatingHours(settings: Record<string, unknown> | undefined): OperatingHoursValue {
  const raw = (settings?.operatingHours ?? null) as unknown
  if (!raw || typeof raw !== 'object') return {}
  return raw as OperatingHoursValue
}

export default function LocationFormSlideOver({
  open,
  onOpenChange,
  initial = null,
  onSubmit,
  isSubmitting = false,
}: LocationFormSlideOverProps) {
  const titleId = useId()
  const descriptionId = useId()

  const defaultValues = useMemo<LocationFormValues>(
    () => ({
      name: initial?.name ?? '',
      address: initial?.address ?? null,
      city: initial?.city ?? null,
      timezone: initial?.timezone ?? null,
      phone: initial?.phone ?? null,
      email: initial?.email ?? null,
      isActive: initial?.isActive ?? true,
    }),
    [initial],
  )

  const [operatingHours, setOperatingHours] = useState<OperatingHoursValue>(() => parseOperatingHours(initial?.settings))

  useEffect(() => {
    if (!open) return
    setOperatingHours(parseOperatingHours(initial?.settings))
  }, [initial?.settings, open])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationFormValues>({
    resolver: yupResolver(createLocationSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!open) return
    reset(defaultValues)
  }, [defaultValues, open, reset])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div
        className='absolute inset-0 bg-black/35'
        onClick={() => (isSubmitting ? undefined : onOpenChange(false))}
        aria-hidden='true'
      />
      <div className='absolute inset-y-0 right-0 flex w-full max-w-[680px] flex-col bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]'>
        <div className='flex items-start justify-between gap-3 border-b border-gray-200 p-6'>
          <div>
            <h2 id={titleId} className='text-lg font-black text-gray-900'>
              {initial ? 'Edit location' : 'New location'}
            </h2>
            <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
              Configure contact details and operating hours.
            </p>
          </div>
          <button
            type='button'
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className='h-9 w-9 rounded-xl border border-gray-200 bg-white text-sm font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
            aria-label='Close'
          >
            ×
          </button>
        </div>

        <form
          className='flex-1 overflow-auto p-6'
          onSubmit={e => {
            e.preventDefault()
            void handleSubmit(values => {
              const payload: CreateLocationInput = {
                name: values.name,
                address: values.address,
                city: values.city,
                timezone: values.timezone,
                phone: values.phone,
                email: values.email,
                isActive: values.isActive,
                settings: { operatingHours },
              }
              return onSubmit(payload)
            })()
          }}
        >
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='loc-name'>
                Name
              </label>
              <input
                id='loc-name'
                {...register('name')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.name?.message ? <p className='mt-1 text-xs font-semibold text-red-600'>{errors.name.message}</p> : null}
            </div>

            <div className='sm:col-span-2'>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='loc-address'>
                Address
              </label>
              <input
                id='loc-address'
                {...register('address')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='loc-city'>
                City
              </label>
              <input
                id='loc-city'
                {...register('city')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='loc-timezone'>
                Timezone
              </label>
              <input
                id='loc-timezone'
                {...register('timezone')}
                placeholder='e.g. America/New_York'
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='loc-phone'>
                Phone
              </label>
              <input
                id='loc-phone'
                {...register('phone')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='loc-email'>
                Email
              </label>
              <input
                id='loc-email'
                {...register('email')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.email?.message ? <p className='mt-1 text-xs font-semibold text-red-600'>{errors.email.message}</p> : null}
            </div>

            <div className='sm:col-span-2'>
              <label className='flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
                <span className='text-sm font-black text-gray-900'>Active</span>
                <input type='checkbox' {...register('isActive')} className='h-4 w-4 rounded border-gray-300' />
              </label>
            </div>

            <div className='sm:col-span-2'>
              <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Operating hours</div>
              <OperatingHoursGrid value={operatingHours} onChange={setOperatingHours} className='mt-2' />
            </div>
          </div>
        </form>

        <div className='flex items-center justify-end gap-2 border-t border-gray-200 p-6'>
          <button
            type='button'
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            type='button'
            disabled={isSubmitting}
            onClick={() => void handleSubmit(values => {
              const payload: CreateLocationInput = {
                name: values.name,
                address: values.address,
                city: values.city,
                timezone: values.timezone,
                phone: values.phone,
                email: values.email,
                isActive: values.isActive,
                settings: { operatingHours },
              }
              return onSubmit(payload)
            })()}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? 'Saving…' : 'Save location'}
          </button>
        </div>
      </div>
    </div>
  )
}

