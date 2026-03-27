import SlotDetailPageClient from '@/portal/admin/features/scheduling/components/SlotDetailPageClient'

interface AdminSchedulingDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function AdminSchedulingDetailPage({ params }: AdminSchedulingDetailPageProps) {
  const { id } = await params
  return <SlotDetailPageClient slotId={id} />
}

