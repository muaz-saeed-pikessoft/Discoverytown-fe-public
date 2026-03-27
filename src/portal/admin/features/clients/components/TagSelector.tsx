'use client'

import { useMemo, useState } from 'react'

import SearchInput from '@/components/shared/SearchInput'
import TagPill from '@/portal/admin/features/clients/components/TagPill'
import type { Tag } from '@/types/clients.shared'

interface TagSelectorProps {
  tags: Tag[]
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}

export default function TagSelector({ tags, value, onChange, placeholder = 'Search tags…' }: TagSelectorProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tags
    return tags.filter(tag => tag.name.toLowerCase().includes(q))
  }, [query, tags])

  const selected = useMemo(() => tags.filter(tag => value.includes(tag.id)), [tags, value])

  function toggle(id: string) {
    if (value.includes(id)) onChange(value.filter(v => v !== id))
    else onChange([...value, id])
  }

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen(v => !v)}
        className='flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
        aria-expanded={open}
      >
        <div className='flex flex-1 flex-wrap gap-1'>
          {selected.length ? (
            selected.slice(0, 3).map(tag => <TagPill key={tag.id} name={tag.name} color={tag.color} />)
          ) : (
            <span className='text-gray-400'>{placeholder}</span>
          )}
          {selected.length > 3 ? (
            <span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-black text-gray-700'>
              +{selected.length - 3}
            </span>
          ) : null}
        </div>
        <span className='text-xs font-black text-gray-400'>{open ? '▲' : '▼'}</span>
      </button>

      {open ? (
        <div className='absolute z-20 mt-2 w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_18px_60px_rgba(0,0,0,0.12)]'>
          <SearchInput value={query} onChange={setQuery} placeholder='Search tags…' debounceMs={0} />
          <div className='mt-2 max-h-56 overflow-auto pr-1'>
            {filtered.length ? (
              <div className='space-y-1'>
                {filtered.map(tag => {
                  const checked = value.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      type='button'
                      onClick={() => toggle(tag.id)}
                      className='flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-50'
                    >
                      <span className='flex items-center gap-2'>
                        <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: tag.color }} />
                        {tag.name}
                      </span>
                      <span className={`text-xs font-black ${checked ? 'text-blue-600' : 'text-gray-300'}`}>✓</span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className='py-6 text-center text-xs font-semibold text-gray-500'>No tags found.</div>
            )}
          </div>
          <div className='mt-3 flex items-center justify-between gap-2'>
            <button
              type='button'
              onClick={() => onChange([])}
              className='h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-black text-gray-700 transition hover:bg-gray-50'
            >
              Clear
            </button>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='h-9 rounded-xl bg-blue-600 px-3 text-xs font-black text-white transition hover:bg-blue-700'
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

