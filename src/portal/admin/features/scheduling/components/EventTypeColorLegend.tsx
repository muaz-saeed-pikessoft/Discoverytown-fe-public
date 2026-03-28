'use client'

import { SERVICE_TYPE_CONFIG } from '@/portal/admin/features/scheduling/constants'
import type { ServiceType } from '@/portal/admin/features/scheduling/types'

interface EventTypeColorLegendProps {
  serviceTypes?: ServiceType[]
  className?: string
}

export default function EventTypeColorLegend({ serviceTypes, className }: EventTypeColorLegendProps) {
  const entries = (serviceTypes ?? (Object.keys(SERVICE_TYPE_CONFIG) as ServiceType[])).map(st => ({
    serviceType: st,
    ...SERVICE_TYPE_CONFIG[st],
  }))

  return (
    <div className={className}>
      <div className='flex flex-wrap items-center gap-2'>
        {entries.map(e => (
          <div
            key={e.serviceType}
            className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-black text-gray-800'
          >
            <span className={`h-2.5 w-2.5 rounded-full border ${e.colorClass}`} aria-hidden='true' />
            <span className='whitespace-nowrap'>{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

