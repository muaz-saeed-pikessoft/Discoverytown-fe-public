/**
 * Admin Bookings Management Page.
 *
 * Displays all platform bookings in a central management overview.
 */

'use client'

import React, { useMemo } from 'react'

import DataTable from '@/components/ui/DataTable'
import { useTable } from '@/hooks/useTable'
import { MOCK_BOOKINGS } from '@/data/mockData'
import type { TableColumn } from '@/types/common'

export default function AdminBookingsPage() {
  const { processedData, handleSort, sortConfig, toggleSelect, selectedIds, selectAll, deselectAll } = useTable({
    data: MOCK_BOOKINGS,
    defaultSort: { key: 'date', direction: 'desc' },
    multiSelect: true,
  })

  const columns: TableColumn<(typeof MOCK_BOOKINGS)[0]>[] = useMemo(
    () => [
      {
        key: 'confirmationCode',
        label: 'ID',
        sortable: true,
        render: code => <span className='font-mono text-xs font-black text-gray-400'>{code as string}</span>,
      },
      { key: 'title', label: 'Service/Event', sortable: true },
      { key: 'date', label: 'Scheduled Date', sortable: true },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: status => (
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-widest ${
              status === 'confirmed'
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
        render: amt => <span className='font-bold text-gray-900'>${amt as number}</span>,
      },
      {
        key: 'actions',
        label: 'Ops',
        align: 'right',
        render: (_, b) => (
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
        onSelectAll={selectedIds.size === MOCK_BOOKINGS.length ? deselectAll : selectAll}
        selectedIds={selectedIds}
        keyExtractor={b => b.id}
      />
    </div>
  )
}
