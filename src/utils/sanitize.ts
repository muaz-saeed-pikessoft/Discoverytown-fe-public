/**
 * Input sanitization utilities.
 *
 * Prevents XSS and injection attacks by cleaning user-provided strings.
 * Use this on all form inputs and before rendering raw HTML.
 */

import DOMPurify from 'dompurify'

/**
 * Sanitize a string to prevent XSS.
 *
 * @param {string} value - Raw user input
 * @returns {string} - Clean, safe string
 */
export function sanitize(value: string): string {
  if (!value || typeof value !== 'string') return ''

  // Basic trim and DOMPurify cleaning
  const trimmed = value.trim()

  // In a real environment, we'd use the window object if available
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(trimmed)
  }

  // Minimal fallback for SSR environments if DOMPurify is not available
  return trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Sanitize an entire object of key-value pairs.
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj }

  Object.keys(result).forEach(key => {
    const val = result[key]
    if (typeof val === 'string') {
      result[key as keyof T] = sanitize(val) as any
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key as keyof T] = sanitizeObject(val) as any
    }
  })

  return result
}
