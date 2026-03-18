import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { PartyBookingValues } from '@/types/form-types'

type BookingState = {
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
    updatePartyBooking: (state, action: PayloadAction<Partial<PartyBookingValues>>) => {
      state.partyBooking = { ...state.partyBooking, ...action.payload }
    },
    resetPartyBooking: state => {
      state.partyBooking = {}
    },
    setDropInSlot: (state, action: PayloadAction<string | null>) => {
      state.dropInSelectedSlotId = action.payload
    },
  },
})

export const { updatePartyBooking, resetPartyBooking, setDropInSlot } = bookingSlice.actions

export default bookingSlice.reducer
