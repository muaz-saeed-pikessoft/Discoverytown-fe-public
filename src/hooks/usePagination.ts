/**
 * usePagination hook.
 *
 * Manages pagination state: current page, page size, and offset calculation.
 * Framework-agnostic — works with any data source.
 */

import { useState, useMemo, useCallback } from 'react'

interface UsePaginationOptions {
  /** Total number of items */
  totalItems: number

  /** Items per page (default: 10) */
  initialPageSize?: number

  /** Initial page (default: 1) */
  initialPage?: number
}

interface UsePaginationReturn {
  /** Current page number (1-indexed) */
  currentPage: number

  /** Items per page */
  pageSize: number

  /** Total number of pages */
  totalPages: number

  /** Offset for API calls */
  offset: number

  /** Whether there is a next page */
  hasNextPage: boolean

  /** Whether there is a previous page */
  hasPreviousPage: boolean

  /** Go to a specific page */
  goToPage: (page: number) => void

  /** Go to the next page */
  nextPage: () => void

  /** Go to the previous page */
  previousPage: () => void

  /** Change the page size */
  setPageSize: (size: number) => void

  /** Reset to page 1 */
  reset: () => void
}

export function usePagination({
  totalItems,
  initialPageSize = 10,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize])

  const offset = useMemo(() => (currentPage - 1) * pageSize, [currentPage, pageSize])

  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const goToPage = useCallback(
    (page: number) => {
      const clampedPage = Math.max(1, Math.min(page, totalPages))
      setCurrentPage(clampedPage)
    },
    [totalPages]
  )

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }, [hasNextPage])

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1)
    }
  }, [hasPreviousPage])

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size)
    setCurrentPage(1)
  }, [])

  const reset = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    pageSize,
    totalPages,
    offset,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    reset,
  }
}
