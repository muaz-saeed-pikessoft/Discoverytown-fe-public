'use client'

import { useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import DocumentEditor from '@/portal/admin/features/clients/components/DocumentEditor'
import DocumentStatusRow from '@/portal/admin/features/clients/components/DocumentStatusRow'
import { useCreateDocument, useDocuments } from '@/portal/admin/features/clients/hooks/useDocuments'

export default function AdminClientsDocumentsPage() {
  const { data: docs = [], isLoading } = useDocuments()
  const createDocument = useCreateDocument()
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Documents'
        subtitle='Manage waivers and document templates.'
        actions={
          <button type='button' onClick={() => setOpen(v => !v)} className='h-10 rounded-xl bg-blue-600 px-3 text-xs font-black text-white'>
            {open ? 'Close Editor' : 'New Document'}
          </button>
        }
      />

      {open ? (
        <div className='rounded-2xl border border-gray-200 bg-white p-4'>
          <DocumentEditor
            onSubmit={values => {
              createDocument.mutate(values)
              setOpen(false)
            }}
          />
        </div>
      ) : null}

      {isLoading ? (
        <div className='rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-500'>Loading documents…</div>
      ) : (
        <div className='space-y-3'>
          {docs.map(document => (
            <DocumentStatusRow key={document.id} item={{ document, signature: null, isRequired: true }} />
          ))}
        </div>
      )}
    </div>
  )
}

