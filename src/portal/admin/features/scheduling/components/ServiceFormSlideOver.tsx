'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useId, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createServiceSchema } from '@/lib/validations/admin/scheduling.validations'
import type { Service, ServiceCategory } from '@/portal/admin/features/scheduling/types'
import { ServiceType } from '@/portal/admin/features/scheduling/types'

const toNullableNumber = () =>
  yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === '' || originalValue == null) return null
      return Number.isFinite(value) ? value : null
    })
    .nullable()

const serviceFormSchema = createServiceSchema.shape({
  bookingMode: yup
    .mixed<'SCHEDULED' | 'OPEN'>()
    .oneOf(['SCHEDULED', 'OPEN'], 'Select a booking mode')
    .required('Select a booking mode'),
  maxConcurrent: toNullableNumber().when('bookingMode', {
    is: 'OPEN',
    then: schema => schema.integer().min(1, 'Required for open booking').required('Required for open booking'),
  }),
  minDurationMinutes: toNullableNumber().when('bookingMode', {
    is: 'OPEN',
    then: schema => schema.integer().min(15, 'Minimum 15 minutes').required('Minimum duration required'),
  }),
  maxDurationMinutes: toNullableNumber().when('bookingMode', {
    is: 'OPEN',
    then: schema => schema.integer().min(15, 'Minimum 15 minutes'),
  }),
  slotIncrementMinutes: toNullableNumber().when('bookingMode', {
    is: 'OPEN',
    then: schema => schema.integer().min(1, 'Increment required').required('Increment required'),
  }),
  minAdvanceHours: toNullableNumber().when('bookingMode', {
    is: 'OPEN',
    then: schema => schema.integer().min(0, 'Must be 0 or more').required('Required'),
  }),
  maxAdvanceHours: toNullableNumber().when('bookingMode', {
    is: 'OPEN',
    then: schema => schema.integer().min(1, 'Must be at least 1').required('Required'),
  }),
}).test('max-duration', 'Max duration must be ≥ min duration', value => {
  if (!value) return true
  if (value.bookingMode !== 'OPEN') return true
  if (value.maxDurationMinutes == null) return true
  if (value.minDurationMinutes == null) return true
  return value.maxDurationMinutes >= value.minDurationMinutes
})

type ServiceFormValues = yup.Asserts<typeof serviceFormSchema>

interface ServiceFormSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: ServiceCategory[]
  initial?: Service | null
  onSubmit: (values: ServiceFormValues) => void | Promise<void>
  isSubmitting?: boolean
  title?: string
}

