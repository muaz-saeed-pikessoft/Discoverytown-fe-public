/**
 * MSW browser worker setup.
 *
 * Creates a Service Worker instance for intercepting HTTP
 * requests in the browser environment during development.
 */

import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
