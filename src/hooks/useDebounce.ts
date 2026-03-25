import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const delay = Math.max(0, delayMs)
    const t = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(t)
  }, [delayMs, value])

  return debouncedValue
}

