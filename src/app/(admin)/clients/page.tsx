'use client'

import Link from 'next/link'
import type { TableColumn } from '@/types/common'
import StatusBadge from '@/components/shared/StatusBadge'
import AdminTablePage from '@/portal/admin/components/AdminTablePage'
import ContactTypeBadge from '@/portal/admin/features/clients/components/ContactTypeBadge'
import TagPill from '@/portal/admin/features/clients/components/TagPill'
import { useContacts } from '@/portal/admin/features/clients/hooks/useContacts'
import { ROUTES } from '@/constants/routes'
import type { Contact } from '@/types/clients.shared'

export default function AdminClientsPage() {
  const { data, isLoading } = useContacts({})
  const rows = data?.data ?? []

  const columns: TableColumn<Contact>[] = [
    {
      key: 'firstName',
      label: 'Full Name',
      sortable: true,
      render: (_, row) => (
        <Link href={ROUTES.ADMIN.CLIENT(row.id)} className='font-black text-blue-700 hover:underline'>
          {row.firstName} {row.lastName}
        </Link>
      ),
    },
    { key: 'contactType', label: 'Type', sortable: true, render: v => <ContactTypeBadge type={v as Contact['contactType']} /> },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false },
    {
      key: 'tags',
      label: 'Tags',
      sortable: false,
      render: value => {
        const tags = (value as Contact['tags']) ?? []
        if (!tags.length) return <span className='text-xs font-semibold text-gray-400'>—</span>
        return (
          <div className='flex flex-wrap gap-1'>
            {tags.slice(0, 3).map(item => (
              <TagPill key={item.tagId} name={item.tag.name} color={item.tag.color} />
            ))}
          </div>
        )
      },
    },
    { key: 'creditBalance', label: 'Credits', sortable: true },
    { key: 'totalSpend', label: 'Total Spend', sortable: true, render: v => `$${v as string}` },
    {
      key: 'isActive',
      label: 'Status',
      sortable: true,
      render: v => <StatusBadge status={v ? 'active' : 'cancelled'} variant='membership' />,
    },
  ]

  return (
    <AdminTablePage
      title='Clients'
      subtitle='Manage your customer and family profiles'
      createAction={
        <Link
          href={ROUTES.ADMIN.CLIENTS_NEW}
          className='inline-flex h-10 items-center rounded-xl bg-blue-600 px-3 text-xs font-black text-white transition hover:bg-blue-700'
        >
          New Contact
        </Link>
      }
      data={rows}
      columns={columns}
      defaultSort={{ key: 'createdAt', direction: 'desc' }}
      searchableKeys={['id', 'firstName', 'lastName', 'email']}
      pageSize={10}
      isLoading={isLoading}
    />
  )
}

