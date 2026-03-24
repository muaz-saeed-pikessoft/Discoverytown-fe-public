/**
 * User data adapter.
 *
 * Transforms raw API user/profile responses into application-level types.
 */

import type { CustomerProfile, ChildProfile } from '@/types/booking-types'

/** Raw API profile shape (predicted backend contract) */
export interface RawProfileResponse {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  member_since: string
  membership_type: string
  children: Array<{
    id: string
    name: string
    date_of_birth: string
    allergies: string
    notes: string
  }>
}

/**
 * Transform a raw profile response into CustomerProfile.
 */
export function adaptProfile(raw: RawProfileResponse): CustomerProfile {
  return {
    id: raw.id,
    firstName: raw.first_name,
    lastName: raw.last_name,
    email: raw.email,
    phone: raw.phone,
    memberSince: raw.member_since,
    membershipType: raw.membership_type as CustomerProfile['membershipType'],
    children: raw.children.map(adaptChild),
  }
}

/**
 * Transform a raw child record.
 */
function adaptChild(raw: RawProfileResponse['children'][number]): ChildProfile {
  return {
    id: raw.id,
    name: raw.name,
    dob: raw.date_of_birth,
    allergies: raw.allergies,
    notes: raw.notes,
  }
}
