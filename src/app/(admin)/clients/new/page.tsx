'use client'

import { useRouter } from 'next/navigation'

import PageHeader from '@/components/shared/PageHeader'
import EditContactSlideOver from '@/portal/admin/features/clients/components/EditContactSlideOver'
import { useCreateContact } from '@/portal/admin/features/clients/hooks/useCreateContact'
import { ROUTES } from '@/constants/routes'

export default function AdminClientsNewPage() {
  const router = useRouter()
  const createContact = useCreateContact()

  return (
    <div>
      <PageHeader title='New client' subtitle='Add a new client or family.' />
      <EditContactSlideOver
        open={true}
        onOpenChange={open => {
          if (!open) router.push(ROUTES.ADMIN.CLIENTS)
        }}
        onSubmit={values => {
          createContact.mutate(values, {
            onSuccess: contact => {
              router.push(ROUTES.ADMIN.CLIENT(contact.id))
            },
          })
        }}
      />
    </div>
  )
}

