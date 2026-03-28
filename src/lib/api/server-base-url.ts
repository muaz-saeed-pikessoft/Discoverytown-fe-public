import { headers } from 'next/headers'

import ENV from '@/config/env'

export async function getServerApiBaseUrl(): Promise<string> {
  if (ENV.API_BASE_URL) return ENV.API_BASE_URL

  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'http'
  if (!host) return 'http://localhost:3000'
  return `${proto}://${host}`
}

