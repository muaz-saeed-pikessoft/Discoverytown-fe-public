'use client'

import { useMemo, useState } from 'react'

import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import PageHeader from '@/components/shared/PageHeader'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import ServiceTypeBadge from '@/portal/admin/features/scheduling/components/ServiceTypeBadge'
import SlotStatusBadge from '@/portal/admin/features/scheduling/components/SlotStatusBadge'
import CapacityRing from '@/portal/admin/features/scheduling/components/CapacityRing'
import RosterTable from '@/portal/admin/features/scheduling/components/RosterTable'
import WaitlistPanel from '@/portal/admin/features/scheduling/components/WaitlistPanel'
import DataTable from '@/components/shared/DataTable'
import type { TableColumn } from '@/types/common'
import CancelSlotModal from '@/portal/admin/features/scheduling/components/CancelSlotModal'
import CancelBookingModal from '@/portal/admin/features/scheduling/components/CancelBookingModal'
import { useServiceSlot } from '@/portal/admin/features/scheduling/hooks/useServiceSlot'
import { useSlotRoster } from '@/portal/admin/features/scheduling/hooks/useSlotRoster'
import { useWaitlist } from '@/portal/admin/features/scheduling/hooks/useWaitlist'
import { useCheckIn } from '@/portal/admin/features/scheduling/hooks/useCheckIn'
import { useCancelSlot } from '@/portal/admin/features/scheduling/hooks/useCancelSlot'
import { useBookings } from '@/portal/admin/features/scheduling/hooks/useBookings'
import { useCancelBooking } from '@/portal/admin/features/scheduling/hooks/useCancelBooking'
import type { Booking } from '@/portal/admin/features/scheduling/types'

interface SlotDetailPageClientProps {
  slotId: string
}

