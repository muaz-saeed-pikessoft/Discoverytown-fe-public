import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import AdminClientDetailPageClient from '@/portal/admin/features/clients/components/AdminClientDetailPageClient'

interface AdminClientDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function AdminClientDetailPage({ params }: AdminClientDetailPageProps) {
  const { id } = await params

  const reservedRoute = (
    {
      documents: ROUTES.ADMIN.CLIENTS_DOCUMENTS,
      waivers: ROUTES.ADMIN.CLIENTS_WAIVERS,
      memberships: ROUTES.ADMIN.CLIENTS_MEMBERSHIPS,
      'class-packs': ROUTES.ADMIN.CLIENTS_CLASS_PACKS,
      tags: ROUTES.ADMIN.CLIENTS_TAGS,
      new: ROUTES.ADMIN.CLIENTS_NEW,
    } as const
  )[id as 'documents' | 'waivers' | 'memberships' | 'class-packs' | 'tags' | 'new']

  if (reservedRoute) {
    redirect(reservedRoute)
  }

  return <AdminClientDetailPageClient id={id} />
}

