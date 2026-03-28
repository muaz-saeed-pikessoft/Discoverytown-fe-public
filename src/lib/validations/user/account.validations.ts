import * as yup from 'yup'

import { CommunicationChannel } from '@/types/clients.shared'

export const updateProfileSchema = yup.object({
  firstName: yup.string().min(1, 'First name is required').required('First name is required'),
  lastName: yup.string().min(1, 'Last name is required').required('Last name is required'),
  phone: yup.string().nullable().defined(),
  address: yup.string().nullable().defined(),
  gender: yup.string().nullable().defined(),
  preferredChannel: yup.mixed<CommunicationChannel>().oneOf(Object.values(CommunicationChannel)).required(),
  marketingOptIn: yup.boolean().required(),
})

export const addFamilyMemberSchema = yup.object({
  firstName: yup.string().min(1, 'First name is required').required('First name is required'),
  lastName: yup.string().min(1, 'Last name is required').required('Last name is required'),
  dob: yup.string().min(1, 'Date of birth is required').required('Date of birth is required'),
  allergies: yup.array(yup.string().min(1)).required(),
  emergencyContact: yup
    .object({
      name: yup.string().min(1).required(),
      phone: yup.string().min(1).required(),
      relation: yup.string().min(1).required(),
    })
    .required(),
  schoolName: yup.string().optional(),
})

export const signDocumentSchema = yup.object({
  signatureDataUrl: yup.string().min(1, 'Signature is required').required('Signature is required'),
  acceptedAt: yup.string().min(1, 'Accepted date is required').required('Accepted date is required'),
})

export const subscribePlanSchema = yup.object({
  paymentMethodId: yup.string().min(1, 'Payment method is required').required('Payment method is required'),
  startDate: yup.string().optional(),
})

export const cancelSubscriptionSchema = yup.object({
  reason: yup.string().min(1, 'Reason is required').required('Reason is required'),
})

