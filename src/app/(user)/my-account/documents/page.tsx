'use client'

import AccountShell from '@/portal/user/features/account/components/AccountShell'
import SignDocumentWidget from '@/portal/user/features/account/components/SignDocumentWidget'
import { useMyDocuments, useSignMyDocument } from '@/portal/user/features/account/hooks/useMyDocuments'

export default function MyAccountDocumentsPage() {
  const documentsQuery = useMyDocuments()
  const signDocument = useSignMyDocument()
  const documents = documentsQuery.data ?? []

  return (
    <AccountShell title='Documents' subtitle='Review and sign any required waivers and agreements.'>
      <div className='space-y-4'>
        {documents.length === 0 ? (
          <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-8 text-center shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
            <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--dt-primary-light)] text-[22px]'>🧾</div>
            <div className='mt-4 text-[18px] font-black text-[var(--dt-navy)]'>No documents to sign</div>
            <div className='mt-2 text-[14px] font-semibold text-[var(--dt-text-body)]'>
              You&apos;re all set. If a new waiver is required, it will show up here.
            </div>
          </div>
        ) : (
          <div className='grid gap-4'>
            {documents.map(item => (
              <SignDocumentWidget
                key={item.document.id}
                title={item.document.title}
                content={item.document.content}
                onSubmit={values => signDocument.mutate({ documentId: item.document.id, input: values })}
              />
            ))}
          </div>
        )}
      </div>
    </AccountShell>
  )
}

