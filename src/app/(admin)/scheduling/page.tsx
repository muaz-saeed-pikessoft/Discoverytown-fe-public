'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import type { TableColumn } from '@/types/common'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import { ROUTES } from '@/constants/routes'
import CapacityRing from '@/portal/admin/features/scheduling/components/CapacityRing'
import ServiceTypeBadge from '@/portal/admin/features/scheduling/components/ServiceTypeBadge'
import SlotStatusBadge from '@/portal/admin/features/scheduling/components/SlotStatusBadge'
import SlotFilterPanel from '@/portal/admin/features/scheduling/components/SlotFilterPanel'
import { useServiceSlots } from '@/portal/admin/features/scheduling/hooks/useServiceSlots'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { useCancelSlot } from '@/portal/admin/features/scheduling/hooks/useCancelSlot'
import type { ServiceSlot, SlotFilters } from '@/portal/admin/features/scheduling/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSlotFilters } from '@/store/slices/schedulingSlice'

export default function AdminSchedulingPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const slotFilters = useAppSelector(s => s.scheduling.slotFilters)

  const [showBulkCancel, setShowBulkCancel] = useState(false)
  const [bulkCancelReason, setBulkCancelReason] = useState('Admin cancelled')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const locationsQuery = useLocations()
  const slotsQuery = useServiceSlots(slotFilters as SlotFilters)
  const cancelSlot = useCancelSlot()

  const locationOptions = useMemo(
    () => (locationsQuery.data ?? []).map(l => ({ id: l.id, name: l.name })),
    [locationsQuery.data]
  )

  const staffOptions = useMemo(() => [] as Array<{ id: string; name: string }>, [])

  const slots = slotsQuery.data?.data ?? []

  const columns = useMemo<TableColumn<ServiceSlot>[]>(
    () => [
      {
        key: 'service',
        label: 'Service name',
        sortable: true,
        render: (_v, row) => (
          <Link href={ROUTES.ADMIN.SCHEDULING_EVENT(row.id)} className='font-black text-blue-700 hover:underline'>
            {row.service.name}
          </Link>
        ),
      },
      {
        key: 'serviceType',
        label: 'Type',
        render: (_v, row) => <ServiceTypeBadge serviceType={row.service.serviceType} />,
      },
      {
        key: 'location',
        label: 'Location',
        render: (_v, row) => <span className='font-semibold text-gray-700'>{row.location.name}</span>,
      },
      {
        key: 'startAt',
        label: 'Date/Time',
        sortable: true,
        render: (_v, row) => (
          <div className='text-sm font-semibold text-gray-700'>
            {new Date(row.startAt).toLocaleString()} – {new Date(row.endAt).toLocaleTimeString()}
          </div>
        ),
      },
      {
        key: 'staff',
        label: 'Instructor',
        render: (_v, row) =>
          row.staff ? (
            <span className='font-semibold text-gray-700'>
              {row.staff.firstName} {row.staff.lastName}
            </span>
          ) : (
            <span className='text-sm text-gray-400'>—</span>
          ),
      },
      {
        key: 'capacity',
        label: 'Enrolled/Capacity',
        align: 'center',
        render: (_v, row) => <CapacityRing booked={row.bookedCount} capacity={row.effectiveCapacity} size='sm' />,
      },
      {
        key: 'status',
        label: 'Status',
        render: (_v, row) => <SlotStatusBadge status={row.status} />,
      },
      {
        key: 'price',
        label: 'Price',
        align: 'right',
        render: (_v, row) => <span className='font-black text-gray-900'>${row.priceOverride ?? row.service.basePrice}</span>,
      },
      {
        key: 'actions',
        label: 'Actions',
        align: 'right',
        render: (_v, row) => (
          <div className='flex items-center justify-end gap-2'>
            <button
              type='button'
              onClick={() => router.push(ROUTES.ADMIN.SCHEDULING_EVENT(row.id))}
              className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50'
            >
              View
            </button>
            <button
              type='button'
              onClick={() => void cancelSlot.mutate({ slotId: row.id, reason: 'Admin cancelled' })}
              className='h-9 rounded-xl bg-red-600 px-3 text-xs font-black text-white transition hover:bg-red-700'
            >
              Cancel
            </button>
          </div>
        ),
      },
    ],
    [cancelSlot, router]
  )

  return (
    <div className='space-y-4'>
      <SlotFilterPanel
        value={slotFilters as SlotFilters}
        onChange={next => dispatch(setSlotFilters(next))}
        locations={locationOptions}
        staff={staffOptions}
      />

      {slotsQuery.isError ? (
        <ErrorState
          title='Failed to load sessions'
          description='Please retry. If this keeps happening, check your network connection.'
          onRetry={() => void slotsQuery.refetch()}
        />
      ) : (
        <AdminTablePage<ServiceSlot>
          module='scheduling'
          title='Scheduling'
          subtitle='Manage service sessions and availability.'
          data={slots}
          columns={columns}
          defaultSort={{ key: 'startAt', direction: 'asc' }}
          searchableKeys={['id'] as Array<keyof ServiceSlot>}
          pageSize={10}
          selectable
          isLoading={slotsQuery.isLoading}
          onSelectionChange={setSelectedIds}
          createAction={
            <Link
              href={ROUTES.ADMIN.SCHEDULING_NEW}
              className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black leading-10 text-white transition hover:bg-blue-700'
            >
              New event
            </Link>
          }
          actions={
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => setShowBulkCancel(true)}
                disabled={selectedIds.size === 0}
                className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
              >
                Cancel selected
              </button>
              <button
                type='button'
                className='h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition hover:bg-gray-50'
                onClick={() => {
                  // CSV export basic client-side
                  const header = ['id', 'serviceName', 'serviceType', 'location', 'startAt', 'endAt', 'status']
                  const rows = slots.map(s => [
                    s.id,
                    s.service.name,
                    s.service.serviceType,
                    s.location.name,
                    s.startAt,
                    s.endAt,
                    s.status,
                  ])
                  const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `scheduling-slots-${new Date().toISOString().slice(0, 10)}.csv`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Export CSV
              </button>
            </div>
          }
        />
      )}

      {!slotsQuery.isLoading && !slotsQuery.isError && slots.length === 0 ? (
        <EmptyState
          title='No sessions scheduled'
          description='Create your first session to start taking bookings.'
          action={{ label: 'Create first session', onClick: () => router.push(ROUTES.ADMIN.SCHEDULING_NEW) }}
        />
      ) : null}

      <ConfirmDialog
        open={showBulkCancel}
        onOpenChange={setShowBulkCancel}
        title='Cancel selected sessions?'
        description='This will cancel all selected sessions. This action may notify participants depending on backend settings.'
        confirmLabel='Cancel sessions'
        onConfirm={async () => {
          const ids = Array.from(selectedIds)
          for (const id of ids) {
            await cancelSlot.mutateAsync({ slotId: id, reason: bulkCancelReason })
          }
          setSelectedIds(new Set())
        }}
        isLoading={cancelSlot.isPending}
      >
        <div />
      </ConfirmDialog>
    </div>
  )
}

