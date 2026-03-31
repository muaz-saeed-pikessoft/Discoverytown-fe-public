'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Link from 'next/link'

import PageHeader from '@/components/shared/PageHeader'
import EmptyState from '@/components/shared/EmptyState'
import ContactTypeBadge from '@/portal/admin/features/clients/components/ContactTypeBadge'
import MembershipCard from '@/portal/admin/features/clients/components/MembershipCard'
import CreditPackProgressBar from '@/portal/admin/features/clients/components/CreditPackProgressBar'
import AddCreditModal from '@/portal/admin/features/clients/components/AddCreditModal'
import AddRelationshipSlideOver from '@/portal/admin/features/clients/components/AddRelationshipSlideOver'
import { useContact } from '@/portal/admin/features/clients/hooks/useContact'
import { useContactSpendSummary } from '@/portal/admin/features/clients/hooks/useCredits'
import { useContactBookingHistory } from '@/portal/admin/features/clients/hooks/useContactBookingHistory'
import { useContactCreditLedger } from '@/portal/admin/features/clients/hooks/useContactCreditLedger'
import { useAddCredit } from '@/portal/admin/features/clients/hooks/useAddCredit'
import SignatureCanvas from '@/portal/admin/features/clients/components/SignatureCanvas'
import { useDocuments, useSendSigningRequest, useSignDocument } from '@/portal/admin/features/clients/hooks/useDocuments'
import DocumentStatusRow from '@/portal/admin/features/clients/components/DocumentStatusRow'
import { addRelationship } from '@/lib/api/admin/clients.api'
import DataTable from '@/components/shared/DataTable'
import type { TableColumn } from '@/types/common'
import BookingStatusBadge from '@/portal/admin/features/scheduling/components/BookingStatusBadge'
import { ROUTES } from '@/constants/routes'
import type { Document } from '@/types/clients.shared'
import type { Booking } from '@/types/scheduling.shared'

interface AdminClientDetailPageClientProps {
  id: string
}

