/**
 * Admin Bookings Management Page.
 *
 * Displays all platform bookings in a central management overview.
 */

'use client'

import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import DataTable from '@/components/ui/DataTable'
import { getBookings } from '@/api/bookingApi'
import { useTable } from '@/hooks/useTable'
import type { TableColumn } from '@/types/common'
import type { BookingRecord } from '@/types/booking-types'

export default function AdminBookingsPage() {
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['admin', 'bookings'],
    queryFn: () => getBookings({ order: 'desc' }),
  })

  const { processedData, handleSort, sortConfig, toggleSelect, selectedIds, selectAll, deselectAll } = useTable({
    data: bookings,
    defaultSort: { key: 'date', direction: 'desc' },
    multiSelect: true,
  })

  const columns: TableColumn<BookingRecord>[] = useMemo(
    () => [
      {
        key: 'confirmationCode',
        label: 'ID',
        sortable: true,
        render: (code: unknown) => <span className='font-mono text-xs font-black text-gray-400'>{code as string}</span>,
      },
      { key: 'title', label: 'Service/Event', sortable: true },
      { key: 'date', label: 'Scheduled Date', sortable: true },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (status: unknown) => (
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-widest ${status === 'confirmed'
                ? 'bg-green-100 text-green-700'
                : status === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
          >
            {status as string}
          </span>
        ),
      },
      {
        key: 'amount',
        label: 'Revenue',
        sortable: true,
        align: 'right',
        render: (amt: unknown) => <span className='font-bold text-gray-900'>${amt as number}</span>,
      },
      {
        key: 'actions',
        label: 'Ops',
        align: 'right',
        render: (_: unknown) => (
          <div className='flex gap-2 justify-end'>
            <button className='h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-white transition-colors'>
              ✎
            </button>
            <button className='h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-white transition-colors'>
              🗑
            </button>
          </div>
        ),
      },
    ],
    []
  )

  if (isLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='bg-red-50 p-6 rounded-2xl border border-red-100 text-red-700'>
        Failed to load bookings. Please try again later.
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-black tracking-tight text-gray-900'>Manage Bookings</h1>
          <p className='mt-1 text-sm text-gray-500'>
            Real-time access to all platform schedules, session management, and revenue reporting.
          </p>
        </div>

        {selectedIds.size > 0 && (
          <div className='flex items-center gap-3 animate-slideInRight'>
            <span className='text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100'>
              {selectedIds.size} Selected
            </span>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md hover:bg-blue-700 transition-colors'>
              Bulk Action ⚙️
            </button>
          </div>
        )}
      </div>

      <DataTable
        data={processedData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        selectable
        onSelect={toggleSelect}
        onSelectAll={selectedIds.size === bookings.length ? deselectAll : selectAll}
        selectedIds={selectedIds}
        keyExtractor={b => b.id}
      />
    </div>
  )
}
