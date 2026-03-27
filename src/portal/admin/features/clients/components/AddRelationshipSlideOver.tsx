'use client'

import { useState } from 'react'

import ContactSearchCombobox from '@/portal/admin/features/clients/components/ContactSearchCombobox'
import { RelationshipType, type ContactSummary } from '@/types/clients.shared'

interface AddRelationshipSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: {
    contactIdB: string
    relationshipType: RelationshipType
    isPrimary: boolean
    permissions: { canBook: boolean; canPay: boolean }
  }) => void
}

export default function AddRelationshipSlideOver({ open, onOpenChange, onSubmit }: AddRelationshipSlideOverProps) {
  const [contact, setContact] = useState<ContactSummary | null>(null)
  const [relationshipType, setRelationshipType] = useState<RelationshipType>(RelationshipType.PARENT_CHILD)
  const [isPrimary, setIsPrimary] = useState(true)
  const [canBook, setCanBook] = useState(true)
  const [canPay, setCanPay] = useState(true)

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex justify-end bg-black/30'>
      <div className='h-full w-full max-w-lg bg-white p-5 shadow-2xl'>
        <div className='text-lg font-black text-gray-900'>Add Relationship</div>
        <div className='mt-4 space-y-4'>
          <ContactSearchCombobox value={contact?.id ?? null} onChange={setContact} />
          <select
            value={relationshipType}
            onChange={e => setRelationshipType(e.target.value as RelationshipType)}
            className='h-10 w-full rounded-xl border border-gray-200 px-3 text-sm font-semibold'
          >
            {Object.values(RelationshipType).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className='flex items-center justify-between text-sm font-semibold text-gray-700'>
            Primary
            <input type='checkbox' checked={isPrimary} onChange={e => setIsPrimary(e.target.checked)} />
          </label>
          <label className='flex items-center justify-between text-sm font-semibold text-gray-700'>
            Can Book
            <input type='checkbox' checked={canBook} onChange={e => setCanBook(e.target.checked)} />
          </label>
          <label className='flex items-center justify-between text-sm font-semibold text-gray-700'>
            Can Pay
            <input type='checkbox' checked={canPay} onChange={e => setCanPay(e.target.checked)} />
          </label>
        </div>
        <div className='mt-5 flex justify-end gap-2'>
          <button type='button' onClick={() => onOpenChange(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>
            Cancel
          </button>
          <button
            type='button'
            disabled={!contact}
            onClick={() => {
              if (!contact) return
              onSubmit({
                contactIdB: contact.id,
                relationshipType,
                isPrimary,
                permissions: { canBook, canPay },
              })
            }}
            className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white disabled:opacity-60'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

