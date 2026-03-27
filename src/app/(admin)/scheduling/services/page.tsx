'use client'

import { useMemo, useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ErrorState from '@/components/shared/ErrorState'
import EmptyState from '@/components/shared/EmptyState'
import ServiceTypeBadge from '@/portal/admin/features/scheduling/components/ServiceTypeBadge'
import { useServices } from '@/portal/admin/features/scheduling/hooks/useServices'
import { useServiceCategories } from '@/portal/admin/features/scheduling/hooks/useServiceCategories'
import type { Service, ServiceCategory } from '@/portal/admin/features/scheduling/types'
import ServiceFormSlideOver from '@/portal/admin/features/scheduling/components/ServiceFormSlideOver'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
  useCreateService,
  useDeleteService,
  useDuplicateService,
  useReorderCategories,
  useUpdateService,
} from '@/portal/admin/features/scheduling/hooks/useServicesMutations'

export default function SchedulingServicesPage() {
  const servicesQuery = useServices({})
  const categoriesQuery = useServiceCategories()
  const [query, setQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('__all__')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const createService = useCreateService()
  const updateService = useUpdateService(editing?.id ?? '')
  const deleteService = useDeleteService()
  const duplicateService = useDuplicateService()
  const reorderCategories = useReorderCategories()
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)

  const services = servicesQuery.data?.data ?? []
  const categories = categoriesQuery.data ?? []

  const orderedCategories = useMemo(() => {
    return [...categories].sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder))
  }, [categories])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byQuery = q ? services.filter(s => s.name.toLowerCase().includes(q)) : services
    if (selectedCategoryId === '__all__') return byQuery
    return byQuery.filter(s => s.categoryId === selectedCategoryId)
  }, [query, services, selectedCategoryId])

  const grouped = useMemo(() => {
    const byCat = new Map<string, Service[]>()
    for (const s of filtered) {
      const key = s.categoryId
      byCat.set(key, [...(byCat.get(key) ?? []), s])
    }
    return byCat
  }, [filtered])

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const s of services) counts.set(s.categoryId, (counts.get(s.categoryId) ?? 0) + 1)
    return counts
  }, [services])

  function moveCategory(catId: string, direction: 'up' | 'down') {
    const idx = orderedCategories.findIndex(c => c.id === catId)
    if (idx < 0) return
    const next = [...orderedCategories]
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= next.length) return
    const tmp = next[idx]!
    next[idx] = next[targetIdx]!
    next[targetIdx] = tmp

    void reorderCategories.mutateAsync(next.map((c, i) => ({ id: c.id, displayOrder: i + 1 })))
  }

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Services'
        subtitle='Service catalog used for scheduling.'
        actions={
          <button
            type='button'
            onClick={() => {
              setEditing(null)
              setFormOpen(true)
            }}
            className='h-10 rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700'
          >
            New service
          </button>
        }
      />

      {servicesQuery.isLoading || categoriesQuery.isLoading ? (
        <LoadingSkeleton variant='page' />
      ) : servicesQuery.isError || categoriesQuery.isError ? (
        <ErrorState title='Failed to load services' onRetry={() => void servicesQuery.refetch()} />
      ) : services.length === 0 ? (
        <EmptyState title='No services' description='Create a service to start scheduling slots.' />
      ) : (
        <div className='grid gap-4 lg:grid-cols-[320px_1fr]'>
          <div className='rounded-2xl border border-gray-200 bg-white'>
            <div className='border-b border-gray-100 p-4'>
              <div className='text-sm font-black text-gray-900'>Categories</div>
              <div className='mt-1 text-xs font-semibold text-gray-600'>Reorder to control display priority.</div>
            </div>
            <div className='p-3'>
              <button
                type='button'
                onClick={() => setSelectedCategoryId('__all__')}
                className={[
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-black transition',
                  selectedCategoryId === '__all__' ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50 text-gray-900',
                ].join(' ')}
              >
                <span>All</span>
                <span className='text-xs font-black text-gray-500'>{services.length}</span>
              </button>

              <div className='mt-2 space-y-1'>
                {orderedCategories.map((cat, idx) => {
                  const count = categoryCounts.get(cat.id) ?? 0
                  return (
                    <div key={cat.id} className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className={[
                          'flex min-w-0 flex-1 items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-black transition',
                          selectedCategoryId === cat.id ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50 text-gray-900',
                        ].join(' ')}
                      >
                        <span className='truncate'>{cat.name}</span>
                        <span className='ml-2 text-xs font-black text-gray-500'>{count}</span>
                      </button>
                      <div className='flex shrink-0 items-center gap-1'>
                        <button
                          type='button'
                          disabled={idx === 0 || reorderCategories.isPending}
                          onClick={() => moveCategory(cat.id, 'up')}
                          className='h-9 w-9 rounded-xl border border-gray-200 bg-white text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                          aria-label='Move up'
                        >
                          ↑
                        </button>
                        <button
                          type='button'
                          disabled={idx === orderedCategories.length - 1 || reorderCategories.isPending}
                          onClick={() => moveCategory(cat.id, 'down')}
                          className='h-9 w-9 rounded-xl border border-gray-200 bg-white text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                          aria-label='Move down'
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='rounded-2xl border border-gray-200 bg-white p-4'>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Search services…'
                className='h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-900'
              />
            </div>

            {orderedCategories.map(cat => {
              const items = grouped.get(cat.id) ?? []
              if (!items.length) return null
              return (
                <div key={cat.id} className='rounded-2xl border border-gray-200 bg-white'>
                  <div className='flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4'>
                    <div>
                      <div className='text-sm font-black text-gray-900'>{cat.name}</div>
                      <div className='mt-1 text-xs font-semibold text-gray-500'>{items.length} services</div>
                    </div>
                  </div>
                  <div className='grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {items.map(s => (
                      <div key={s.id} className='rounded-2xl border border-gray-200 bg-white p-4'>
                        <div className='flex items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <div className='truncate text-sm font-black text-gray-900'>{s.name}</div>
                            <div className='mt-2'>
                              <ServiceTypeBadge serviceType={s.serviceType} />
                            </div>
                          </div>
                          <div className='shrink-0 text-sm font-black text-gray-900'>${s.basePrice}</div>
                        </div>
                        <div className='mt-3 grid grid-cols-3 gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3'>
                          <div>
                            <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Cap</div>
                            <div className='mt-1 text-sm font-black text-gray-900'>{s.capacity}</div>
                          </div>
                          <div>
                            <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Dur</div>
                            <div className='mt-1 text-sm font-black text-gray-900'>{s.durationMinutes}m</div>
                          </div>
                          <div>
                            <div className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Age</div>
                            <div className='mt-1 text-sm font-black text-gray-900'>
                              {s.ageMin ?? '—'}–{s.ageMax ?? '—'}
                            </div>
                          </div>
                        </div>
                        <div className='mt-4 flex flex-wrap items-center justify-end gap-2'>
                          <button
                            type='button'
                            onClick={() => {
                              setEditing(s)
                              setFormOpen(true)
                            }}
                            className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50'
                          >
                            Edit
                          </button>
                          <button
                            type='button'
                            onClick={() => void duplicateService.mutateAsync(s.id)}
                            disabled={duplicateService.isPending}
                            className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
                          >
                            Duplicate
                          </button>
                          <button
                            type='button'
                            onClick={() => setDeleteTarget(s)}
                            className='h-9 rounded-xl bg-red-50 px-3 text-xs font-black text-red-700 transition hover:bg-red-100'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <ServiceFormSlideOver
        open={formOpen}
        onOpenChange={open => {
          setFormOpen(open)
          if (!open) setEditing(null)
        }}
        categories={orderedCategories as ServiceCategory[]}
        initial={editing}
        isSubmitting={createService.isPending || updateService.isPending}
        onSubmit={async values => {
          if (editing) {
            await updateService.mutateAsync(values)
          } else {
            await createService.mutateAsync(values)
          }
          setFormOpen(false)
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={open => (open ? undefined : setDeleteTarget(null))}
        title='Delete service?'
        description='This will remove the service from the catalog.'
        confirmLabel='Delete'
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteService.mutateAsync(deleteTarget.id)
          setDeleteTarget(null)
        }}
        isLoading={deleteService.isPending}
      />
    </div>
  )
}

