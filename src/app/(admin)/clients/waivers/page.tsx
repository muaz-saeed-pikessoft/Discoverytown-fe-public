'use client'

import PageHeader from '@/components/shared/PageHeader'
import DocumentStatusRow from '@/portal/admin/features/clients/components/DocumentStatusRow'
import { useDocuments } from '@/portal/admin/features/clients/hooks/useDocuments'

export default function AdminClientsWaiversPage() {
  const { data: docs = [], isLoading } = useDocuments()

  return (
    <div className='space-y-4'>
      <PageHeader title='Waivers' subtitle='Manage signed waivers and expirations.' />
      {isLoading ? (
        <div className='rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-500'>Loading waivers…</div>
      ) : (
        <div className='space-y-3'>
          {docs.map(document => (
            <DocumentStatusRow
              key={document.id}
              item={{ document, signature: null, isRequired: true }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

