import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface DateRangeValue {
  from: string | null
  to: string | null
}

interface UiState {
  sidebarCollapsed: boolean
  activeTheme: 'light' | 'dark'
  globalDateRange: DateRangeValue
  selectedLocationIds: string[]
  toastQueue: Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>
}

const STORAGE_KEYS = {
  SIDEBAR: 'ui.sidebarCollapsed',
  THEME: 'ui.activeTheme',
  DATE_RANGE: 'ui.globalDateRange',
  LOCATIONS: 'ui.selectedLocationIds',
} as const

function readLocalStorage<T>(key: string): T | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return undefined
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

function writeLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore write failures (quota / privacy mode)
  }
}

const initialState: UiState = {
  sidebarCollapsed: readLocalStorage<boolean>(STORAGE_KEYS.SIDEBAR) ?? false,
  activeTheme: (readLocalStorage<'light' | 'dark'>(STORAGE_KEYS.THEME) ?? 'light') === 'dark' ? 'dark' : 'light',
  globalDateRange: readLocalStorage<DateRangeValue>(STORAGE_KEYS.DATE_RANGE) ?? { from: null, to: null },
  selectedLocationIds: readLocalStorage<string[]>(STORAGE_KEYS.LOCATIONS) ?? [],
  toastQueue: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
      writeLocalStorage(STORAGE_KEYS.SIDEBAR, state.sidebarCollapsed)
    },
    toggleSidebarCollapsed: state => {
      state.sidebarCollapsed = !state.sidebarCollapsed
      writeLocalStorage(STORAGE_KEYS.SIDEBAR, state.sidebarCollapsed)
    },
    setActiveTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.activeTheme = action.payload
      writeLocalStorage(STORAGE_KEYS.THEME, state.activeTheme)
    },
    setGlobalDateRange: (state, action: PayloadAction<DateRangeValue>) => {
      state.globalDateRange = action.payload
      writeLocalStorage(STORAGE_KEYS.DATE_RANGE, state.globalDateRange)
    },
    setSelectedLocationIds: (state, action: PayloadAction<string[]>) => {
      state.selectedLocationIds = action.payload
      writeLocalStorage(STORAGE_KEYS.LOCATIONS, state.selectedLocationIds)
    },
    enqueueToast: (state, action: PayloadAction<{ id: string; type: 'success' | 'error' | 'info'; message: string }>) => {
      state.toastQueue.push(action.payload)
    },
    dequeueToast: (state, action: PayloadAction<string>) => {
      state.toastQueue = state.toastQueue.filter(t => t.id !== action.payload)
    },
    clearToastQueue: state => {
      state.toastQueue = []
    },
  },
})

export const {
  setSidebarCollapsed,
  toggleSidebarCollapsed,
  setActiveTheme,
  setGlobalDateRange,
  setSelectedLocationIds,
  enqueueToast,
  dequeueToast,
  clearToastQueue,
} = uiSlice.actions

export default uiSlice.reducer

