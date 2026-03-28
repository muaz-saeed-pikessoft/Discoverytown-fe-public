'use client'

import { SERVICE_TYPE_CONFIG } from '@/portal/admin/features/scheduling/constants'
import type { ServiceType } from '@/portal/admin/features/scheduling/types'

interface ServiceTypeBadgeProps {
  serviceType: ServiceType
}

export default function ServiceTypeBadge({ serviceType }: ServiceTypeBadgeProps) {
  const cfg = SERVICE_TYPE_CONFIG[serviceType]

  return (
    <span className={['inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-black uppercase tracking-widest', cfg.colorClass].join(' ')}>
      <span aria-hidden='true'>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </span>
  )
}

