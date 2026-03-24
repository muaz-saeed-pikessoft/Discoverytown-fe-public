/**
 * useBooking hook.
 *
 * Encapsulates the booking flow state and step navigation logic.
 * Works with React Query for data fetching and Redux for step state.
 */

import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updatePartyBooking, resetPartyBooking, setDropInSlot } from '@/store/slices/bookingSlice'
import type { PartyBookingValues } from '@/types/form-types'

export function useBooking() {
  const dispatch = useAppDispatch()
  const bookingState = useAppSelector(state => state.booking)

  /** Update party booking fields */
  const updateParty = useCallback(
    (values: Partial<PartyBookingValues>) => {
      dispatch(updatePartyBooking(values))
    },
    [dispatch]
  )

  /** Reset party booking */
  const resetParty = useCallback(() => {
    dispatch(resetPartyBooking())
  }, [dispatch])

  /** Select a drop-in time slot */
  const selectSlot = useCallback(
    (slotId: string | null) => {
      dispatch(setDropInSlot(slotId))
    },
    [dispatch]
  )

  return {
    ...bookingState,
    updateParty,
    resetParty,
    selectSlot,
  }
}
