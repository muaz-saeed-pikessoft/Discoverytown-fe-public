'use client'

import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import ENV from '@/config/env'
import MswProvider, { useMswReady } from '@/mocks/MswProvider'
import { ThemeProvider } from '@/provider/theme-provider'
import reduxStore, { RootState } from '@/store/store'
import { isApiError } from '@/lib/api/errors'
import { login } from '@/store/slices/authSlice'

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

function MswGate({ children }: { children: React.ReactNode }) {
  const mswReady = useMswReady()

  // When mocks are enabled, block rendering of the query tree until the service
  // worker is active. This prevents initial requests from bypassing MSW.
  if (ENV.ENABLE_MOCKS && !mswReady) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center bg-[var(--dt-bg-page)] dt-font-body'>
        <div className='h-9 w-9 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Automatically logs in a development user if BYPASS_USER_AUTH is true.
 * Ensures the 'access_token' cookie and Redux state are present for a 
 * seamless dev experience without manual login.
 */
function DevAuthManager() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    if (ENV.BYPASS_USER_AUTH && !isAuthenticated) {
      // Set the legacy session cookie for middleware/API requests
      document.cookie = 'access_token=dev-token; path=/; max-age=86400'
      
      // Update Redux state to reflect 'logged-in' status for the UI
      dispatch(login({ 
        email: 'dev@discoverytown.dev', 
        name: 'Developer Bypass' 
      }))
    }
  }, [isAuthenticated, dispatch])

  return null
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
      <MswGate>
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
                    {ENV.BYPASS_USER_AUTH && <DevAuthManager />}
                    {children}
                  </NuqsAdapter>
                </MswQueryInvalidator>
              </QueryClientProvider>
            </Provider>
          </SessionProvider>
        </ThemeProvider>
      </MswGate>
    </MswProvider>
  )
}
