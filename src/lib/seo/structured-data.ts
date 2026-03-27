import type { PublicServiceSlot } from '@/types/scheduling.shared'

export type StructuredDataBreadcrumbItem = { name: string; url: string }

export type TenantBranding = {
  name: string
  currency?: string
  logoUrl?: string
  websiteUrl?: string
  siteUrl: string
}

export function eventStructuredData(slot: PublicServiceSlot, tenant: TenantBranding): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: slot.service.name,
    startDate: slot.startAt,
    endDate: slot.endAt,
    description: slot.service.description ?? '',
    image: undefined,
    location: {
      '@type': 'Place',
      name: slot.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: slot.location.address ?? '',
        addressLocality: slot.location.city ?? '',
      },
    },
    offers: {
      '@type': 'Offer',
      price: slot.effectivePrice,
      priceCurrency: tenant.currency ?? 'USD',
      availability: slot.availableSpots > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `${tenant.siteUrl}/activities/${slot.service.serviceType.toLowerCase().replaceAll('_', '-')}/${slot.id}`,
    },
    organizer: {
      '@type': 'Organization',
      name: tenant.name,
      url: tenant.websiteUrl ?? tenant.siteUrl,
    },
  })
}

export function breadcrumbStructuredData(items: StructuredDataBreadcrumbItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  })
}

export function activityListingStructuredData(slots: PublicServiceSlot[], siteUrl: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: slots.map((slot, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/activities/${slot.service.serviceType.toLowerCase().replaceAll('_', '-')}/${slot.id}`,
      name: slot.service.name,
    })),
  })
}

