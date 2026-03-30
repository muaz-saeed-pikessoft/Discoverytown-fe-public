'use client'

import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'

import { privateHireInquirySchema } from '@/lib/validations/user/booking.validations'
import { useSubmitPrivateHireInquiry } from '@/portal/user/features/privatehire/hooks/useSubmitPrivateHireInquiry'
import PrivateHireSuccessCard from '@/portal/user/features/privatehire/components/PrivateHireSuccessCard'
import type { PrivateHireEventType } from '@/portal/user/features/booking/types'

export type PrivateHireInquiryFormValues = InferType<typeof privateHireInquirySchema>

export interface PrivateHireInquiryFormProps {
  venues: Array<{ serviceId: string; locationId: string; label: string }>
  defaultServiceId?: string
  defaultLocationId?: string
  defaultTimeNote?: string
}

const EVENT_OPTIONS: Array<{ value: PrivateHireEventType; label: string }> = [
  { value: 'BIRTHDAY', label: 'Birthday party' },
  { value: 'CORPORATE', label: 'Corporate' },
  { value: 'OTHER', label: 'Other' },
]

export default function PrivateHireInquiryForm({
  venues,
  defaultServiceId,
  defaultLocationId,
  defaultTimeNote,
}: PrivateHireInquiryFormProps) {
  const [step, setStep] = useState(0)
  const [referenceId, setReferenceId] = useState<string | null>(null)

  const mutation = useSubmitPrivateHireInquiry()

  const form = useForm<PrivateHireInquiryFormValues>({
    // yup optional fields vs RHF default types — align at runtime; cast keeps strict mode happy.
    resolver: yupResolver(privateHireInquirySchema) as never,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventType: undefined,
      preferredDate: '',
      alternateDate: '',
      guestCount: 10,
      notes: defaultTimeNote ? `Preferred start time: ${defaultTimeNote}` : '',
      serviceId: defaultServiceId ?? venues[0]?.serviceId ?? '',
      locationId: defaultLocationId ?? venues[0]?.locationId ?? '',
    },
  })

  const watchedServiceId = useWatch({ control: form.control, name: 'serviceId' })
  const watchedEventType = useWatch({ control: form.control, name: 'eventType' })
  const watchedPreferredDate = useWatch({ control: form.control, name: 'preferredDate' })
  const watchedGuestCount = useWatch({ control: form.control, name: 'guestCount' })
  const watchedFirstName = useWatch({ control: form.control, name: 'firstName' })
  const watchedLastName = useWatch({ control: form.control, name: 'lastName' })
  const watchedEmail = useWatch({ control: form.control, name: 'email' })

  useEffect(() => {
    const match = venues.find(v => v.serviceId === watchedServiceId)
    if (match) {
      form.setValue('locationId', match.locationId)
    }
  }, [watchedServiceId, venues, form])

  if (referenceId) {
    return <PrivateHireSuccessCard referenceId={referenceId} />
  }

  async function onSubmit(values: PrivateHireInquiryFormValues) {
    const res = await mutation.mutateAsync({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      eventType: values.eventType,
      preferredDate: values.preferredDate,
      alternateDate: values.alternateDate || undefined,
      guestCount: values.guestCount,
      notes: values.notes || undefined,
      serviceId: values.serviceId,
      locationId: values.locationId,
    })
    setReferenceId(res.id)
  }

  async function nextFromStep0() {
    const ok = await form.trigger(['eventType', 'preferredDate', 'guestCount', 'serviceId', 'locationId'])
    if (ok) setStep(1)
  }

  async function nextFromStep1() {
    const ok = await form.trigger(['firstName', 'lastName', 'email', 'phone'])
    if (ok) setStep(2)
  }

  return (
    <div>
      <p className='text-sm font-semibold text-[var(--dt-text-muted)]'>
        Step {step + 1} of 3 — tell us about your event and we&apos;ll follow up shortly.
      </p>
      <form
        className='mt-6 space-y-5'
        onSubmit={e => {
          e.preventDefault()
          void form.handleSubmit(onSubmit)()
        }}
      >
        {step === 0 ? (
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='md:col-span-2'>
              <label htmlFor='ph-event-type' className='dt-sub-label'>
                Session / event type
              </label>
              <select
                id='ph-event-type'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm font-semibold text-[var(--dt-navy)]'
                defaultValue=''
                {...form.register('eventType')}
              >
                <option value='' disabled>
                  Select an option
                </option>
                {EVENT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.eventType ? (
                <p className='mt-1 text-xs font-semibold text-red-600'>{form.formState.errors.eventType.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor='ph-pref' className='dt-sub-label'>
                Preferred date
              </label>
              <input
                id='ph-pref'
                type='date'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('preferredDate')}
              />
              {form.formState.errors.preferredDate ? (
                <p className='mt-1 text-xs text-red-600'>{form.formState.errors.preferredDate.message}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor='ph-alt' className='dt-sub-label'>
                Alternate date
              </label>
              <input
                id='ph-alt'
                type='date'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('alternateDate')}
              />
            </div>
            <div>
              <label htmlFor='ph-guests' className='dt-sub-label'>
                Guest count
              </label>
              <input
                id='ph-guests'
                type='number'
                min={1}
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('guestCount', { valueAsNumber: true })}
              />
              {form.formState.errors.guestCount ? (
                <p className='mt-1 text-xs text-red-600'>{form.formState.errors.guestCount.message}</p>
              ) : null}
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='ph-venue' className='dt-sub-label'>
                Venue / package
              </label>
              <select
                id='ph-venue'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('serviceId')}
              >
                {venues.map(v => (
                  <option key={v.serviceId} value={v.serviceId}>
                    {v.label}
                  </option>
                ))}
              </select>
              <input type='hidden' {...form.register('locationId')} />
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label htmlFor='ph-fn' className='dt-sub-label'>
                First name
              </label>
              <input
                id='ph-fn'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('firstName')}
              />
              {form.formState.errors.firstName ? (
                <p className='mt-1 text-xs text-red-600'>{form.formState.errors.firstName.message}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor='ph-ln' className='dt-sub-label'>
                Last name
              </label>
              <input
                id='ph-ln'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('lastName')}
              />
              {form.formState.errors.lastName ? (
                <p className='mt-1 text-xs text-red-600'>{form.formState.errors.lastName.message}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor='ph-em' className='dt-sub-label'>
                Email
              </label>
              <input
                id='ph-em'
                type='email'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('email')}
              />
              {form.formState.errors.email ? (
                <p className='mt-1 text-xs text-red-600'>{form.formState.errors.email.message}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor='ph-ph' className='dt-sub-label'>
                Phone
              </label>
              <input
                id='ph-ph'
                className='mt-1 h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-sm'
                {...form.register('phone')}
              />
              {form.formState.errors.phone ? (
                <p className='mt-1 text-xs text-red-600'>{form.formState.errors.phone.message}</p>
              ) : null}
            </div>
            <div className='md:col-span-2'>
              <label htmlFor='ph-notes' className='dt-sub-label'>
                Notes
              </label>
              <textarea
                id='ph-notes'
                rows={4}
                className='mt-1 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 py-2 text-sm'
                {...form.register('notes')}
              />
            </div>
            <p className='md:col-span-2 text-xs text-[var(--dt-navy)]/60'>
              Spam protection: add Google reCAPTCHA v3 here before production launch (site key via env).
            </p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className='rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-cream)] p-4 text-sm text-[var(--dt-navy)]'>
            <p className='font-black'>Please confirm your details</p>
            <ul className='mt-3 space-y-1 font-semibold'>
              <li>Event: {EVENT_OPTIONS.find(o => o.value === watchedEventType)?.label ?? '—'}</li>
              <li>Preferred date: {watchedPreferredDate}</li>
              <li>Guests: {watchedGuestCount}</li>
              <li>
                Contact: {watchedFirstName} {watchedLastName} · {watchedEmail}
              </li>
            </ul>
          </div>
        ) : null}

        <div className='flex flex-wrap gap-2'>
          {step > 0 ? (
            <button
              type='button'
              onClick={() => setStep(s => Math.max(0, s - 1))}
              className='dt-btn-outline h-11 rounded-xl px-5 text-sm'
            >
              Back
            </button>
          ) : null}
          {step < 2 ? (
            <button
              type='button'
              onClick={() => void (step === 0 ? nextFromStep0() : nextFromStep1())}
              className='dt-btn-primary h-11 rounded-xl px-5 text-sm'
            >
              Next
            </button>
          ) : (
            <button
              type='submit'
              disabled={mutation.isPending}
              className='dt-btn-primary h-11 rounded-xl px-5 text-sm disabled:opacity-60'
            >
              {mutation.isPending ? 'Sending…' : 'Submit enquiry'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
