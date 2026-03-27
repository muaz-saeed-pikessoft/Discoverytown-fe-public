'use client'

import ServiceTypeBadge from '@/portal/admin/features/scheduling/components/ServiceTypeBadge'
import type { ServiceSlot } from '@/portal/admin/features/scheduling/types'

interface ConflictWarningCardProps {
  conflicts: ServiceSlot[]
}

export default function ConflictWarningCard({ conflicts }: ConflictWarningCardProps) {
  if (!conflicts.length) return null

  return (
    <div className='rounded-2xl border border-amber-200 bg-amber-50 p-4'>
      <div className='text-sm font-black text-amber-900'>Potential conflicts</div>
      <div className='mt-1 text-sm font-semibold text-amber-900/80'>
        Some staff or resource conflicts were detected. Review before publishing.
      </div>
      <ul className='mt-3 space-y-2'>
        {conflicts.slice(0, 5).map(c => (
          <li key={c.id} className='flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-3 py-2'>
            <div className='min-w-0'>
              <div className='truncate text-sm font-black text-gray-900'>{c.service.name}</div>
              <div className='mt-0.5 text-xs font-semibold text-gray-600'>
                {new Date(c.startAt).toLocaleString()} – {new Date(c.endAt).toLocaleTimeString()}
              </div>
            </div>
            <div className='shrink-0'>
              <ServiceTypeBadge serviceType={c.service.serviceType} />
            </div>
          </li>
        ))}
      </ul>
      {conflicts.length > 5 ? (
        <div className='mt-2 text-xs font-semibold text-amber-900/80'>+{conflicts.length - 5} more</div>
      ) : null}
    </div>
  )
}