export default function SlotDetailPageClient({ slotId }: SlotDetailPageClientProps) {
  const [tab, setTab] = useState<'roster' | 'waitlist' | 'bookings' | 'details'>('roster')
  const [cancelSlotOpen, setCancelSlotOpen] = useState(false)
  const [cancelBookingTarget, setCancelBookingTarget] = useState<Booking | null>(null)

  const slotQuery = useServiceSlot(slotId)
  const rosterQuery = useSlotRoster(slotId)
  const waitlistQuery = useWaitlist(slotId)
  const bookingsQuery = useBookings({ serviceSlotId: slotId, page: 1, limit: 50 })

  const checkIn = useCheckIn(slotId)
  const cancelSlot = useCancelSlot()
  const cancelBooking = useCancelBooking()

  const slot = slotQuery.data
  const bookings = rosterQuery.data ?? []
  const waitlist = waitlistQuery.data ?? []
  const bookingRows = bookingsQuery.data?.data ?? []

  const headerSubtitle = useMemo(() => {
    if (!slot) return `Slot ID: ${slotId}`
    return `${new Date(slot.startAt).toLocaleString()} · ${slot.location.name}`
  }, [slot, slotId])

  const bookingColumns = useMemo<TableColumn<Booking>[]>(
    () => [
      { key: 'id', label: 'Booking ID', sortable: true, render: v => <span className='font-mono text-xs font-black'>{String(v).slice(0, 8)}…</span> },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'totalAmount', label: 'Amount', align: 'right', render: v => <span className='font-black'>${String(v)}</span> },
      { key: 'source', label: 'Source', sortable: true },
      {
        key: 'actions',
        label: 'Actions',
        align: 'right',
        render: (_v, row) => (
          <button
            type='button'
            onClick={() => setCancelBookingTarget(row)}
            className='h-9 rounded-xl bg-red-50 px-3 text-xs font-black text-red-700 transition hover:bg-red-100'
          >
            Cancel
          </button>
        ),
      },
    ],
    [],
  )

  return (
    <div>
      <PageHeader
        title={slot?.service.name ?? 'Session'}
        subtitle={headerSubtitle}
        actions={
          slot ? (
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => setCancelSlotOpen(true)}
                className='h-10 rounded-xl bg-red-600 px-4 text-xs font-black text-white transition hover:bg-red-700'
              >
                Cancel
              </button>
            </div>
          ) : null
        }
      />

      {slotQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : slotQuery.isError ? (
        <ErrorState title='Failed to load session' onRetry={() => void slotQuery.refetch()} />
      ) : !slot ? (
        <EmptyState title='Not found' description='This session could not be found.' />
      ) : (
        <div className='space-y-4'>
          <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4'>
            <div className='flex flex-wrap items-center gap-2'>
              <ServiceTypeBadge serviceType={slot.service.serviceType} />
              <SlotStatusBadge status={slot.status} />
            </div>
            <CapacityRing booked={slot.bookedCount} capacity={slot.effectiveCapacity} />
          </div>

          <div className='flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2'>
            {[
              { id: 'roster', label: 'Roster' },
              { id: 'waitlist', label: 'Waitlist' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'details', label: 'Details' },
            ].map(t => (
              <button
                key={t.id}
                type='button'
                onClick={() => setTab(t.id as typeof tab)}
                className={[
                  'h-10 rounded-xl px-4 text-xs font-black uppercase tracking-widest transition',
                  tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'roster' ? (
            rosterQuery.isLoading ? (
              <LoadingSkeleton variant='table' />
            ) : rosterQuery.isError ? (
              <ErrorState title='Failed to load roster' onRetry={() => void rosterQuery.refetch()} />
            ) : bookings.length === 0 ? (
              <EmptyState title='No bookings yet' description='Bookings for this session will show up here.' />
            ) : (
              <RosterTable
                bookings={bookings}
                slotId={slotId}
                onCheckIn={bookingId => {
                  void checkIn.mutate(bookingId)
                }}
              />
            )
          ) : null}

          {tab === 'waitlist' ? (
            waitlistQuery.isLoading ? (
              <LoadingSkeleton variant='card' />
            ) : waitlistQuery.isError ? (
              <ErrorState title='Failed to load waitlist' onRetry={() => void waitlistQuery.refetch()} />
            ) : (
              <WaitlistPanel waitlist={waitlist} slotId={slotId} />
            )
          ) : null}

          {tab === 'details' ? (
            <div className='grid gap-4 rounded-2xl border border-gray-200 bg-white p-6'>
              <div className='grid gap-1'>
                <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Service</div>
                <div className='text-sm font-black text-gray-900'>{slot.service.name}</div>
              </div>
              <div className='grid gap-1'>
                <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Location</div>
                <div className='text-sm font-semibold text-gray-800'>{slot.location.name}</div>
              </div>
              <div className='grid gap-1'>
                <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Start/End</div>
                <div className='text-sm font-semibold text-gray-800'>
                  {new Date(slot.startAt).toLocaleString()} – {new Date(slot.endAt).toLocaleString()}
                </div>
              </div>
              <div className='grid gap-1'>
                <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Notes</div>
                <div className='text-sm font-semibold text-gray-800'>{slot.notes ?? '—'}</div>
              </div>
            </div>
          ) : null}

          {tab === 'bookings' ? (
            bookingsQuery.isLoading ? (
              <LoadingSkeleton variant='table' />
            ) : bookingsQuery.isError ? (
              <ErrorState title='Failed to load bookings' onRetry={() => void bookingsQuery.refetch()} />
            ) : bookingRows.length === 0 ? (
              <EmptyState title='No bookings' description='Bookings for this session will show up here.' />
            ) : (
              <DataTable data={bookingRows} columns={bookingColumns} keyExtractor={b => b.id} pageSize={12} />
            )
          ) : null}
        </div>
      )}

      <CancelSlotModal
        open={cancelSlotOpen}
        onOpenChange={setCancelSlotOpen}
        isLoading={cancelSlot.isPending}
        onConfirm={async reason => {
          await cancelSlot.mutateAsync({ slotId, reason })
          setCancelSlotOpen(false)
        }}
      />

      <CancelBookingModal
        open={!!cancelBookingTarget}
        onOpenChange={open => (open ? undefined : setCancelBookingTarget(null))}
        isLoading={cancelBooking.isPending}
        onConfirm={async input => {
          if (!cancelBookingTarget) return
          await cancelBooking.mutateAsync({ bookingId: cancelBookingTarget.id, data: input, slotId })
          setCancelBookingTarget(null)
        }}
      />
    </div>
  )
}

