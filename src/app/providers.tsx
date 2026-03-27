'use client'

import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import MswProvider, { useMswReady } from '@/mocks/MswProvider'
import { ThemeProvider } from '@/provider/theme-provider'
import reduxStore from '@/store/store'
import { isApiError } from '@/lib/api/errors'

/**
 * Listens for MSW becoming ready and immediately invalidates all React Query
 * cache entries. This triggers a clean refetch of every active query so the
 * requests are now intercepted by the service worker instead of leaking through
 * to the Next.js dev server (which has no mock routes and returns 404).
 */
function MswQueryInvalidator({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const mswReady = useMswReady()

  useEffect(() => {
    if (mswReady) {
      queryClient.invalidateQueries()
    }
  }, [mswReady, queryClient])

  return <>{children}</>
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: (failureCount, error) => {
              if (isApiError(error) && error.status > 0 && error.status < 500) return false
              return failureCount < 2
            },
          },
        },
      })
  )

  return (
    <MswProvider>
      <ThemeProvider>
        <SessionProvider>
          <Provider store={reduxStore}>
            <QueryClientProvider client={queryClient}>
              <MswQueryInvalidator>
                <NuqsAdapter>
                  <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                  />
                  {children}
                </NuqsAdapter>
              </MswQueryInvalidator>
            </QueryClientProvider>
          </Provider>
        </SessionProvider>
      </ThemeProvider>
    </MswProvider>
  )
}
