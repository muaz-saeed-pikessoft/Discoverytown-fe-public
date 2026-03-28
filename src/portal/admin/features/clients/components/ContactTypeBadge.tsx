'use client'

import { ContactType } from '@/types/clients.shared'

interface ContactTypeBadgeProps {
  type: ContactType
}

const COLOR_MAP: Record<ContactType, string> = {
  [ContactType.CUSTOMER]: 'bg-blue-100 text-blue-800',
  [ContactType.CHILD]: 'bg-green-100 text-green-800',
  [ContactType.CORPORATE]: 'bg-purple-100 text-purple-800',
  [ContactType.LEAD]: 'bg-amber-100 text-amber-800',
  [ContactType.VENDOR]: 'bg-gray-100 text-gray-800',
  [ContactType.STAFF]: 'bg-teal-100 text-teal-800',
}

export default function ContactTypeBadge({ type }: ContactTypeBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-[0.12em] ${COLOR_MAP[type]}`}>
      {type.replace('_', ' ')}
    </span>
  )
}

