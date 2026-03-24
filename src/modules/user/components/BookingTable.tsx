import type { BookingTableProps } from './types'
import React from 'react'
import { formatCurrency, formatShortDate } from '@/utils/formatters'
import type { BookingRecord } from '@/types/booking-types'

const STATUS_BADGE: Record<string, string> = {
  confirmed: 'badge-success',
  waitlisted: 'badge-warning',
  cancelled: 'badge-error',
  completed: 'badge-ghost',
}

const TYPE_EMOJI: Record<string, string> = {
  'drop-in': '🎪',
  class: '🎨',
  event: '🎡',
  party: '🎉',
}

export default function BookingTable({ bookings, activeTab, openCancelModal }: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className='py-12 text-center text-base-content/50'>
        <p className='text-4xl mb-2'>📭</p>
        <p>No bookings here yet.</p>
      </div>
    )
  }

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra'>
        <thead>
          <tr>
            <th>Experience</th>
            <th>Date & Time</th>
            <th>Guests</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Code</th>
            {activeTab === 'upcoming' && <th></th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>
                <div className='flex items-center gap-2'>
                  <span>{TYPE_EMOJI[booking.type] ?? '📋'}</span>
                  <span className='font-medium text-sm'>{booking.title}</span>
                </div>
              </td>
              <td className='text-sm text-base-content/70'>
                <div>{formatShortDate(booking.date)}</div>
                <div className='text-xs text-base-content/50'>{booking.time}</div>
              </td>
              <td className='text-sm text-base-content/70'>{booking.guests.map((g: any) => g.name).join(', ')}</td>
              <td className='font-medium'>{booking.amount > 0 ? formatCurrency(booking.amount) : '—'}</td>
              <td>
                <span className={`badge badge-sm ${STATUS_BADGE[booking.status]}`}>{booking.status}</span>
              </td>
              <td className='text-xs text-base-content/50'>{booking.confirmationCode}</td>
              {activeTab === 'upcoming' && (
                <td>
                  {booking.status === 'confirmed' && openCancelModal && (
                    <button
                      className='btn btn-ghost btn-xs text-error'
                      type='button'
                      onClick={() => openCancelModal(booking)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
