/**
 * MSW initialization entry point.
 *
 * Provides an async function to conditionally start the MSW
 * browser worker in development. Must be called before any
 * API requests are made.
 *
 * Environment guard ensures MSW never loads in production.
 */

/**
 * Initialize MSW mocking in the browser.
 *
 * Only starts in development when NEXT_PUBLIC_ENABLE_MOCKS is 'true'.
 * Returns immediately in production or server-side contexts.
 */
/** Prevents double-start from React 18 StrictMode or HMR re-runs */
let mswStartPromise: Promise<unknown> | null = null

export async function initMocks(): Promise<void> {
  const isServer = typeof window === 'undefined'
  const isDevelopment = process.env.NODE_ENV === 'development'
  const mocksEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true'

  if (isServer || !isDevelopment || !mocksEnabled) {
    return
  }

  if (mswStartPromise) {
    await mswStartPromise
    return
  }

  const { worker } = await import('./browser')

  mswStartPromise = worker.start({
    onUnhandledRequest: 'bypass',
    quiet: false,
  })

  await mswStartPromise
}
