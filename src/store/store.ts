import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/authSlice'
import bookingReducer from './reducers/bookingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
