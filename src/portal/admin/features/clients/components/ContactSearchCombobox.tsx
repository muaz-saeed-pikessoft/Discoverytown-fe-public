'use client'

import { useMemo, useState } from 'react'

import SearchInput from '@/components/shared/SearchInput'
import { useContacts } from '@/portal/admin/features/clients/hooks/useContacts'
import type { ContactSummary } from '@/types/clients.shared'

interface ContactSearchComboboxProps {
  value: string | null
  onChange: (contact: ContactSummary | null) => void
  placeholder?: string
}

export default function ContactSearchCombobox({
  value,
  onChange,
  placeholder = 'Search by name or email…',
}: ContactSearchComboboxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useContacts({ search: query })
  const contacts = data?.data ?? []

  const options = useMemo<ContactSummary[]>(
    () =>
      contacts.map(c => ({
        id: c.id,
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        contactType: c.contactType,
      })),
    [contacts]
  )

  const selected = useMemo(() => options.find(o => o.id === value) ?? null, [options, value])

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen(v => !v)}
        className='flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
        aria-expanded={open}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? `${selected.firstName} ${selected.lastName}` : placeholder}
        </span>
        <span className='text-xs font-black text-gray-400'>{open ? '▲' : '▼'}</span>
      </button>

      {open ? (
        <div className='absolute z-20 mt-2 w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_18px_60px_rgba(0,0,0,0.12)]'>
          <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
          <div className='mt-2 max-h-64 overflow-auto pr-1'>
            {isLoading ? (
              <div className='py-6 text-center text-xs font-semibold text-gray-500'>Loading…</div>
            ) : options.length ? (
              <div className='space-y-1'>
                {options.map(option => (
                  <button
                    key={option.id}
                    type='button'
                    onClick={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    className='w-full rounded-xl px-2 py-2 text-left transition hover:bg-gray-50'
                  >
                    <div className='text-sm font-black text-gray-900'>
                      {option.firstName} {option.lastName}
                    </div>
                    <div className='text-xs font-semibold text-gray-500'>{option.email ?? '—'}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className='py-6 text-center text-xs font-semibold text-gray-500'>No contacts found.</div>
            )}
          </div>

          <div className='mt-3 flex items-center justify-between gap-2'>
            <button
              type='button'
              onClick={() => {
                onChange(null)
                setOpen(false)
              }}
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

