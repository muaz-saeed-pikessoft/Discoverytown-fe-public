/**
 * MSW server setup.
 *
 * Creates a request interception server for Node.js environments
 * (SSR, testing). Uses the same handlers as the browser worker.
 */

import { setupServer } from 'msw/node'

import { handlers } from './handlers'

export const server = setupServer(...handlers)
