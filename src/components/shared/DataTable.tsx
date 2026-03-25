import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import EmptyState from '@/components/shared/EmptyState'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import DataTableBase from '@/components/ui/DataTable'
import type { SortConfig, TableColumn } from '@/types/common'

interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  sortConfig?: SortConfig | null
  onSort?: (key: string) => void
  onSelect?: (id: string) => void
  onSelectAll?: () => void
  selectedIds?: Set<string>
  selectable?: boolean
  loading?: boolean
  empty?: ReactNode
  keyExtractor: (item: T) => string
  pageSize?: number
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  sortConfig,
  onSort,
  onSelect,
  onSelectAll,
  selectedIds,
  selectable,
  keyExtractor,
  loading = false,
  empty,
  pageSize = 10,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)

  const safePageSize = Math.max(1, pageSize)
  const totalPages = Math.max(1, Math.ceil(data.length / safePageSize))

  const currentPage = Math.min(page, totalPages)

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * safePageSize
    return data.slice(start, start + safePageSize)
  }, [currentPage, data, safePageSize])

  if (loading) return <LoadingSkeleton variant='table' rows={Math.min(8, safePageSize)} />

  if (data.length === 0) {
    return (
      <>
        {empty ?? (
          <EmptyState title='No results' description='There is nothing to show yet. Try adjusting your filters.' />
        )}
      </>
    )
  }

  return (
    <div className='space-y-3'>
      <DataTableBase
        data={pagedData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={onSort}
        selectable={selectable}
        onSelect={onSelect}
        onSelectAll={onSelectAll}
        selectedIds={selectedIds}
        keyExtractor={keyExtractor}
      />

      <div className='flex flex-col gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='text-xs font-bold text-gray-500'>
          Page <span className='text-gray-900'>{currentPage}</span> of <span className='text-gray-900'>{totalPages}</span>
        </div>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            disabled={currentPage <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Prev
          </button>
          <button
            type='button'
            disabled={currentPage >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

