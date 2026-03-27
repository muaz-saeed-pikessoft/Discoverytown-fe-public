import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import {
  cancelSubscription,
  createPlan,
  deletePlan,
  enrollContact,
  getPlans,
  pauseSubscription,
  resumeSubscription,
  updatePlan,
} from '@/lib/api/admin/clients.api'
import type { CreatePlanInput } from '@/types/clients.shared'

export function usePlans(filters?: object) {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN.CLIENTS.PLANS(filters),
    queryFn: () => getPlans(),
    staleTime: 300_000,
  })
}

export function useEnrollContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ contactId, planId, input }: { contactId: string; planId: string; input?: object }) =>
      enrollContact(contactId, planId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.PLANS({}) })
    },
  })
}

export function useCreatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreatePlanInput) => createPlan(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.PLANS({}) })
    },
  })
}

export function useUpdatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CreatePlanInput> }) => updatePlan(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.PLANS({}) })
    },
  })
}

export function useDeletePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN.CLIENTS.PLANS({}) })
    },
  })
}

export function usePauseSubscription() {
  return useMutation({
    mutationFn: ({ id, pauseUntil }: { id: string; pauseUntil: string }) => pauseSubscription(id, pauseUntil),
  })
}

export function useResumeSubscription() {
  return useMutation({
    mutationFn: (id: string) => resumeSubscription(id),
  })
}

export function useCancelSubscription() {
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => cancelSubscription(id, reason),
  })
}

