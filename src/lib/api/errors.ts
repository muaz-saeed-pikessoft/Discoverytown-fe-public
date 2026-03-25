export class ApiError extends Error {
  public readonly code: string
  public readonly status: number
  public readonly details?: unknown

  constructor(code: string, message: string, status: number, details?: unknown) {
    super(message)
    this.code = code
    this.status = status
    this.details = details
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) return error.message
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred'
}

