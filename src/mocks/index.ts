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
  const mocksEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true'

  // NOTE: We intentionally allow MSW to run outside "development" as a temporary
  // demo mechanism (e.g. preview deployments) when mocks are explicitly enabled.
  if (isServer || !mocksEnabled) {
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
