import type { MetadataRoute } from 'next'

import ENV from '@/config/env'
import type { PublicService } from '@/types/scheduling.shared'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = ENV.SITE_URL || ENV.NEXTAUTH_URL || ''
  if (!base) return []

  async function fetchServices(): Promise<PublicService[]> {
    try {
      const tenantId = ENV.TENANT_ID ? `tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''
      const res = await fetch(`${base}/api/v1/services/public${tenantId ? `?${tenantId}` : ''}`, { next: { revalidate: 300 } })
      if (!res.ok) return []
      return (await res.json()) as PublicService[]
    } catch {
      return []
    }
  }

  // Consumer routes only for now. Slot-specific URLs will be added once public endpoints are implemented.
  const staticRoutes = ['/', '/activities', '/contact', '/book', '/membership', '/class-packs']

  const services = await fetchServices()
  const openServiceRoutes = services
    .filter(s => s.bookingMode === 'OPEN')
    .map(s => `/activities/${s.serviceType.toLowerCase().replaceAll('_', '-')}/${s.id}/book`)

  const routes = [...staticRoutes, ...openServiceRoutes]

  return routes.map(r => ({
    url: `${base}${r}`,
    changeFrequency: openServiceRoutes.includes(r) ? 'daily' : 'weekly',
    priority: r === '/' ? 1.0 : r === '/membership' ? 0.9 : r === '/class-packs' ? 0.8 : 0.8,
    lastModified: new Date(),
  }))
}

