import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { CalendarView } from '@/portal/admin/features/scheduling/constants'
import type { CreateSlotInput, SlotFilters } from '@/portal/admin/features/scheduling/types'

interface SchedulingState {
  selectedLocationId: string | null
  calendarView: CalendarView
  calendarDate: string
  slotFilters: SlotFilters
  slotFormDraft: Partial<CreateSlotInput> | null
  activeSlotId: string | null
}

const STORAGE_KEYS = {
  SELECTED_LOCATION_ID: 'scheduling.selectedLocationId',
  CALENDAR_VIEW: 'scheduling.calendarView',
  CALENDAR_DATE: 'scheduling.calendarDate',
  SLOT_FILTERS: 'scheduling.slotFilters',
  SLOT_FORM_DRAFT: 'scheduling.slotFormDraft',
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

function getTodayIsoDate(): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const initialState: SchedulingState = {
  selectedLocationId: readLocalStorage<string | null>(STORAGE_KEYS.SELECTED_LOCATION_ID) ?? null,
  calendarView: (readLocalStorage<CalendarView>(STORAGE_KEYS.CALENDAR_VIEW) ?? 'month') as CalendarView,
  calendarDate: readLocalStorage<string>(STORAGE_KEYS.CALENDAR_DATE) ?? getTodayIsoDate(),
  slotFilters: readLocalStorage<SlotFilters>(STORAGE_KEYS.SLOT_FILTERS) ?? {},
  slotFormDraft: readLocalStorage<Partial<CreateSlotInput> | null>(STORAGE_KEYS.SLOT_FORM_DRAFT) ?? null,
  activeSlotId: null,
}

const schedulingSlice = createSlice({
  name: 'scheduling',
  initialState,
  reducers: {
    setSelectedLocationId: (state, action: PayloadAction<string | null>) => {
      state.selectedLocationId = action.payload
      writeLocalStorage(STORAGE_KEYS.SELECTED_LOCATION_ID, state.selectedLocationId)
    },
    setCalendarView: (state, action: PayloadAction<CalendarView>) => {
      state.calendarView = action.payload
      writeLocalStorage(STORAGE_KEYS.CALENDAR_VIEW, state.calendarView)
    },
    setCalendarDate: (state, action: PayloadAction<string>) => {
      state.calendarDate = action.payload
      writeLocalStorage(STORAGE_KEYS.CALENDAR_DATE, state.calendarDate)
    },
    setSlotFilters: (state, action: PayloadAction<SlotFilters>) => {
      state.slotFilters = action.payload
      writeLocalStorage(STORAGE_KEYS.SLOT_FILTERS, state.slotFilters)
    },
    setSlotFormDraft: (state, action: PayloadAction<Partial<CreateSlotInput> | null>) => {
      state.slotFormDraft = action.payload
      writeLocalStorage(STORAGE_KEYS.SLOT_FORM_DRAFT, state.slotFormDraft)
    },
    setActiveSlotId: (state, action: PayloadAction<string | null>) => {
      state.activeSlotId = action.payload
    },
    clearSlotFormDraft: state => {
      state.slotFormDraft = null
      writeLocalStorage(STORAGE_KEYS.SLOT_FORM_DRAFT, state.slotFormDraft)
    },
  },
})

export const {
  setSelectedLocationId,
  setCalendarView,
  setCalendarDate,
  setSlotFilters,
  setSlotFormDraft,
  setActiveSlotId,
  clearSlotFormDraft,
} = schedulingSlice.actions

export default schedulingSlice.reducer

