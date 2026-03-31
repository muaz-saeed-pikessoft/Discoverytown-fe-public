import { permanentRedirect } from 'next/navigation'

export default function AdminCalendarPage() {
  // Unified calendar lives under Scheduling. Keep this route for backwards links.
  permanentRedirect('/admin/scheduling/calendar')
}
