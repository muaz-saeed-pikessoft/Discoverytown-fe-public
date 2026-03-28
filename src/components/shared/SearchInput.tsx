'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export default function SearchInput({ value, onChange, placeholder = 'Search...', debounceMs = 300 }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const delay = useMemo(() => Math.max(0, debounceMs), [debounceMs])

  useEffect(() => {
    const t = window.setTimeout(() => onChange(internalValue), delay)
    return () => window.clearTimeout(t)
  }, [delay, internalValue, onChange])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInternalValue(e.target.value)
  }

  return (
    <div className='relative w-full'>
      <input
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className='h-10 w-full rounded-xl border border-gray-200 bg-white px-3 pr-10 text-sm font-semibold text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
      />
      {internalValue ? (
        <button
          type='button'
          aria-label='Clear search'
          onClick={() => setInternalValue('')}
          className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-black text-gray-400 transition hover:bg-gray-50 hover:text-gray-700'
        >
          ✕
        </button>
      ) : null}
    </div>
  )
}

