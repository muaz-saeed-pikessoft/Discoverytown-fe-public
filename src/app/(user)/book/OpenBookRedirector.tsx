'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import type { PublicService } from '@/types/scheduling.shared'

async function fetchServices(): Promise<PublicService[]> {
  const res = await fetch('/api/v1/services/public')
  if (!res.ok) return []
  return (await res.json()) as PublicService[]
}

export default function OpenBookRedirector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const serviceId = searchParams?.get('serviceId') ?? null
    const serviceType = searchParams?.get('serviceType') ?? null
    if (!serviceId || !serviceType) {
      setChecked(true)
      return
    }

    let cancelled = false
    void (async () => {
      const services = await fetchServices()
      const svc = services.find(s => s.id === serviceId)
      if (cancelled) return

      if (svc?.bookingMode === 'OPEN') {
        router.replace(ROUTES.USER.ACTIVITY_OPEN_BOOK(serviceType, serviceId))
        return
      }

      setChecked(true)
    })()

    return () => {
      cancelled = true
    }
  }, [router, searchParams])

  if (!checked) return null
  return null
}

