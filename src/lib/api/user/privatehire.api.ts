import axios from 'axios'

import ENV from '@/config/env'
import type { AvailabilityCell } from '@/types/scheduling.shared'

import { submitPrivateHireInquiry } from '@/lib/api/user/booking.api'

const publicClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  adapter: 'fetch',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

function withTenant(params: Record<string, unknown> | undefined): Record<string, unknown> {
  return { ...(params ?? {}), tenantId: ENV.TENANT_ID || undefined }
}

export async function getPrivateHireAvailability(
  locationId: string,
  from: string,
  to: string
): Promise<AvailabilityCell[]> {
  const response = await publicClient.get<AvailabilityCell[]>('/api/v1/private-hire/availability', {
    params: withTenant({ locationId, from, to }),
  })
  return response.data
}

export { submitPrivateHireInquiry }
