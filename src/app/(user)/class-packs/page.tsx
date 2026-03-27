import type { Metadata } from 'next'

import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'
import type { CreditPackDefinition } from '@/types/clients.shared'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Class Packs',
    description: 'Buy class packs and save on sessions at DiscoveryTown.',
    alternates: ENV.SITE_URL ? { canonical: `${ENV.SITE_URL}${ROUTES.USER.CLASS_PACKS}` } : undefined,
  }
}

export default async function ClassPacksPage() {
  const base = await getServerApiBaseUrl()
  const res = await fetch(`${base}/api/v1/credit-packs/definitions`, { next: { revalidate: 300 } })
  const packs = (res.ok ? ((await res.json()) as CreditPackDefinition[]) : []) ?? []

  return (
    <div className='dt-container py-10'>
      <div className='mb-6'>
        <h1 className='text-3xl font-black text-gray-900'>Class Packs</h1>
        <p className='mt-2 text-sm font-semibold text-gray-600'>Buy credits and use them across eligible activities.</p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {packs.map(pack => (
          <div key={pack.id} className='rounded-2xl border border-gray-200 bg-white p-5'>
            <div className='text-sm font-black text-gray-900'>{pack.name}</div>
            <div className='mt-1 text-2xl font-black text-blue-700'>${pack.price}</div>
            <div className='text-xs font-semibold text-gray-500'>
              {pack.creditCount} credits • {pack.validityDays} days
            </div>
            <div className='mt-3 flex flex-wrap gap-1'>
              {pack.applicableServiceTypes.map(type => (
                <span key={type} className='rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-700'>
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

