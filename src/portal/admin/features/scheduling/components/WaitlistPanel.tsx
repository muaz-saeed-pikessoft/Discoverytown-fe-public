'use client'

import { useMemo, useState } from 'react'

import ConfirmDialog from '@/components/shared/ConfirmDialog'
import StatusBadge from '@/components/shared/StatusBadge'
import { usePromoteWaitlist } from '@/portal/admin/features/scheduling/hooks/usePromoteWaitlist'
import type { WaitlistEntry } from '@/portal/admin/features/scheduling/types'

interface WaitlistPanelProps {
  waitlist: WaitlistEntry[]
  slotId: string
}

export default function WaitlistPanel({ waitlist, slotId }: WaitlistPanelProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const promote = usePromoteWaitlist(slotId)

  const ordered = useMemo(() => [...waitlist].sort((a, b) => a.position - b.position), [waitlist])

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <div className='text-sm font-black text-gray-900'>Waitlist</div>
          <div className='mt-1 text-xs font-semibold text-gray-500'>Promote the next contact when space becomes available.</div>
        </div>
        <button
          type='button'
          onClick={() => setConfirmOpen(true)}
          className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          disabled={ordered.length === 0 || promote.isPending}
        >
          Promote next
        </button>
      </div>

      {ordered.length === 0 ? (
        <div className='rounded-2xl border border-gray-200 bg-white p-6 text-sm font-semibold text-gray-600'>No one is currently waiting.</div>
      ) : (
        <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <ul className='divide-y divide-gray-100'>
            {ordered.map(e => (
              <li key={e.id} className='flex items-center justify-between gap-4 px-5 py-4'>
                <div className='min-w-0'>
                  <div className='flex items-center gap-3'>
                    <span className='inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gray-100 text-xs font-black text-gray-700'>
                      {e.position}
                    </span>
                    <div className='min-w-0'>
                      <div className='truncate font-black text-gray-900'>
                        {e.contact.firstName} {e.contact.lastName}
                      </div>
                      <div className='mt-0.5 text-xs font-semibold text-gray-500'>
                        {e.notifiedAt ? `Notified ${new Date(e.notifiedAt).toLocaleString()}` : 'Not notified'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='shrink-0'>
                  <StatusBadge status={e.status} variant='lead' />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title='Promote next waitlist entry?'
        description='This will attempt to convert the next waiting contact into a booking (if capacity is available).'
        confirmLabel='Promote'
        onConfirm={async () => {
          await promote.mutateAsync()
          setConfirmOpen(false)
        }}
        isLoading={promote.isPending}
      />
    </div>
  )
}

