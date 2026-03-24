/**
 * User API service.
 * Handles profile, children, and account operations.
 *
 * Currently returns mock data.
 * When backend is ready: replace mock returns with apiClient calls.
 */

import type { CustomerProfile, ChildProfile } from '@/types/booking-types'
import { MOCK_PROFILE } from '@/data/mockData'

// import apiClient from './client'

/** Profile update payload */
export interface UpdateProfilePayload {
  firstName: string
  lastName: string
  email: string
  phone: string
}

/** Add child payload */
export interface AddChildPayload {
  name: string
  dob: string
  allergies: string
  notes: string
}

/**
 * Fetch the current user's profile.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<CustomerProfile>('/users/profile')
 *   return data
 */
export async function getUserProfile(): Promise<CustomerProfile> {
  return { ...MOCK_PROFILE }
}

/**
 * Update the current user's profile.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.put<CustomerProfile>('/users/profile', payload)
 *   return data
 */
export async function updateUserProfile(payload: UpdateProfilePayload): Promise<CustomerProfile> {
  return {
    ...MOCK_PROFILE,
    ...payload,
  }
}

/**
 * Fetch the current user's children.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<ChildProfile[]>('/users/children')
 *   return data
 */
export async function getUserChildren(): Promise<ChildProfile[]> {
  return [...MOCK_PROFILE.children]
}

/**
 * Add a new child to the profile.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.post<ChildProfile>('/users/children', payload)
 *   return data
 */
export async function addChild(payload: AddChildPayload): Promise<ChildProfile> {
  return {
    id: `child-${Date.now()}`,
    ...payload,
  }
}
