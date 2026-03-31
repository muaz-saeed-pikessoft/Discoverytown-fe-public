/**
 * Admin Dashboard page.
 * Displays overview metrics and recent activity.
 */

'use client'

import { useMemo } from 'react'

import StatCard from '@/components/ui/StatCard'
import { MOCK_BOOKINGS } from '@/data/mockData'
import { useCalendarSlots } from '@/portal/admin/features/scheduling/hooks/useCalendarSlots'
import { usePrivateHireRequests } from '@/portal/admin/features/calendar/hooks/usePrivateHireRequests'
import { useContacts } from '@/portal/admin/features/clients/hooks/useContacts'
import { addDays, startOfDay } from '@/portal/admin/features/scheduling/utils/calendar-date-utils'
import { BookingStatus } from '@/types/scheduling.shared'

/** Dashboard stat configuration — config-driven rendering */
const DASHBOARD_STATS = [
  {
    id: 'total-bookings',
    label: 'Total Bookings',
    icon: '📅',
    color: '#2f6fed',
    bgColor: '#e8efff',
  },
  {
    id: 'active-users',
    label: 'Active Users',
    icon: '👥',
    color: '#169b8f',
    bgColor: '#e7f8f4',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    icon: '💰',
    color: '#d9922b',
    bgColor: '#fff8eb',
  },
  {
    id: 'pending',
    label: 'Pending Actions',
    icon: '⏳',
    color: '#ea6d57',
    bgColor: '#fff0eb',
  },
] as const

export default function AdminDashboardPage() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const todayRange = useMemo(() => ({ from: today.toISOString(), to: addDays(today, 1).toISOString() }), [today])

  const sessionsToday = useCalendarSlots(null, todayRange, null)
  const pendingPrivateHire = usePrivateHireRequests({ status: BookingStatus.PENDING, limit: 50 })

  const weekStart = useMemo(() => {
    const d = startOfDay(new Date())
    return addDays(d, -6)
  }, [])
  const newContacts = useContacts({
    createdFrom: weekStart.toISOString(),
    createdTo: addDays(startOfDay(new Date()), 1).toISOString(),
  })

  /** Calculate stats from data */
  const statValues = useMemo(() => {
    const confirmedCount = MOCK_BOOKINGS.filter(b => b.status === 'confirmed').length
    const totalRevenue = MOCK_BOOKINGS.reduce((sum, b) => sum + b.amount, 0)

    return {
      'total-bookings': sessionsToday.data ? String(sessionsToday.data.length) : '—',
      'active-users': '248',
      revenue: `$${totalRevenue.toLocaleString()}`,
      pending: pendingPrivateHire.data ? String(pendingPrivateHire.data.data.length) : confirmedCount.toString(),
    }
  }, [pendingPrivateHire.data, sessionsToday.data])

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='mt-1 text-sm text-gray-500'>Welcome back. Here is an overview of your Discovery Town platform.</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {DASHBOARD_STATS.map(stat => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={statValues[stat.id]}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-xl border border-gray-200 bg-white p-5'>
          <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Today’s sessions</div>
          <div className='mt-2 text-2xl font-black text-gray-900'>{sessionsToday.data ? sessionsToday.data.length : '—'}</div>
          <div className='mt-1 text-sm font-semibold text-gray-600'>Across all locations</div>
        </div>
        <div className='rounded-xl border border-gray-200 bg-white p-5'>
          <div className='text-xs font-black uppercase tracking-widest text-gray-500'>Pending private hire</div>
          <div className='mt-2 text-2xl font-black text-gray-900'>
            {pendingPrivateHire.data ? pendingPrivateHire.data.data.length : '—'}
          </div>
          <div className='mt-1 text-sm font-semibold text-gray-600'>Awaiting review</div>
        </div>
        <div className='rounded-xl border border-gray-200 bg-white p-5'>
          <div className='text-xs font-black uppercase tracking-widest text-gray-500'>New contacts (7 days)</div>
          <div className='mt-2 text-2xl font-black text-gray-900'>
            {newContacts.data ? newContacts.data.data.length : '—'}
          </div>
          <div className='mt-1 text-sm font-semibold text-gray-600'>Created recently</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className='mt-8 rounded-xl border border-gray-200 bg-white p-6'>
        <h2 className='mb-4 text-lg font-bold text-gray-900'>Recent Bookings</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500'>
                <th className='px-4 py-3'>Code</th>
                <th className='px-4 py-3'>Title</th>
                <th className='px-4 py-3'>Date</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3 text-right'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.slice(0, 5).map(booking => (
                <tr key={booking.id} className='border-b border-gray-100 transition-colors hover:bg-gray-50'>
                  <td className='px-4 py-3 font-mono text-xs font-semibold text-gray-600'>
                    {booking.confirmationCode}
                  </td>
                  <td className='px-4 py-3 font-medium text-gray-900'>{booking.title}</td>
                  <td className='px-4 py-3 text-gray-600'>{booking.date}</td>
                  <td className='px-4 py-3'>
                    <span
                      className={[
                        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        booking.status === 'confirmed'
                          ? 'bg-green-50 text-green-700'
                          : booking.status === 'completed'
                            ? 'bg-blue-50 text-blue-700'
                            : booking.status === 'cancelled'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-yellow-50 text-yellow-700',
                      ].join(' ')}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-right font-semibold text-gray-900'>${booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
