import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return
      setValue(JSON.parse(raw) as T)
    } catch {
      // ignore
    }
  }, [key])

  const setStoredValue = useCallback(
    (next: T) => {
      setValue(next)
      if (typeof window === 'undefined') return
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // ignore
      }
    },
    [key]
  )

  return [value, setStoredValue]
}

