/**
 * User Redux slice — NEW.
 *
 * Manages user profile, children, and preferences.
 * Separate from auth slice to follow single-responsibility principle.
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { CustomerProfile, ChildProfile } from '@/types/booking-types'

/** User state shape */
interface UserState {
  profile: CustomerProfile | null
  children: ChildProfile[]
  isProfileLoading: boolean
}

const initialState: UserState = {
  profile: null,
  children: [],
  isProfileLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** Set the full user profile */
    setProfile: (state, action: PayloadAction<CustomerProfile>) => {
      state.profile = action.payload
      state.children = action.payload.children
    },

    /** Update profile fields (partial update) */
    updateProfile: (state, action: PayloadAction<Partial<CustomerProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
    },

    /** Set children list */
    setChildren: (state, action: PayloadAction<ChildProfile[]>) => {
      state.children = action.payload
    },

    /** Add a single child */
    addChild: (state, action: PayloadAction<ChildProfile>) => {
      state.children.push(action.payload)
      if (state.profile) {
        state.profile.children = [...state.children]
      }
    },

    /** Update a child by ID */
    updateChild: (state, action: PayloadAction<{ id: string; updates: Partial<ChildProfile> }>) => {
      const index = state.children.findIndex(child => child.id === action.payload.id)
      if (index !== -1) {
        state.children[index] = {
          ...state.children[index],
          ...action.payload.updates,
        }
        if (state.profile) {
          state.profile.children = [...state.children]
        }
      }
    },

    /** Set profile loading state */
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isProfileLoading = action.payload
    },

    /** Clear all user data (on logout) */
    clearUser: state => {
      state.profile = null
      state.children = []
      state.isProfileLoading = false
    },
  },
})

export const { setProfile, updateProfile, setChildren, addChild, updateChild, setProfileLoading, clearUser } =
  userSlice.actions

export default userSlice.reducer
