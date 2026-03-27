/**
 * MSW handler barrel export.
 *
 * Aggregates all domain-specific request handlers into a single
 * array consumed by the browser and server workers.
 */

import { authHandlers } from './authHandlers'
import { bookingHandlers } from './bookingHandlers'
import { commerceHandlers } from './commerceHandlers'
import { publicSchedulingHandlers } from './publicSchedulingHandlers'
import { schedulingHandlers } from './schedulingHandlers'
import { userHandlers } from './userHandlers'

export const handlers = [
  ...authHandlers,
  ...bookingHandlers,
  ...userHandlers,
  ...publicSchedulingHandlers,
  ...schedulingHandlers,
  ...commerceHandlers,
]
