import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { getMyProfile, updateMyProfile } from '@/lib/api/user/account.api'
import type { UpdateProfileInput } from '@/types/clients.shared'

export function useMyProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.MY_PROFILE,
    queryFn: () => getMyProfile(),
    staleTime: 60_000,
  })
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateMyProfile(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.MY_PROFILE })
    },
  })
}

