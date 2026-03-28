import type { MetadataRoute } from 'next'

import ENV from '@/config/env'

export default function robots(): MetadataRoute.Robots {
  const base = ENV.SITE_URL || ENV.NEXTAUTH_URL || ''
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: base ? `${base}/sitemap.xml` : undefined,
  }
}

