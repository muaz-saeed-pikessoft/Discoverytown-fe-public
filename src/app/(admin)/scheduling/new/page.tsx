'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'

import ErrorState from '@/components/shared/ErrorState'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import PageHeader from '@/components/shared/PageHeader'
import Stepper from '@/components/ui/Stepper'
import { ROUTES } from '@/constants/routes'
import { SLOT_FORM_STEPS } from '@/portal/admin/features/scheduling/constants'
import ServiceTypeRadioCards from '@/portal/admin/features/scheduling/components/ServiceTypeRadioCards'
import ServiceSelector from '@/portal/admin/features/scheduling/components/ServiceSelector'
import RecurrenceSelector, { type RecurrenceConfig } from '@/portal/admin/features/scheduling/components/RecurrenceSelector'
import ConflictWarningCard from '@/portal/admin/features/scheduling/components/ConflictWarningCard'
import { useServices } from '@/portal/admin/features/scheduling/hooks/useServices'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { useAddOns } from '@/portal/admin/features/scheduling/hooks/useAddOns'
import { useCreateSlot } from '@/portal/admin/features/scheduling/hooks/useCreateSlot'
import { useCreateRecurringRule } from '@/portal/admin/features/scheduling/hooks/useCreateRecurringRule'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearSlotFormDraft, setSlotFormDraft } from '@/store/slices/schedulingSlice'
import {
  createSlotStep1Schema,
  createSlotStep2Schema,
  createSlotStep3Schema,
} from '@/lib/validations/admin/scheduling.validations'
import type { CreateSlotInput, Service, ServiceType, RecurFrequency, BookingType, SlotStatus } from '@/portal/admin/features/scheduling/types'

