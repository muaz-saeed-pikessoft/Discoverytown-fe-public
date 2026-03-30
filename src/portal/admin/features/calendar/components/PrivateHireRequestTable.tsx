'use client'

import { Fragment, useMemo, useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import BookingStatusBadge from '@/portal/admin/features/scheduling/components/BookingStatusBadge'
import { PRIVATE_HIRE_STATUS_TABS, type PrivateHireStatusTab } from '@/portal/admin/features/calendar/constants'
import ApprovePrivateHireModal from '@/portal/admin/features/calendar/components/ApprovePrivateHireModal'
import RejectPrivateHireModal from '@/portal/admin/features/calendar/components/RejectPrivateHireModal'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { usePrivateHireRequests } from '@/portal/admin/features/calendar/hooks/usePrivateHireRequests'
import { useReviewPrivateHire } from '@/portal/admin/features/calendar/hooks/useReviewPrivateHire'
import type { PrivateHireRequestFilters } from '@/portal/admin/features/calendar/types'
import type { BookingStatus } from '@/types/scheduling.shared'

function formatMetaDate(value: unknown): string {
  if (typeof value !== 'string') return '—'
  try {
    return new Date(value).toLocaleDateString()
  } catch {
    return '—'
  }
}

export default function PrivateHireRequestTable() {
  const [tab, setTab] = useState<PrivateHireStatusTab>('ALL')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [approveId, setApproveId] = useState<string | null>(null)
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({})

  const filters = useMemo((): PrivateHireRequestFilters => {
    const status: PrivateHireRequestFilters['status'] = tab === 'ALL' ? 'ALL' : (tab as BookingStatus)
    return { status, limit: 50 }
  }, [tab])
  const query = usePrivateHireRequests(filters)
  const locationsQuery = useLocations()
  const reviewMutation = useReviewPrivateHire()

  const bookings = query.data?.data ?? []
  const locationName = (id: string) => locationsQuery.data?.find(l => l.id === id)?.name ?? id

  return (
    <div>
      <PageHeader title='Private hire requests' subtitle='Review venue hire inquiries and deposits.' />

      <div className='mb-4 flex flex-wrap gap-2'>
        {PRIVATE_HIRE_STATUS_TABS.map(t => (
          <button
            key={t}
            type='button'
            onClick={() => setTab(t)}
            className={[
              'h-10 rounded-xl px-4 text-xs font-black uppercase tracking-widest transition',
              tab === t ? 'bg-blue-600 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
            ].join(' ')}
          >
            {t === 'ALL' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {query.isLoading ? (
        <LoadingSkeleton variant='table' />
      ) : query.isError ? (
        <ErrorState title='Failed to load requests' onRetry={() => void query.refetch()} />
      ) : bookings.length === 0 ? (
        <EmptyState title='No requests' description='Private hire inquiries will appear here.' />
      ) : (
        <div className='overflow-x-auto rounded-2xl border border-gray-200 bg-white'>
          <table className='w-full min-w-[800px] text-left text-sm'>
            <thead className='border-b border-gray-100 bg-gray-50 text-xs font-black uppercase tracking-widest text-gray-500'>
              <tr>
                <th className='px-4 py-3'>Guest</th>
                <th className='px-4 py-3'>Service</th>
                <th className='px-4 py-3'>Location</th>
                <th className='px-4 py-3'>Preferred</th>
                <th className='px-4 py-3'>Guests</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3' />
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {bookings.map(b => {
                const meta = b.metadata as Record<string, unknown>
                const open = expandedId === b.id
                return (
                  <Fragment key={b.id}>
                    <tr className='hover:bg-gray-50'>
                      <td className='px-4 py-3 font-semibold text-gray-900'>
                        {b.contact.firstName} {b.contact.lastName}
                      </td>
                      <td className='px-4 py-3 text-gray-700'>{b.service.name}</td>
                      <td className='px-4 py-3 text-gray-700'>{locationName(b.locationId)}</td>
                      <td className='px-4 py-3 text-gray-700'>
                        {b.startAt ? new Date(b.startAt).toLocaleDateString() : '—'}
                      </td>
                      <td className='px-4 py-3 text-gray-700'>{b.guestCount ?? '—'}</td>
                      <td className='px-4 py-3'>
                        <BookingStatusBadge status={b.status} />
                      </td>
                      <td className='px-4 py-3 text-right'>
                        <button
                          type='button'
                          onClick={() => setExpandedId(open ? null : b.id)}
                          className='text-xs font-black text-blue-600 hover:underline'
                        >
                          {open ? 'Hide' : 'Details'}
                        </button>
                      </td>
                    </tr>
                    {open ? (
                      <tr className='bg-gray-50'>
                        <td colSpan={7} className='px-4 py-4'>
                          <div className='grid gap-4 md:grid-cols-2'>
                            <div className='space-y-2 text-sm text-gray-700'>
                              <p>
                                <span className='font-black text-gray-500'>Notes: </span>
                                {b.notes ?? '—'}
                              </p>
                              <p>
                                <span className='font-black text-gray-500'>Alternate date: </span>
                                {formatMetaDate(meta?.alternateDate)}
                              </p>
                              <p>
                                <span className='font-black text-gray-500'>Event type: </span>
                                {typeof meta?.eventType === 'string' ? meta.eventType : '—'}
                              </p>
                            </div>
                            <div>
                              <label htmlFor={`internal-${b.id}`} className='text-xs font-black text-gray-500'>
                                Internal notes
                              </label>
                              <textarea
                                id={`internal-${b.id}`}
                                value={notesDraft[b.id] ?? b.internalNotes ?? ''}
                                onChange={e => setNotesDraft(prev => ({ ...prev, [b.id]: e.target.value }))}
                                rows={3}
                                className='mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm'
                              />
                              <button
                                type='button'
                                className='mt-2 h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 hover:bg-gray-100'
                                onClick={() =>
                                  void reviewMutation.mutateAsync({
                                    id: b.id,
                                    input: { internalNotes: notesDraft[b.id] ?? b.internalNotes ?? '' },
                                  })
                                }
                              >
                                Save notes
                              </button>
                            </div>
                          </div>
                          {b.status === 'PENDING' ? (
                            <div className='mt-4 flex flex-wrap gap-2'>
                              <button
                                type='button'
                                onClick={() => setApproveId(b.id)}
                                className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white hover:bg-blue-700'
                              >
                                Approve
                              </button>
                              <button
                                type='button'
                                onClick={() => setRejectId(b.id)}
                                className='h-10 rounded-xl border border-red-200 bg-white px-4 text-xs font-black text-red-700 hover:bg-red-50'
                              >
                                Reject
                              </button>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <ApprovePrivateHireModal
        key={`approve-${approveId ?? 'idle'}`}
        open={Boolean(approveId)}
        onOpenChange={open => {
          if (!open) setApproveId(null)
        }}
        isLoading={reviewMutation.isPending}
        onConfirm={async ({ depositAmount, internalNotes }) => {
          if (!approveId) return
          await reviewMutation.mutateAsync({
            id: approveId,
            input: {
              status: 'CONFIRMED',
              depositAmount,
              internalNotes,
            },
          })
          setApproveId(null)
        }}
      />

      <RejectPrivateHireModal
        key={`reject-${rejectId ?? 'idle'}`}
        open={Boolean(rejectId)}
        onOpenChange={open => {
          if (!open) setRejectId(null)
        }}
        isLoading={reviewMutation.isPending}
        onConfirm={async ({ reason }) => {
          if (!rejectId) return
          await reviewMutation.mutateAsync({
            id: rejectId,
            input: { status: 'CANCELLED', reason },
          })
          setRejectId(null)
        }}
      />
    </div>
  )
}
