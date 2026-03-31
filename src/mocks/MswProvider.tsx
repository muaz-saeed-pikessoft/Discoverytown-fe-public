/**
 * MSW Provider component.
 *
 * Initializes Mock Service Worker in the browser before rendering
 * children. Only activates in development when NEXT_PUBLIC_ENABLE_MOCKS
 * is 'true'. In production this component is a transparent passthrough.
 *
 * Exposes `useMswReady()` so consumers (e.g. MswQueryInvalidator) can
 * detect when the service worker is active and trigger query refetches.
 */

'use client'

import ENV from '@/config/env'
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/** True once MSW is fully initialized (or immediately when mocks are disabled). */
const MswReadyContext = createContext<boolean>(false)

/** Returns true once the MSW service worker is active and ready to intercept requests. */
export function useMswReady(): boolean {
  return useContext(MswReadyContext)
}

interface MswProviderProps {
  readonly children: ReactNode
}

/**
 * Wraps the app to ensure MSW is initialized before any API calls.
 *
 * Children render immediately to avoid hydration mismatches. The `mswReady`
 * context flips to `true` once the SW is active, allowing `MswQueryInvalidator`
 * in providers.tsx to invalidate React Query's cache and trigger clean refetches.
 */
export default function MswProvider({ children }: MswProviderProps) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    // Temporary demo mechanism: allow MSW to run in preview/prod when
    // NEXT_PUBLIC_ENABLE_MOCKS is explicitly enabled.
    if (!ENV.ENABLE_MOCKS) {
      setMswReady(true)
      return
    }

    const startMocking = async () => {
      try {
        const { initMocks } = await import('@/mocks')
        await initMocks()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize MSW:', error)
      } finally {
        setMswReady(true)
      }
    }

    startMocking()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MswReadyContext.Provider value={mswReady}>
      {children}
    </MswReadyContext.Provider>
  )
}

