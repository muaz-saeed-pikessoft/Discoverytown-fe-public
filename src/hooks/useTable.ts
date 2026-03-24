/**
 * useTable hook.
 *
 * Manages table state: sorting, filtering, and row selection.
 * Designed to work with the DataTable component.
 */

import { useState, useMemo, useCallback } from 'react'

import type { SortConfig, SortDirection } from '@/types/common'

interface UseTableOptions<T> {
  /** Initial data set */
  data: T[]

  /** Default sort configuration */
  defaultSort?: SortConfig

  /** Enable multi-select (default: false) */
  multiSelect?: boolean
}

interface UseTableReturn<T> {
  /** Sorted and filtered data */
  processedData: T[]

  /** Current sort configuration */
  sortConfig: SortConfig | null

  /** Currently selected row IDs */
  selectedIds: Set<string>

  /** Search/filter query */
  searchQuery: string

  /** Toggle sort on a column */
  handleSort: (key: string) => void

  /** Toggle row selection */
  toggleSelect: (id: string) => void

  /** Select all rows */
  selectAll: () => void

  /** Deselect all rows */
  deselectAll: () => void

  /** Set the search query */
  setSearchQuery: (query: string) => void
}

export function useTable<T extends { id: string }>({
  data,
  defaultSort,
  multiSelect = false,
}: UseTableOptions<T>): UseTableReturn<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(defaultSort ?? null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        const nextDirection: SortDirection = prev.direction === 'asc' ? 'desc' : 'asc'

        return { key, direction: nextDirection }
      }

      return { key, direction: 'asc' }
    })
  }, [])

  const toggleSelect = useCallback(
    (id: string) => {
      setSelectedIds(prev => {
        const next = new Set(prev)

        if (next.has(id)) {
          next.delete(id)
        } else {
          if (!multiSelect) {
            next.clear()
          }
          next.add(id)
        }

        return next
      })
    },
    [multiSelect]
  )

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(data.map(row => row.id)))
  }, [data])

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const processedData = useMemo(() => {
    let result = [...data]

    /** Apply sorting */
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof T]
        const bVal = b[sortConfig.key as keyof T]

        if (aVal === bVal) return 0
        if (aVal == null) return 1
        if (bVal == null) return -1

        const comparison = aVal < bVal ? -1 : 1

        return sortConfig.direction === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [data, sortConfig])

  return {
    processedData,
    sortConfig,
    selectedIds,
    searchQuery,
    handleSort,
    toggleSelect,
    selectAll,
    deselectAll,
    setSearchQuery,
  }
}
