/**
 * Application route constants.
 * Single source of truth for all route paths to prevent magic strings.
 */

export const ROUTES = {
  /** Public / user panel routes */
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  BOOK: '/book',
  PLAY: '/play',
  CAFE: '/cafeAndfood',
  EVENTS: '/events',
  GYM: '/gym',
  LEARN: '/learn',
  RENTALS: '/rentals',
  GIFTS: '/gifts',
  SHOP: '/shop',
  CHECKOUT: '/checkout',
  CONTACT: '/contact',
  MY_ACCOUNT: '/my-account',

  /** Admin panel routes */
  ADMIN_DASHBOARD: '/dashboard',
  ADMIN_USERS: '/users',
  ADMIN_BOOKINGS: '/bookings',
  ADMIN_SERVICES: '/services',
  ADMIN_SETTINGS: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
