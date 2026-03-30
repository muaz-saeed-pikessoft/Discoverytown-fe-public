export default async function ActivitiesPage() {
  const { permanentRedirect } = await import('next/navigation')
  permanentRedirect('/play#browse-sessions')
}

