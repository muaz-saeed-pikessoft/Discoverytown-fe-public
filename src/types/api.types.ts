export interface ApiErrorType {
  code: string
  message: string
  status: number
  details?: unknown
}

export type ApiResponse<T> = import('./common').ApiResponse<T>
export type PaginatedResponse<T> = import('./common').PaginatedResponse<T>

