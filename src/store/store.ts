/**
 * Redux store configuration.
 * Central store with all feature slices registered.
 */

import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import bookingReducer from './slices/bookingSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
