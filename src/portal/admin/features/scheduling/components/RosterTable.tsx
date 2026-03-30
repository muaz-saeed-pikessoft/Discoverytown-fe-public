'use client'

import { useMemo } from 'react'
import Link from 'next/link'

import DataTable from '@/components/shared/DataTable'
import type { TableColumn } from '@/types/common'
import BookingStatusBadge from '@/portal/admin/features/scheduling/components/BookingStatusBadge'
import { ROUTES } from '@/constants/routes'
import type { Booking } from '@/portal/admin/features/scheduling/types'

interface RosterTableProps {
  bookings: Booking[]
  slotId: string
  onCheckIn: (bookingId: string) => void
}

export default function RosterTable({ bookings, onCheckIn }: RosterTableProps) {
  const columns = useMemo<TableColumn<Booking>[]>(
    () => [
      {
        key: 'contact',
        label: 'Contact',
        render: (_v, row) => (
          <div className='min-w-0'>
            <Link
              href={ROUTES.ADMIN.CLIENT(row.contact.id)}
              className='font-black text-gray-900 hover:underline'
            >
              {row.contact.firstName} {row.contact.lastName}
            </Link>
            <div className='text-xs font-semibold text-gray-500'>{row.contact.id}</div>
          </div>
        ),
      },
      {
        key: 'participantContact',
        label: 'Participant',
        render: (_v, row) =>
          row.participantContact ? (
            <span className='font-semibold text-gray-700'>
              {row.participantContact.firstName} {row.participantContact.lastName}
            </span>
          ) : (
            <span className='text-sm text-gray-400'>—</span>
          ),
      },
      {
        key: 'status',
        label: 'Status',
        render: (_v, row) => <BookingStatusBadge status={row.status} />,
      },
      {
        key: 'checkedInAt',
        label: 'Check-in',
        align: 'center',
        render: (_v, row) => (
          <button
            type='button'
            onClick={() => onCheckIn(row.id)}
            className={[
              'h-9 rounded-xl px-3 text-xs font-black transition',
              row.checkedInAt ? 'bg-green-600 text-white hover:bg-green-700' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
            ].join(' ')}
          >
            {row.checkedInAt ? 'Checked in' : 'Check in'}
          </button>
        ),
      },
      {
        key: 'addOns',
        label: 'Add-ons',
        render: (_v, row) => {
          if (!row.addOns?.length) return <span className='text-sm text-gray-400'>—</span>
          const summary = row.addOns.map(a => `${a.addOn.name}×${a.quantity}`).join(', ')
          return <span className='text-sm font-semibold text-gray-700'>{summary}</span>
        },
      },
    ],
    [onCheckIn]
  )

  return <DataTable data={bookings} columns={columns} keyExtractor={b => b.id} pageSize={12} />
}

