'use client'

import { useMemo, useState } from 'react'

import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import type { TableColumn } from '@/types/common'
import { useAddOns } from '@/portal/admin/features/scheduling/hooks/useAddOns'
import type { AddOn } from '@/portal/admin/features/scheduling/types'
import AddOnFormSlideOver from '@/portal/admin/features/scheduling/components/AddOnFormSlideOver'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useCreateAddOn, useDeleteAddOn, useUpdateAddOn } from '@/portal/admin/features/scheduling/hooks/useAddOnsMutations'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'

export default function SchedulingAddOnsPage() {
  const addOnsQuery = useAddOns()
  const createAddOn = useCreateAddOn()
  const [editing, setEditing] = useState<AddOn | null>(null)
  const updateAddOn = useUpdateAddOn(editing?.id ?? '')
  const deleteAddOn = useDeleteAddOn()
  const [formOpen, setFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AddOn | null>(null)

  const addOns = addOnsQuery.data ?? []

  const columns = useMemo<TableColumn<AddOn>[]>(
    () => [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'pricingType', label: 'Pricing', sortable: true },
      { key: 'price', label: 'Price', align: 'right', sortable: true, render: v => <span className='font-black'>${String(v)}</span> },
      {
        key: 'applicableBookingTypes',
        label: 'Booking types',
        render: (_v, row) => <span className='text-sm font-semibold text-gray-700'>{row.applicableBookingTypes.join(', ')}</span>,
      },
      { key: 'isActive', label: 'Active', align: 'center', render: (_v, row) => (row.isActive ? 'Yes' : 'No') },
      {
        key: 'actions',
        label: 'Actions',
        align: 'right',
        render: (_v, row) => (
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={() => {
                setEditing(row)
                setFormOpen(true)
              }}
              className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50'
            >
              Edit
            </button>
            <button
              type='button'
              onClick={() => setDeleteTarget(row)}
              className='h-9 rounded-xl bg-red-50 px-3 text-xs font-black text-red-700 transition hover:bg-red-100'
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  )

  if (addOnsQuery.isError) {
    return <ErrorState title='Failed to load add-ons' onRetry={() => void addOnsQuery.refetch()} />
  }

  return (
    <div className='space-y-4'>
      {addOns.length === 0 && !addOnsQuery.isLoading ? (
        <EmptyState title='No add-ons' description='Create add-ons to upsell or bundle experiences.' />
      ) : null}

      <AdminTablePage<AddOn>
        title='Add-ons'
        subtitle='Manage optional add-ons for bookings.'
        module='scheduling'
        createAction={
          <button
            type='button'
            onClick={() => {
              setEditing(null)
              setFormOpen(true)
            }}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700'
          >
            New add-on
          </button>
        }
        data={addOns}
        columns={columns}
        searchableKeys={['name']}
        pageSize={12}
        isLoading={addOnsQuery.isLoading}
      />

      <AddOnFormSlideOver
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        isSubmitting={createAddOn.isPending || updateAddOn.isPending}
        onSubmit={async values => {
          if (editing) {
            await updateAddOn.mutateAsync(values)
          } else {
            await createAddOn.mutateAsync(values)
          }
          setFormOpen(false)
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={open => (open ? undefined : setDeleteTarget(null))}
        title='Delete add-on?'
        description='This will remove the add-on from the catalog.'
        confirmLabel='Delete'
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteAddOn.mutateAsync(deleteTarget.id)
          setDeleteTarget(null)
        }}
        isLoading={deleteAddOn.isPending}
      />
    </div>
  )
}

