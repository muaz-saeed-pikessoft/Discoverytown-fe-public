/**
 * Common shared types used across the entire application.
 * Includes API envelope types, pagination, and generic utility types.
 */

/** Standard API response envelope */
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  statusCode: number
}

/** Paginated API response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

/** Pagination metadata from API */
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/** Pagination request parameters */
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

/** Sort direction type */
export type SortDirection = 'asc' | 'desc'

/** Sort configuration */
export interface SortConfig {
  key: string
  direction: SortDirection
}

/** Filter configuration */
export interface FilterConfig {
  key: string
  value: string | number | boolean
  operator?: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains'
}

/** Table column definition for DataTable component */
export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

/** User role enumeration */
export type UserRole = 'user' | 'admin' | 'super_admin'

/** Route guard configuration */
export interface RouteGuardConfig {
  requireAuth: boolean
  allowedRoles?: UserRole[]
  redirectTo: string
}

/** Select option for dropdowns */
export interface SelectOption {
  label: string
  value: string | number
}

/** Status badge variant */
export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'