export default function AdminClientDetailPageClient({ id }: AdminClientDetailPageClientProps) {
  const [showAddCredit, setShowAddCredit] = useState(false)
  const [showRelationship, setShowRelationship] = useState(false)
  const [activeTab, setActiveTab] = useState<'family' | 'waivers' | 'membership' | 'packs' | 'bookings' | 'ledger'>('family')
  const [signOpen, setSignOpen] = useState(false)
  const [signAccepted, setSignAccepted] = useState(false)
  const [signSignature, setSignSignature] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const { data: contact, isLoading } = useContact(id)
  const { data: spend } = useContactSpendSummary(id)
  const { data: bookings } = useContactBookingHistory(id)
  const { data: ledger } = useContactCreditLedger(id)
  const { data: docs } = useDocuments()
  const addCreditMutation = useAddCredit()
  const signMutation = useSignDocument()
  const sendRequestMutation = useSendSigningRequest()

  const relMutation = useMutation({
    mutationFn: (values: Parameters<typeof addRelationship>[1]) => addRelationship(id, values),
  })

  if (isLoading) {
    return (
      <div className='flex min-h-[320px] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent' />
      </div>
    )
  }

  if (!contact) {
    return <EmptyState title='Client not found' description='The requested client could not be loaded.' />
  }

  const docStatuses = (docs ?? []).map(document => ({
    document,
    signature: null,
    isRequired: true,
  }))

  return (
    <div>
      <PageHeader
        title={`${contact.firstName} ${contact.lastName}`}
        subtitle={`Client ID: ${contact.id}`}
        actions={
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setShowAddCredit(true)}
              className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700'
            >
              Add Credit
            </button>
            <button
              type='button'
              onClick={() => setShowRelationship(true)}
              className='h-9 rounded-xl bg-blue-600 px-3 text-xs font-black text-white'
            >
              Add Relationship
            </button>
          </div>
        }
      />

      <div className='grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]'>
        <aside className='rounded-2xl border border-gray-200 bg-white p-4'>
          <div className='text-lg font-black text-gray-900'>
            {contact.firstName} {contact.lastName}
          </div>
          <div className='mt-2'>
            <ContactTypeBadge type={contact.contactType} />
          </div>
          <div className='mt-3 space-y-1 text-sm font-semibold text-gray-600'>
            <div>{contact.email ?? '—'}</div>
            <div>{contact.phone ?? '—'}</div>
            <div>Credits: {contact.creditBalance}</div>
            <div>Total spend: ${spend?.totalSpend ?? contact.totalSpend}</div>
          </div>
        </aside>

        <main className='space-y-4'>
          <div className='flex flex-wrap gap-2'>
            {(['family', 'waivers', 'membership', 'packs', 'bookings', 'ledger'] as const).map(tab => (
              <button
                key={tab}
                type='button'
                onClick={() => setActiveTab(tab)}
                className={`h-9 rounded-xl px-3 text-xs font-black ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'border border-gray-200 bg-white text-gray-700'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {activeTab === 'family' ? (
            <div className='space-y-3'>
              <EmptyState title='Family relationships' description='Relationship list will be expanded with full linking flow.' />
            </div>
          ) : null}

          {activeTab === 'waivers' ? (
            <div className='space-y-3'>
              {docStatuses.map(item => (
                <DocumentStatusRow
                  key={item.document.id}
                  item={item}
                  onSendRequest={() => {
                    sendRequestMutation.mutate(
                      { documentId: item.document.id, contactId: id },
                      {
                        onSuccess: () => toast.success('Signing request sent.'),
                        onError: () => toast.error('Failed to send signing request.'),
                      }
                    )
                  }}
                  onSignNow={() => {
                    setSelectedDocument(item.document)
                    setSignAccepted(false)
                    setSignSignature('')
                    setSignOpen(true)
                  }}
                />
              ))}
            </div>
          ) : null}

          {activeTab === 'membership' ? (
            contact.activeSubscription ? (
              <MembershipCard subscription={contact.activeSubscription} />
            ) : (
              <EmptyState title='No membership' description='This client has no active membership.' />
            )
          ) : null}

          {activeTab === 'packs' ? (
            <div className='space-y-3'>
              {(contact.activePacks ?? []).map(pack => (
                <CreditPackProgressBar key={pack.id} pack={pack} />
              ))}
              {!contact.activePacks.length ? (
                <EmptyState title='No class packs' description='No active class packs for this client.' />
              ) : null}
            </div>
          ) : null}

          {activeTab === 'bookings' ? (
            <div className='rounded-2xl border border-gray-200 bg-white p-4'>
              <div className='mb-3 text-sm font-black text-gray-900'>Booking history</div>
              <DataTable
                data={(bookings?.data ?? []) as Booking[]}
                columns={
                  [
                    {
                      key: 'id',
                      label: 'Booking',
                      sortable: true,
                      render: (v, row) => (
                        <div className='min-w-0'>
                          <div className='font-mono text-xs font-black text-gray-800'>{String(v).slice(0, 8)}…</div>
                          <div className='text-xs font-semibold text-gray-500'>{row.bookingType}</div>
                        </div>
                      ),
                    },
                    {
                      key: 'service',
                      label: 'Service',
                      render: (_v, row) => (
                        <div className='min-w-0'>
                          <div className='truncate text-sm font-black text-gray-900'>{row.service.name}</div>
                          <div className='text-xs font-semibold text-gray-500'>{row.service.serviceType.replaceAll('_', ' ')}</div>
                        </div>
                      ),
                    },
                    {
                      key: 'startAt',
                      label: 'When',
                      sortable: true,
                      render: (_v, row) =>
                        row.startAt ? (
                          <span className='text-sm font-semibold text-gray-700'>{new Date(row.startAt).toLocaleString()}</span>
                        ) : (
                          <span className='text-sm text-gray-400'>—</span>
                        ),
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      sortable: true,
                      render: (_v, row) => <BookingStatusBadge status={row.status} />,
                    },
                    {
                      key: 'serviceSlotId',
                      label: 'Session',
                      align: 'right',
                      render: (_v, row) =>
                        row.serviceSlotId ? (
                          <Link
                            href={ROUTES.ADMIN.SCHEDULING_EVENT(row.serviceSlotId)}
                            className='text-xs font-black text-blue-700 hover:underline'
                          >
                            View session
                          </Link>
                        ) : (
                          <span className='text-xs text-gray-400'>—</span>
                        ),
                    },
                  ] as TableColumn<Booking>[]
                }
                keyExtractor={b => b.id}
                pageSize={10}
              />
            </div>
          ) : null}

          {activeTab === 'ledger' ? (
            <div className='rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold text-gray-600'>
              Ledger entries: {ledger?.data.length ?? 0}
            </div>
          ) : null}
        </main>
      </div>

      <AddCreditModal
        open={showAddCredit}
        onOpenChange={setShowAddCredit}
        onSubmit={values => {
          addCreditMutation.mutate({ contactId: id, amount: values.amount, reason: values.reason }, { onSuccess: () => setShowAddCredit(false) })
        }}
      />

      <AddRelationshipSlideOver
        open={showRelationship}
        onOpenChange={setShowRelationship}
        onSubmit={values => {
          relMutation.mutate(values, { onSuccess: () => setShowRelationship(false) })
        }}
      />

      {signOpen ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4'>
          <div className='w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <div className='text-lg font-black text-gray-900'>Sign waiver</div>
                <div className='mt-1 text-sm font-semibold text-gray-600'>{selectedDocument?.title ?? '—'}</div>
              </div>
              <button type='button' onClick={() => setSignOpen(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>
                Close
              </button>
            </div>

            <div className='mt-4'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                <input
                  type='checkbox'
                  checked={signAccepted}
                  onChange={e => setSignAccepted(e.target.checked)}
                />
                I confirm the client has reviewed and accepted this document.
              </label>
            </div>

            <div className='mt-4'>
              <SignatureCanvas onSave={setSignSignature} />
            </div>

            <div className='mt-4 flex justify-end gap-2'>
              <button type='button' onClick={() => setSignOpen(false)} className='h-9 rounded-lg border border-gray-200 px-3 text-xs font-black'>
                Cancel
              </button>
              <button
                type='button'
                disabled={!selectedDocument || !signAccepted || !signSignature || signMutation.isPending}
                onClick={() => {
                  if (!selectedDocument) return
                  signMutation.mutate(
                    {
                      documentId: selectedDocument.id,
                      input: { signatureDataUrl: signSignature, acceptedAt: new Date().toISOString() },
                    },
                    {
                      onSuccess: () => {
                        toast.success('Document signed.')
                        setSignOpen(false)
                      },
                      onError: () => toast.error('Failed to sign document.'),
                    }
                  )
                }}
                className='h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white disabled:opacity-60'
              >
                {signMutation.isPending ? 'Signing…' : 'Sign now'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

