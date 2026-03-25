/**
 * User API service.
 *
 * Handles profile and children operations via Axios.
 * MSW intercepts these calls in development; real backend handles them in production.
 *
 * API-READY: Only endpoint URLs need to change for production.
 */

import { adaptProfile } from '@/data/adapters/userAdapter'
import type { RawProfileResponse } from '@/data/adapters/userAdapter'
import type { ChildProfile, CustomerProfile } from '@/types/booking-types'

import apiClient from './client'

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
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getUserProfile(): Promise<CustomerProfile> {
  const { data } = await apiClient.get<RawProfileResponse>(
    '/api/users/profile',
  )

  return adaptProfile(data)
}

/**
 * Update the current user's profile.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function updateUserProfile(
  payload: UpdateProfilePayload,
): Promise<CustomerProfile> {
  const { data } = await apiClient.put<RawProfileResponse>(
    '/api/users/profile',
    {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
    },
  )

  return adaptProfile(data)
}

/**
 * Fetch the current user's children.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getUserChildren(): Promise<ChildProfile[]> {
  const profile = await getUserProfile()

  return profile.children
}

/**
 * Add a new child to the profile.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function addChild(
  payload: AddChildPayload,
): Promise<ChildProfile> {
  const { data } = await apiClient.post<{
    id: string
    name: string
    date_of_birth: string
    allergies: string
    notes: string
  }>('/api/users/children', {
    name: payload.name,
    date_of_birth: payload.dob,
    allergies: payload.allergies,
    notes: payload.notes,
  })

  return {
    id: data.id,
    name: data.name,
    dob: data.date_of_birth,
    allergies: data.allergies,
    notes: data.notes,
  }
}
