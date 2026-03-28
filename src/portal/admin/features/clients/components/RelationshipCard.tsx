'use client'

import Link from 'next/link'

import ContactTypeBadge from '@/portal/admin/features/clients/components/ContactTypeBadge'
import { ROUTES } from '@/constants/routes'
import type { ContactRelationship } from '@/types/clients.shared'

interface RelationshipCardProps {
  relationship: ContactRelationship
}

export default function RelationshipCard({ relationship }: RelationshipCardProps) {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <div className='text-sm font-black text-gray-900'>
            {relationship.partner.firstName} {relationship.partner.lastName}
          </div>
          <div className='mt-1'>
            <ContactTypeBadge type={relationship.partner.contactType} />
          </div>
          <div className='mt-2 text-xs font-semibold text-gray-600'>{relationship.relationshipType.replaceAll('_', ' ')}</div>
        </div>
        <Link
          href={ROUTES.ADMIN.CLIENT(relationship.partner.id)}
          className='rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          View
        </Link>
      </div>
      <div className='mt-3 flex gap-2'>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${relationship.permissions.canBook ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          Can Book
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${relationship.permissions.canPay ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
          Can Pay
        </span>
      </div>
    </div>
  )
}

