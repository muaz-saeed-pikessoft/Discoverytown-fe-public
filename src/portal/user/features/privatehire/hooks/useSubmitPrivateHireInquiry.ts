import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { getApiErrorMessage } from '@/lib/api/errors'
import { submitPrivateHireInquiry } from '@/lib/api/user/privatehire.api'
import type { PrivateHireInquiryInput } from '@/portal/user/features/booking/types'

export function useSubmitPrivateHireInquiry() {
  return useMutation({
    mutationFn: (input: PrivateHireInquiryInput) => submitPrivateHireInquiry(input),
    onError: (e: unknown) => {
      toast.error(getApiErrorMessage(e))
    },
  })
}
