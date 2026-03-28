'use client'

import { SERVICE_TYPE_CONFIG } from '@/portal/admin/features/scheduling/constants'
import type { ServiceType } from '@/portal/admin/features/scheduling/types'

interface ServiceTypeRadioCardsProps {
  value: ServiceType | null
  onChange: (type: ServiceType) => void
}

export default function ServiceTypeRadioCards({ value, onChange }: ServiceTypeRadioCardsProps) {
  const entries = Object.entries(SERVICE_TYPE_CONFIG) as Array<[ServiceType, (typeof SERVICE_TYPE_CONFIG)[ServiceType]]>

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {entries.map(([type, cfg]) => {
        const selected = value === type
        return (
          <button
            key={type}
            type='button'
            onClick={() => onChange(type)}
            className={[
              'flex w-full items-start gap-3 rounded-2xl border bg-white p-4 text-left transition',
              selected ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200 hover:bg-gray-50',
            ].join(' ')}
          >
            <div className={['flex h-10 w-10 items-center justify-center rounded-xl border text-lg', cfg.colorClass].join(' ')}>
              <span aria-hidden='true'>{cfg.icon}</span>
            </div>
            <div className='min-w-0'>
              <div className='text-sm font-black text-gray-900'>{cfg.label}</div>
              <div className='mt-1 text-xs font-semibold text-gray-500'>{type}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

