/**
 * Admin Users Management Page.
 *
 * Displays all users in a sortable, filterable table.
 */

'use client'

import React, { useMemo } from 'react'

import DataTable from '@/components/ui/DataTable'
import { useTable } from '@/hooks/useTable'
import type { TableColumn } from '@/types/common'

/** Mock user data for the admin panel demonstration */
const MOCK_ADMIN_USERS = [
  { id: '1', name: 'James Wilson', email: 'james@example.com', role: 'admin', joined: '2024-01-15' },
  { id: '2', name: 'Sarah Parker', email: 'sarah.p@gmail.com', role: 'user', joined: '2024-02-10' },
  { id: '3', name: 'Michael Chen', email: 'm.chen@outlook.com', role: 'user', joined: '2024-03-05' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena.r@yahoo.com', role: 'user', joined: '2024-03-12' },
  { id: '5', name: 'David Smith', email: 'd.smith@corp.com', role: 'user', joined: '2024-03-20' },
]

export default function AdminUsersPage() {
  const { processedData, handleSort, sortConfig } = useTable({
    data: MOCK_ADMIN_USERS,
    defaultSort: { key: 'joined', direction: 'desc' },
  })

  const columns: TableColumn<(typeof MOCK_ADMIN_USERS)[0]>[] = useMemo(
    () => [
      { key: 'name', label: 'Full Name', sortable: true },
      { key: 'email', label: 'Email Address', sortable: true },
      {
        key: 'role',
        label: 'Role',
        sortable: true,
        render: role => (
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
              role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
            }`}
          >
            {role as string}
          </span>
        ),
      },
      { key: 'joined', label: 'Joined Date', sortable: true },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className='flex gap-3'>
            <button className='text-[12px] font-bold text-blue-600 hover:underline'>Edit</button>
            {row.role !== 'admin' && (
              <button className='text-[12px] font-bold text-red-500 hover:underline'>Revoke</button>
            )}
          </div>
        ),
      },
    ],
    []
  )

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-black tracking-tight text-gray-900'>User Management</h1>
        <p className='mt-1 text-sm text-gray-500'>
          Manage system access, roles, and user permissions across the platform.
        </p>
      </div>

      <DataTable
        data={processedData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        keyExtractor={u => u.id}
      />
    </div>
  )
}
