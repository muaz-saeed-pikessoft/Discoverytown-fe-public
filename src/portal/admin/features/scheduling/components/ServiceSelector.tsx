'use client'

import { useMemo } from 'react'

import type { Service, ServiceType } from '@/portal/admin/features/scheduling/types'

interface ServiceSelectorProps {
  serviceType: ServiceType
  services: Service[]
  value: string | null
  onChange: (serviceId: string) => void
  disabled?: boolean
}

export default function ServiceSelector({ serviceType, services, value, onChange, disabled = false }: ServiceSelectorProps) {
  const options = useMemo(
    () => services.filter(s => s.serviceType === serviceType && s.isActive),
    [services, serviceType]
  )

  return (
    <div>
      <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='service-selector'>
        Service
      </label>
      <select
        id='service-selector'
        value={value ?? ''}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50'
      >
        <option value='' disabled>
          Select a service…
        </option>
        {options.map(s => (
          <option key={s.id} value={s.id}>
            {s.name} · ${s.basePrice} · cap {s.capacity}
          </option>
        ))}
      </select>
    </div>
  )
}