export default function AdminSchedulingNewPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const draft = useAppSelector(s => s.scheduling.slotFormDraft)

  const [stepIdx, setStepIdx] = useState(0)
  const steps = useMemo(
    () => SLOT_FORM_STEPS.map((s, idx) => ({ id: s.id, label: s.label, completed: idx < stepIdx })),
    [stepIdx]
  )

  const servicesQuery = useServices({})
  const locationsQuery = useLocations()

  const combinedSchema = useMemo(() => {
    return (createSlotStep1Schema as yup.AnyObjectSchema)
      .concat(createSlotStep2Schema as yup.AnyObjectSchema)
      .concat(createSlotStep3Schema as yup.AnyObjectSchema)
  }, [])

  type SlotFormValues = yup.InferType<typeof combinedSchema> & {
    endAt?: string
  }

  const form = useForm<SlotFormValues>({
    resolver: yupResolver(combinedSchema),
    defaultValues: {
      serviceType: (draft?.serviceType as ServiceType | undefined) ?? undefined,
      serviceId: draft?.serviceId ?? '',
      locationId: draft?.locationId ?? '',
      staffId: draft?.staffId ?? undefined,
      startAt: draft?.startAt ?? '',
      durationMinutes: (draft as unknown as { durationMinutes?: number })?.durationMinutes ?? 60,
      isRecurring: draft?.isRecurring ?? false,
      frequency: draft?.frequency ?? undefined,
      daysOfWeek: draft?.daysOfWeek ?? [],
      validFrom: draft?.validFrom ?? '',
      validUntil: draft?.validUntil ?? '',
      capacityOverride: draft?.capacityOverride ?? undefined,
      priceOverride: undefined,
      notes: draft?.notes ?? '',
      addOnIds: draft?.addOnIds ?? [],
    },
    mode: 'onTouched',
  })

  const { watch, setValue, getValues, handleSubmit, trigger, formState } = form
  const values = watch()

  const services = servicesQuery.data?.data ?? []
  const selectedService = useMemo(() => services.find(s => s.id === values.serviceId) ?? null, [services, values.serviceId])
  const selectedServiceType = values.serviceType ?? null
  const isOpenBookingService = (selectedService as any)?.bookingMode === 'OPEN'

  useEffect(() => {
    const sub = watch(v => {
      dispatch(setSlotFormDraft(v as unknown as Partial<CreateSlotInput>))
    })
    return () => sub.unsubscribe()
  }, [dispatch, watch])

  useEffect(() => {
    if (!selectedService) return
    if (!values.startAt) return
    const start = new Date(values.startAt)
    if (Number.isNaN(start.getTime())) return
    const end = new Date(start.getTime() + selectedService.durationMinutes * 60_000)
    setValue('endAt', end.toISOString())
    setValue('durationMinutes', selectedService.durationMinutes)
  }, [selectedService, setValue, values.startAt])

  const createSlot = useCreateSlot()
  const createRecurring = useCreateRecurringRule()

  const addOnsQuery = useAddOns({ bookingType: 'CLASS' as BookingType })

  if (servicesQuery.isError) {
    return <ErrorState title='Failed to load services' onRetry={() => void servicesQuery.refetch()} />
  }

  if (locationsQuery.isError) {
    return <ErrorState title='Failed to load locations' onRetry={() => void locationsQuery.refetch()} />
  }

  if (servicesQuery.isLoading || locationsQuery.isLoading) {
    return <LoadingSkeleton variant='page' />
  }

  const locations = locationsQuery.data ?? []

  async function nextStep() {
    const ok =
      stepIdx === 0
        ? await trigger(['serviceType', 'serviceId'])
        : stepIdx === 1
          ? await trigger(['locationId', 'startAt', 'durationMinutes', 'isRecurring', 'frequency', 'daysOfWeek', 'validFrom', 'validUntil'])
          : await trigger(['notes', 'addOnIds'])

    if (!ok) return
    if (stepIdx === 0 && isOpenBookingService) {
      setStepIdx(1)
      return
    }
    setStepIdx(s => Math.min(3, s + 1))
  }

  function prevStep() {
    setStepIdx(s => Math.max(0, s - 1))
  }

  return (
    <div className='space-y-4'>
      <PageHeader title='New session' subtitle='Create a new service slot.' />

      <div className='rounded-2xl border border-gray-200 bg-white p-6'>
        <Stepper steps={steps} current={stepIdx} />
      </div>

      <form
        onSubmit={handleSubmit(async v => {
          if (isOpenBookingService) {
            // OPEN booking services don't use pre-created sessions; block time is handled separately.
            return
          }

          const payload: CreateSlotInput = {
            serviceType: v.serviceType as ServiceType,
            serviceId: v.serviceId as string,
            locationId: v.locationId as string,
            staffId: (v.staffId as string | undefined) ?? null,
            startAt: v.startAt as string,
            endAt: (v.endAt as string | undefined) ?? new Date(v.startAt as string).toISOString(),
            isRecurring: !!v.isRecurring,
            frequency: v.frequency as RecurFrequency | undefined,
            daysOfWeek: v.daysOfWeek,
            validFrom: v.validFrom || undefined,
            validUntil: v.validUntil || undefined,
            capacityOverride: v.capacityOverride ?? null,
            priceOverride: null,
            notes: v.notes ?? null,
            addOnIds: v.addOnIds ?? [],
          }

          if (payload.isRecurring && payload.frequency) {
            await createRecurring.mutateAsync({
              serviceId: payload.serviceId,
              locationId: payload.locationId,
              staffId: payload.staffId,
              startAt: payload.startAt,
              endAt: payload.endAt,
              frequency: payload.frequency,
              daysOfWeek: payload.daysOfWeek,
              validFrom: payload.validFrom ?? payload.startAt,
              validUntil: payload.validUntil ?? payload.endAt,
              capacityOverride: payload.capacityOverride,
              priceOverride: payload.priceOverride,
              notes: payload.notes,
              addOnIds: payload.addOnIds,
            })
          } else {
            const created = await createSlot.mutateAsync(payload)
            router.push(ROUTES.ADMIN.SCHEDULING_EVENT(created.id))
          }

          dispatch(clearSlotFormDraft())
          router.push(ROUTES.ADMIN.SCHEDULING)
        })}
        className='space-y-4'
      >
        {stepIdx === 0 ? (
          <div className='rounded-2xl border border-gray-200 bg-white p-6 space-y-4'>
            <ServiceTypeRadioCards
              value={selectedServiceType}
              onChange={t => {
                setValue('serviceType', t)
                setValue('serviceId', '')
              }}
            />

            {selectedServiceType ? (
              <ServiceSelector
                serviceType={selectedServiceType}
                services={services as Service[]}
                value={values.serviceId ?? null}
                onChange={id => setValue('serviceId', id)}
              />
            ) : null}

            {selectedService ? (
              <div className='rounded-2xl border border-gray-200 bg-gray-50 p-4'>
                <div className='text-sm font-black text-gray-900'>{selectedService.name}</div>
                <div className='mt-2 grid gap-2 text-sm text-gray-700 sm:grid-cols-2'>
                  <div>
                    <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Capacity</span>
                    <div className='font-semibold'>{selectedService.capacity}</div>
                  </div>
                  <div>
                    <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Base price</span>
                    <div className='font-semibold'>${selectedService.basePrice}</div>
                  </div>
                  <div>
                    <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Age range</span>
                    <div className='font-semibold'>
                      {selectedService.ageMin ?? '—'}–{selectedService.ageMax ?? '—'}
                    </div>
                  </div>
                  <div>
                    <span className='text-xs font-black uppercase tracking-widest text-gray-500'>Duration</span>
                    <div className='font-semibold'>{selectedService.durationMinutes} minutes</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {stepIdx === 1 && isOpenBookingService ? (
          <OpenBookingNotice
            service={selectedService}
            locations={locations}
            onViewBookings={() => router.push(`${ROUTES.ADMIN.SCHEDULING}?serviceId=${encodeURIComponent(selectedService?.id ?? '')}`)}
            onBlocked={() => {
              dispatch(clearSlotFormDraft())
              router.push(ROUTES.ADMIN.SCHEDULING)
            }}
            createBlock={createSlot.mutateAsync}
          />
        ) : null}

        {stepIdx === 1 ? (
          <div className='rounded-2xl border border-gray-200 bg-white p-6 space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='locationId'>
                  Location
                </label>
                <select
                  id='locationId'
                  value={values.locationId ?? ''}
                  onChange={e => setValue('locationId', e.target.value)}
                  className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
                >
                  <option value='' disabled>
                    Select a location…
                  </option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                {formState.errors.locationId?.message ? (
                  <div className='mt-2 text-xs font-semibold text-red-600'>{String(formState.errors.locationId.message)}</div>
                ) : null}
              </div>

              <div>
                <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='startAt'>
                  Start
                </label>
                <input
                  id='startAt'
                  type='datetime-local'
                  value={values.startAt ?? ''}
                  onChange={e => setValue('startAt', e.target.value)}
                  className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
                />
              </div>
            </div>

            <RecurrenceSelector
              value={{
                isRecurring: !!values.isRecurring,
                frequency: values.frequency,
                daysOfWeek: values.daysOfWeek,
                validFrom: values.validFrom,
                validUntil: values.validUntil,
              }}
              onChange={(next: RecurrenceConfig) => {
                setValue('isRecurring', next.isRecurring)
                setValue('frequency', next.frequency)
                setValue('daysOfWeek', next.daysOfWeek)
                setValue('validFrom', next.validFrom)
                setValue('validUntil', next.validUntil)
              }}
            />

            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='capacityOverride'>
                  Capacity override (optional)
                </label>
                <input
                  id='capacityOverride'
                  type='number'
                  value={values.capacityOverride ?? ''}
                  onChange={e => setValue('capacityOverride', e.target.value ? Number(e.target.value) : undefined)}
                  className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
                />
              </div>

              <div>
                <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='staffId'>
                  Instructor ID (optional)
                </label>
                <input
                  id='staffId'
                  value={(values.staffId as string | undefined) ?? ''}
                  onChange={e => setValue('staffId', e.target.value)}
                  placeholder='Staff UUID'
                  className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
                />
              </div>
            </div>
          </div>
        ) : null}

        {stepIdx === 2 ? (
          <div className='rounded-2xl border border-gray-200 bg-white p-6 space-y-4'>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='notes'>
                Notes (internal)
              </label>
              <textarea
                id='notes'
                value={values.notes ?? ''}
                onChange={e => setValue('notes', e.target.value)}
                className='mt-2 min-h-[120px] w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-gray-900'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Add-ons</label>
              <div className='mt-2 flex flex-wrap gap-2'>
                {(addOnsQuery.data ?? []).map(a => {
                  const selected = (values.addOnIds ?? []).includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type='button'
                      onClick={() => {
                        const set = new Set(values.addOnIds ?? [])
                        if (set.has(a.id)) set.delete(a.id)
                        else set.add(a.id)
                        setValue('addOnIds', Array.from(set))
                      }}
                      className={[
                        'h-9 rounded-xl px-3 text-xs font-black transition',
                        selected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
                      ].join(' ')}
                    >
                      {a.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : null}

        {stepIdx === 3 ? (
          <div className='rounded-2xl border border-gray-200 bg-white p-6 space-y-4'>
            <div className='rounded-2xl border border-gray-200 bg-gray-50 p-4'>
              <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Review</div>
              <div className='mt-2 text-sm font-semibold text-gray-800'>
                Service: {selectedService?.name ?? '—'}
              </div>
              <div className='mt-1 text-sm font-semibold text-gray-800'>Location: {locations.find(l => l.id === values.locationId)?.name ?? '—'}</div>
              <div className='mt-1 text-sm font-semibold text-gray-800'>Start: {values.startAt || '—'}</div>
              <div className='mt-1 text-sm font-semibold text-gray-800'>Recurring: {values.isRecurring ? 'Yes' : 'No'}</div>
            </div>

            <ConflictWarningCard conflicts={[]} />
          </div>
        ) : null}

        <div className='flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <button
            type='button'
            onClick={prevStep}
            disabled={stepIdx === 0}
            className='h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Back
          </button>

          <div className='flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end'>
            {isOpenBookingService ? (
              <button
                type='button'
                onClick={() => router.push(ROUTES.ADMIN.SCHEDULING)}
                className='h-11 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700'
              >
                Done
              </button>
            ) : stepIdx < 3 ? (
              <button
                type='button'
                onClick={() => void nextStep()}
                className='h-11 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700'
              >
                Continue
              </button>
            ) : (
              <div className='flex flex-col gap-2 sm:flex-row'>
                <button
                  type='submit'
                  className='h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-black text-gray-700 transition hover:bg-gray-50'
                  onClick={() => {
                    // draft status could be handled server-side; keep as normal submit for now
                  }}
                >
                  Save as draft
                </button>
                <button
                  type='submit'
                  className='h-11 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700'
                >
                  Publish
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

interface OpenBookingNoticeProps {
  service: Service | null
  locations: { id: string; name: string }[]
  onViewBookings: () => void
  onBlocked: () => void
  createBlock: (input: CreateSlotInput) => Promise<unknown>
}

function OpenBookingNotice({ service, locations, onViewBookings, onBlocked, createBlock }: OpenBookingNoticeProps) {
  const [open, setOpen] = useState(false)
  const [locationId, setLocationId] = useState(service?.locationId ?? locations[0]?.id ?? '')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitBlock() {
    if (!service) return
    if (!locationId || !date || !startTime || !endTime) return
    const startAt = new Date(`${date}T${startTime}:00`).toISOString()
    const endAt = new Date(`${date}T${endTime}:00`).toISOString()
    setSubmitting(true)
    try {
      await createBlock({
        serviceType: service.serviceType as any,
        serviceId: service.id,
        locationId,
        staffId: null,
        startAt,
        endAt,
        isRecurring: false,
        addOnIds: [],
        notes: reason || 'Blocked time',
        status: 'CANCELLED' as SlotStatus,
      })
      setOpen(false)
      onBlocked()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-4'>
      <div className='text-sm font-black text-blue-900'>This service uses open booking</div>
      <div className='text-sm font-semibold text-blue-900/80'>
        Customers choose their own time windows on the booking page. You don’t need to create sessions in advance.
      </div>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='h-11 rounded-xl border border-blue-200 bg-white px-5 text-sm font-black text-blue-900 transition hover:bg-blue-100'
        >
          Block time
        </button>
        <button
          type='button'
          onClick={onViewBookings}
          className='h-11 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700'
        >
          View bookings
        </button>
      </div>

      {open ? (
        <div className='rounded-2xl border border-blue-200 bg-white p-4 space-y-3'>
          <div className='text-xs font-black uppercase tracking-widest text-blue-900/70'>Block time</div>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Location</label>
              <select
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
              >
                {locations.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Date</label>
              <input
                type='date'
                value={date}
                onChange={e => setDate(e.target.value)}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
              />
            </div>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Start</label>
              <input
                type='time'
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
              />
            </div>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500'>End</label>
              <input
                type='time'
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
              />
            </div>
          </div>
          <div>
            <label className='text-xs font-black uppercase tracking-widest text-gray-500'>Reason</label>
            <input
              value={reason}
              onChange={e => setReason(e.target.value)}
              maxLength={500}
              placeholder='Maintenance / Closure / Staff training'
              className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900'
            />
          </div>
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm font-black text-gray-700 transition hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='button'
              disabled={submitting || !date}
              onClick={() => void submitBlock()}
              className='h-11 flex-1 rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {submitting ? 'Blocking…' : 'Block time'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

