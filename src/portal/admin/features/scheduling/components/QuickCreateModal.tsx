'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import { useAppDispatch } from '@/store/hooks'
import { setSlotFormDraft } from '@/store/slices/schedulingSlice'
import type { CreateSlotInput, Service, ServiceType } from '@/portal/admin/features/scheduling/types'

interface QuickCreateModalProps {
  open: boolean
  defaultDate: Date
  defaultTime: string
  services: Service[]
  onClose: () => void
}

export default function QuickCreateModal({ open, defaultDate, defaultTime, services, onClose }: QuickCreateModalProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [serviceType, setServiceType] = useState<ServiceType | ''>('')
  const [serviceId, setServiceId] = useState<string>('')
  const [locationId, setLocationId] = useState<string>('')

  const serviceOptions = useMemo(() => {
    if (!serviceType) return services
    return services.filter(s => s.serviceType === serviceType)
  }, [serviceType, services])

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-black/35' onClick={onClose} aria-hidden='true' />
      <div className='relative flex min-h-full items-center justify-center p-5'>
        <div className='w-full max-w-[560px] rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <h2 className='text-lg font-black text-gray-900'>Quick create</h2>
              <p className='mt-1 text-sm text-gray-600'>
                {defaultDate.toLocaleDateString()} at {defaultTime}
              </p>
            </div>
            <button
              type='button'
              onClick={onClose}
              className='h-9 w-9 rounded-xl border border-gray-200 bg-white text-sm font-black text-gray-700 transition hover:bg-gray-50'
              aria-label='Close'
            >
              ×
            </button>
          </div>

          <div className='mt-5 grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='qc-service-type'>
                Service type
              </label>
              <input
                id='qc-service-type'
                value={serviceType}
                onChange={e => setServiceType(e.target.value as ServiceType)}
                placeholder='e.g. OPEN_PLAY'
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='qc-location'>
                Location ID
              </label>
              <input
                id='qc-location'
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                placeholder='Location UUID'
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='qc-service'>
                Service
              </label>
              <select
                id='qc-service'
                value={serviceId}
                onChange={e => setServiceId(e.target.value)}
                className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
              >
                <option value='' disabled>
                  Select a service…
                </option>
                {serviceOptions.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='button'
              disabled={!serviceType || !serviceId || !locationId}
              onClick={() => {
                const isoDate = defaultDate.toISOString().slice(0, 10)
                const startAt = `${isoDate}T${defaultTime}:00.000Z`

                const draft: Partial<CreateSlotInput> = {
                  serviceType: serviceType as ServiceType,
                  serviceId,
                  locationId,
                  startAt,
                  isRecurring: false,
                }

                dispatch(setSlotFormDraft(draft))
                router.push(ROUTES.ADMIN.SCHEDULING_NEW)
              }}
              className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

