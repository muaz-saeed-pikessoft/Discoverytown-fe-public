import * as yup from 'yup'

export const approvePrivateHireSchema = yup.object({
  depositAmount: yup.number().min(0, 'Deposit must be 0 or more').optional(),
  internalNotes: yup.string().max(2000).optional(),
})

export const rejectPrivateHireSchema = yup.object({
  reason: yup.string().min(1, 'Reason is required').max(1000).required('Reason is required'),
})

export type ApprovePrivateHireFormValues = yup.InferType<typeof approvePrivateHireSchema>
export type RejectPrivateHireFormValues = yup.InferType<typeof rejectPrivateHireSchema>
