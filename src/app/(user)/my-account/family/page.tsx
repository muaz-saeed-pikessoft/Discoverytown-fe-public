'use client'

import { useState } from 'react'

import AccountShell from '@/portal/user/features/account/components/AccountShell'
import AddFamilyMemberForm from '@/portal/user/features/account/components/AddFamilyMemberForm'
import FamilyMemberCard from '@/portal/user/features/account/components/FamilyMemberCard'
import { useAddFamilyMember, useMyFamily, useRemoveFamilyMember } from '@/portal/user/features/account/hooks/useMyFamily'

export default function MyAccountFamilyPage() {
  const [open, setOpen] = useState(false)
  const familyQuery = useMyFamily()
  const addFamilyMember = useAddFamilyMember()
  const removeFamilyMember = useRemoveFamilyMember()
  const family = familyQuery.data ?? []

  return (
    <AccountShell
      title='Family'
      subtitle='Add and manage family members who can attend sessions under your account.'
      actions={
        <button type='button' onClick={() => setOpen(v => !v)} className='dt-btn-primary px-5 py-2.5'>
          {open ? 'Close' : 'Add family member'}
        </button>
      }
    >
      <div className='space-y-5'>
        {open ? (
          <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-5 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
            <AddFamilyMemberForm
              onSubmit={values => {
                addFamilyMember.mutate(values)
                setOpen(false)
              }}
            />
          </div>
        ) : null}

        <div className='grid gap-3 sm:grid-cols-2'>
          {family.map(item => (
            <FamilyMemberCard
              key={item.id}
              name={`${item.partner.firstName} ${item.partner.lastName}`}
              subtitle={item.relationshipType}
              onRemove={() => removeFamilyMember.mutate(item.id)}
            />
          ))}
        </div>
      </div>
    </AccountShell>
  )
}

