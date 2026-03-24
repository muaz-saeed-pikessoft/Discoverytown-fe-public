/**
 * Booking Redux slice — refactored.
 *
 * Preserves ALL existing logic and actions exactly.
 * Additions:
 * - resetAll action for logout cleanup
 * - Enhanced typing
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { PartyBookingValues } from '@/types/form-types'

/** Booking state shape */
interface BookingState {
  partyBooking: Partial<PartyBookingValues>
  dropInSelectedSlotId: string | null
}

const initialState: BookingState = {
  partyBooking: {},
  dropInSelectedSlotId: null,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    /** Update party booking fields (merge) */
    updatePartyBooking: (state, action: PayloadAction<Partial<PartyBookingValues>>) => {
      state.partyBooking = { ...state.partyBooking, ...action.payload }
    },

    /** Reset party booking to initial state */
    resetPartyBooking: state => {
      state.partyBooking = {}
    },

    /** Set the selected drop-in slot ID */
    setDropInSlot: (state, action: PayloadAction<string | null>) => {
      state.dropInSelectedSlotId = action.payload
    },

    /** Reset ALL booking state (for logout cleanup) */
    resetAll: () => initialState,
  },
})

export const { updatePartyBooking, resetPartyBooking, setDropInSlot, resetAll } = bookingSlice.actions

export default bookingSlice.reducer
