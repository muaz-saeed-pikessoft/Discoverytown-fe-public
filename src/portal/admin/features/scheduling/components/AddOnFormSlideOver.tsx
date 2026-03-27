'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useId, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type * as yup from 'yup'

import { createAddOnSchema } from '@/lib/validations/admin/scheduling.validations'
import type { AddOn, BookingType, CreateAddOnInput } from '@/portal/admin/features/scheduling/types'
import { AddOnPricingType, BookingType as BookingTypeEnum } from '@/portal/admin/features/scheduling/types'

type AddOnFormValues = yup.InferType<typeof createAddOnSchema>

interface AddOnFormSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: AddOn | null
  onSubmit: (values: CreateAddOnInput) => void | Promise<void>
  isSubmitting?: boolean
}

export default function AddOnFormSlideOver({
  open,
  onOpenChange,
  initial = null,
  onSubmit,
  isSubmitting = false,
}: AddOnFormSlideOverProps) {
  const titleId = useId()
  const descriptionId = useId()

  const defaultValues = useMemo<AddOnFormValues>(
    () => ({
      name: initial?.name ?? '',
      pricingType: initial?.pricingType ?? AddOnPricingType.FLAT,
      price: initial?.price ?? '0.00',
      applicableBookingTypes: initial?.applicableBookingTypes ?? [BookingTypeEnum.CLASS],
      isActive: initial?.isActive ?? true,
    }),
    [initial],
  )

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddOnFormValues>({
    resolver: yupResolver(createAddOnSchema),
    defaultValues,
  })

  const selectedTypes = watch('applicableBookingTypes') ?? []

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

  function toggleBookingType(t: BookingType) {
    const cleaned = selectedTypes.filter((x): x is BookingType => x !== undefined)
    const next = cleaned.includes(t) ? cleaned.filter(x => x !== t) : [...cleaned, t]
    setValue('applicableBookingTypes', next, { shouldDirty: true, shouldValidate: true })
  }

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div
        className='absolute inset-0 bg-black/35'
        onClick={() => (isSubmitting ? undefined : onOpenChange(false))}
        aria-hidden='true'
      />
      <div className='absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]'>
        <div className='flex items-start justify-between gap-3 border-b border-gray-200 p-6'>
          <div>
            <h2 id={titleId} className='text-lg font-black text-gray-900'>
              {initial ? 'Edit add-on' : 'New add-on'}
            </h2>
            <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
              Add-ons can be attached to bookings and priced per booking, per person, or per hour.
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
              const cleanedTypes = values.applicableBookingTypes.filter((t): t is BookingType => t !== undefined)
              const payload: CreateAddOnInput = {
                name: values.name,
                pricingType: values.pricingType,
                price: values.price,
                applicableBookingTypes: cleanedTypes,
                isActive: values.isActive,
              }
              return onSubmit(payload)
            })()
          }}
        >
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='addon-name'>
                Name
              </label>
              <input
                id='addon-name'
                {...register('name')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.name?.message ? <p className='mt-1 text-xs font-semibold text-red-600'>{errors.name.message}</p> : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='addon-pricing-type'>
                Pricing type
              </label>
              <select
                id='addon-pricing-type'
                {...register('pricingType')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              >
                <option value='FLAT'>Flat</option>
                <option value='PER_PERSON'>Per person</option>
                <option value='PER_HOUR'>Per hour</option>
              </select>
              {errors.pricingType?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.pricingType.message)}</p>
              ) : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='addon-price'>
                Price
              </label>
              <input
                id='addon-price'
                {...register('price')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.price?.message ? <p className='mt-1 text-xs font-semibold text-red-600'>{errors.price.message}</p> : null}
            </div>

            <div className='sm:col-span-2'>
              <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Applicable booking types</div>
              <div className='mt-2 flex flex-wrap gap-2'>
                {Object.values(BookingTypeEnum).map(t => {
                  const selected = selectedTypes.includes(t)
                  return (
                    <button
                      key={t}
                      type='button'
                      onClick={() => toggleBookingType(t)}
                      className={`h-9 rounded-full border px-3 text-xs font-black transition ${
                        selected
                          ? 'border-blue-200 bg-blue-50 text-blue-800'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
              {errors.applicableBookingTypes?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.applicableBookingTypes.message)}</p>
              ) : null}
            </div>

            <div className='sm:col-span-2'>
              <label className='flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
                <span className='text-sm font-black text-gray-900'>Active</span>
                <input type='checkbox' {...register('isActive')} className='h-4 w-4 rounded border-gray-300' />
              </label>
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
              const cleanedTypes = values.applicableBookingTypes.filter((t): t is BookingType => t !== undefined)
              const payload: CreateAddOnInput = {
                name: values.name,
                pricingType: values.pricingType,
                price: values.price,
                applicableBookingTypes: cleanedTypes,
                isActive: values.isActive,
              }
              return onSubmit(payload)
            })()}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? 'Saving…' : 'Save add-on'}
          </button>
        </div>
      </div>
    </div>
  )
}

