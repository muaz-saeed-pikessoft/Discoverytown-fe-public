/**
 * Redux store configuration.
 * Central store with all feature slices registered.
 */

import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import bookingReducer from './slices/bookingSlice'
import userReducer from './slices/userSlice'
import uiReducer from './slices/uiSlice'
import permissionReducer from './slices/permissionSlice'
import schedulingReducer from './slices/schedulingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    user: userReducer,
    ui: uiReducer,
    permission: permissionReducer,
    scheduling: schedulingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
