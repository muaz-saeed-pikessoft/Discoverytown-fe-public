'use client'

import { useMemo, useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import { useLocations } from '@/portal/admin/features/scheduling/hooks/useLocations'
import { useCreateLocation, useUpdateLocation } from '@/portal/admin/features/scheduling/hooks/useLocationsMutations'
import type { Location } from '@/portal/admin/features/scheduling/types'
import LocationFormSlideOver from '@/portal/admin/features/scheduling/components/LocationFormSlideOver'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

export default function SchedulingLocationsPage() {
  const locationsQuery = useLocations()
  const createLocation = useCreateLocation()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Location | null>(null)
  const updateLocation = useUpdateLocation(editing?.id ?? '')
  const [deactivateTarget, setDeactivateTarget] = useState<Location | null>(null)
  const deactivateLocation = useUpdateLocation(deactivateTarget?.id ?? '')

  const locations = locationsQuery.data ?? []

  const stats = useMemo(() => ({ sessionsThisWeek: 0, revenue: '$0' }), [])

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Locations'
        subtitle='Manage scheduling locations.'
        actions={
          <button
            type='button'
            onClick={() => {
              setEditing(null)
              setFormOpen(true)
            }}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700'
          >
            Add location
          </button>
        }
      />

      {locationsQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : locationsQuery.isError ? (
        <ErrorState title='Failed to load locations' onRetry={() => void locationsQuery.refetch()} />
      ) : locations.length === 0 ? (
        <EmptyState title='No locations' description='Add your first location to start scheduling sessions.' />
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {locations.map(l => (
            <div key={l.id} className='rounded-2xl border border-gray-200 bg-white p-5'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <div className='truncate text-sm font-black text-gray-900'>{l.name}</div>
                  <div className='mt-1 truncate text-sm text-gray-600'>{l.city ?? l.address ?? '—'}</div>
                  <div className='mt-2 flex items-center gap-2'>
                    <span
                      className={[
                        'inline-flex items-center rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest',
                        l.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-700',
                      ].join(' ')}
                    >
                      {l.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className='flex shrink-0 items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => {
                      setEditing(l)
                      setFormOpen(true)
                    }}
                    className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50'
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    onClick={() => setDeactivateTarget(l)}
                    className='h-9 rounded-xl bg-red-50 px-3 text-xs font-black text-red-700 transition hover:bg-red-100'
                  >
                    Deactivate
                  </button>
                </div>
              </div>
              <div className='mt-4 grid grid-cols-2 gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3'>
                <div>
                  <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Sessions</div>
                  <div className='mt-1 text-sm font-black text-gray-900'>{stats.sessionsThisWeek}</div>
                </div>
                <div>
                  <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Revenue</div>
                  <div className='mt-1 text-sm font-black text-gray-900'>{stats.revenue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <LocationFormSlideOver
        open={formOpen}
        onOpenChange={open => {
          setFormOpen(open)
          if (!open) setEditing(null)
        }}
        initial={editing}
        isSubmitting={createLocation.isPending || updateLocation.isPending}
        onSubmit={async values => {
          if (editing) {
            await updateLocation.mutateAsync(values)
          } else {
            await createLocation.mutateAsync(values)
          }
          setFormOpen(false)
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!deactivateTarget}
        onOpenChange={open => (open ? undefined : setDeactivateTarget(null))}
        title='Deactivate location?'
        description='Inactive locations can no longer be selected for new sessions.'
        confirmLabel='Deactivate'
        onConfirm={async () => {
          if (!deactivateTarget) return
          await deactivateLocation.mutateAsync({ isActive: false })
          setDeactivateTarget(null)
        }}
        isLoading={deactivateLocation.isPending}
      />
    </div>
  )
}

