/**
 * Application environment configuration.
 * Centralizes all environment variable access with type safety and defaults.
 */

const ENV = {
  /** Base URL for the backend API */
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? '',

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
} as const

export default ENV
