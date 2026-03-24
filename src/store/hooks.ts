/**
 * Typed Redux hooks.
 * Provides type-safe useAppDispatch and useAppSelector throughout the app.
 * Always use these instead of plain useDispatch/useSelector.
 */

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import type { RootState, AppDispatch } from './store'

/** Typed dispatch hook — use instead of plain useDispatch */
export const useAppDispatch: () => AppDispatch = useDispatch

/** Typed selector hook — use instead of plain useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
