/**
 * Application environment configuration.
 * Centralizes all environment variable access with type safety and defaults.
 */

const ENV = {
  /** Base URL for the backend API */
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? '',

  /** Public tenantId for consumer (SEO/public) endpoints */
  TENANT_ID: process.env.NEXT_PUBLIC_TENANT_ID ?? '',

  /** Canonical public site URL (SEO) */
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? '',

  /** App environment label */
  APP_ENV: (process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? 'development') as
    | 'development'
    | 'staging'
    | 'production',

  /** Base URL for image assets */
  IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL ?? '',

  /** S3 bucket name */
  S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET ?? '',

  /** AWS region */
  AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION ?? '',

  /** Current environment mode */
  NODE_ENV: process.env.NODE_ENV ?? 'development',

  /** Whether we are in production */
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  /** Whether we are in development */
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',

  /** Whether MSW mock API is enabled */
  ENABLE_MOCKS: process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true',

  /** next-auth server-only env vars (read on server only) */
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
} as const

export default ENV