export default function ServiceFormSlideOver({
  open,
  onOpenChange,
  categories,
  initial = null,
  onSubmit,
  isSubmitting = false,
  title,
}: ServiceFormSlideOverProps) {
  const titleId = useId()
  const descriptionId = useId()

  const defaultValues = useMemo<ServiceFormValues>(
    () => ({
      categoryId: initial?.categoryId ?? '',
      serviceType: initial?.serviceType ?? ServiceType.OPEN_PLAY,
      bookingMode: (initial as any)?.bookingMode ?? ('' as unknown as ServiceFormValues['bookingMode']),
      name: initial?.name ?? '',
      description: initial?.description ?? null,
      durationMinutes: initial?.durationMinutes ?? 60,
      capacity: initial?.capacity ?? 1,
      basePrice: initial?.basePrice ?? '0.00',
      subscriptionPrice: initial?.subscriptionPrice ?? null,
      requiresWaiver: initial?.requiresWaiver ?? false,
      ageMin: initial?.ageMin ?? null,
      ageMax: initial?.ageMax ?? null,
      isActive: initial?.isActive ?? true,
      maxConcurrent: (initial as any)?.maxConcurrent ?? null,
      minDurationMinutes: (initial as any)?.minDurationMinutes ?? null,
      maxDurationMinutes: (initial as any)?.maxDurationMinutes ?? null,
      slotIncrementMinutes: (initial as any)?.slotIncrementMinutes ?? 30,
      minAdvanceHours: (initial as any)?.minAdvanceHours ?? 0,
      maxAdvanceHours: (initial as any)?.maxAdvanceHours ?? 720,
    }),
    [initial],
  )

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: yupResolver(serviceFormSchema) as unknown as any,
    defaultValues,
  })

  const bookingMode = watch('bookingMode')
  const openDurationOptions = useMemo(() => {
    const options: Array<{ value: number; label: string }> = []
    for (let minutes = 30; minutes <= 8 * 60; minutes += 15) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      const label = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
      options.push({ value: minutes, label })
    }
    return options
  }, [])

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

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a short description…',
      }),
    ],
    content: defaultValues.description ?? '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none min-h-[140px]',
      },
    },
  })

  useEffect(() => {
    if (!open) return
    editor?.commands.setContent(defaultValues.description ?? '')
  }, [defaultValues.description, editor, open])

  useEffect(() => {
    if (!open || !editor) return
    const onUpdate = () => {
      setValue('description', editor.getHTML(), { shouldDirty: true })
    }

    editor.on('update', onUpdate)
    return () => {
      editor.off('update', onUpdate)
    }
  }, [editor, open, setValue])

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
              {title ?? (initial ? 'Edit service' : 'New service')}
            </h2>
            <p id={descriptionId} className='mt-1 text-sm text-gray-600'>
              Configure pricing, capacity, and booking rules.
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
            void handleSubmit(values => onSubmit(values))()
          }}
        >
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-name'>
                Name
              </label>
              <input
                id='service-name'
                {...register('name')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.name?.message ? <p className='mt-1 text-xs font-semibold text-red-600'>{errors.name.message}</p> : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-type'>
                Service type
              </label>
              <select
                id='service-type'
                {...register('serviceType')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              >
                {Object.values(ServiceType).map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.serviceType?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.serviceType.message)}</p>
              ) : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-booking-mode'>
                Booking mode
              </label>
              <select
                id='service-booking-mode'
                {...register('bookingMode')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              >
                <option value='' disabled>
                  Select booking mode…
                </option>
                <option value='SCHEDULED'>Scheduled sessions</option>
                <option value='OPEN'>Open booking</option>
              </select>
              {errors.bookingMode?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.bookingMode.message)}</p>
              ) : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-category'>
                Category
              </label>
              <select
                id='service-category'
                {...register('categoryId')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              >
                <option value='' disabled>
                  Select category…
                </option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{errors.categoryId.message}</p>
              ) : null}
            </div>

            <div className='sm:col-span-2'>
              <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Description</div>
              <input type='hidden' {...register('description')} />
              <EditorContent editor={editor} />
              {errors.description?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.description.message)}</p>
              ) : null}
            </div>

            {bookingMode === 'SCHEDULED' ? (
              <>
                <div>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-duration'>
                    Duration (minutes)
                  </label>
                  <input
                    id='service-duration'
                    type='number'
                    {...register('durationMinutes', { valueAsNumber: true })}
                    className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                  />
                  {errors.durationMinutes?.message ? (
                    <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.durationMinutes.message)}</p>
                  ) : null}
                </div>

                <div>
                  <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-capacity'>
                    Capacity
                  </label>
                  <input
                    id='service-capacity'
                    type='number'
                    {...register('capacity', { valueAsNumber: true })}
                    className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                  />
                  {errors.capacity?.message ? (
                    <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.capacity.message)}</p>
                  ) : null}
                </div>
              </>
            ) : null}

            {bookingMode === 'OPEN' ? (
              <div className='sm:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
                <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Open booking settings</div>
                <div className='mt-3 grid gap-4 sm:grid-cols-2'>
                  <div>
                    <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-max-concurrent'>
                      Max concurrent
                    </label>
                    <input
                      id='service-max-concurrent'
                      type='number'
                      {...register('maxConcurrent')}
                      className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                    />
                    {errors.maxConcurrent?.message ? (
                      <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.maxConcurrent.message)}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-slot-increment'>
                      Slot increment (min)
                    </label>
                    <input
                      id='service-slot-increment'
                      type='number'
                      {...register('slotIncrementMinutes')}
                      className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                    />
                    {errors.slotIncrementMinutes?.message ? (
                      <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.slotIncrementMinutes.message)}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-min-duration'>
                      Min duration (hh:mm)
                    </label>
                    <select
                      id='service-min-duration'
                      {...register('minDurationMinutes', {
                        setValueAs: value => (value === '' ? null : Number(value)),
                      })}
                      className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                    >
                      <option value=''>Select duration…</option>
                      {openDurationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.minDurationMinutes?.message ? (
                      <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.minDurationMinutes.message)}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-max-duration'>
                      Max duration (hh:mm)
                    </label>
                    <select
                      id='service-max-duration'
                      {...register('maxDurationMinutes', {
                        setValueAs: value => (value === '' ? null : Number(value)),
                      })}
                      className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                    >
                      <option value=''>No maximum</option>
                      {openDurationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.maxDurationMinutes?.message ? (
                      <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.maxDurationMinutes.message)}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-min-advance'>
                      Min advance (hours)
                    </label>
                    <input
                      id='service-min-advance'
                      type='number'
                      {...register('minAdvanceHours')}
                      className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                    />
                    {errors.minAdvanceHours?.message ? (
                      <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.minAdvanceHours.message)}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-max-advance'>
                      Max advance (hours)
                    </label>
                    <input
                      id='service-max-advance'
                      type='number'
                      {...register('maxAdvanceHours')}
                      className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                    />
                    {errors.maxAdvanceHours?.message ? (
                      <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.maxAdvanceHours.message)}</p>
                    ) : null}
                  </div>
                </div>
                <p className='mt-3 text-xs font-semibold text-gray-600'>
                  Pricing model is stored in <code className='font-black'>metadata.pricingModel</code>.
                </p>
              </div>
            ) : bookingMode === 'SCHEDULED' ? (
              <div className='sm:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs font-semibold text-gray-700'>
                <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Scheduled sessions</div>
                <p className='mt-2'>
                  Scheduled services use pre-created sessions. Configure duration/capacity/pricing above, then create sessions in the Scheduling calendar.
                </p>
              </div>
            ) : null}

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-base-price'>
                Base price
              </label>
              <input
                id='service-base-price'
                {...register('basePrice')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.basePrice?.message ? <p className='mt-1 text-xs font-semibold text-red-600'>{errors.basePrice.message}</p> : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-subscription-price'>
                Member price (optional)
              </label>
              <input
                id='service-subscription-price'
                {...register('subscriptionPrice')}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
              {errors.subscriptionPrice?.message ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{String(errors.subscriptionPrice.message)}</p>
              ) : null}
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-age-min'>
                Age min (optional)
              </label>
              <input
                id='service-age-min'
                type='number'
                {...register('ageMin', { valueAsNumber: true })}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-age-max'>
                Age max (optional)
              </label>
              <input
                id='service-age-max'
                type='number'
                {...register('ageMax', { valueAsNumber: true })}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div className='sm:col-span-2 grid gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
              <label className='flex items-center justify-between gap-3'>
                <span className='text-sm font-black text-gray-900'>Requires waiver</span>
                <input type='checkbox' {...register('requiresWaiver')} className='h-4 w-4 rounded border-gray-300' />
              </label>
              <label className='flex items-center justify-between gap-3'>
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
            onClick={() => void handleSubmit(values => onSubmit(values))()}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? 'Saving…' : 'Save service'}
          </button>
        </div>
      </div>
    </div>
  )
}

