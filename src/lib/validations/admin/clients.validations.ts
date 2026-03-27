import * as yup from 'yup'

import {
  BillingCycle,
  CommunicationChannel,
  ContactType,
  DocumentType,
  RelationshipType,
} from '@/types/clients.shared'

export const createContactSchema = yup.object({
  contactType: yup.mixed<ContactType>().oneOf(Object.values(ContactType)).required(),
  firstName: yup.string().min(1, 'First name is required').required('First name is required'),
  lastName: yup.string().min(1, 'Last name is required').required('Last name is required'),
  email: yup.string().email('Invalid email').nullable().defined(),
  phone: yup.string().nullable().defined(),
  dob: yup.string().nullable().defined(),
  gender: yup.string().nullable().defined(),
  address: yup.string().nullable().defined(),
  referralSource: yup.string().nullable().defined(),
  metadata: yup.object().default({}).required(),
  marketingOptIn: yup.boolean().required(),
  preferredChannel: yup.mixed<CommunicationChannel>().oneOf(Object.values(CommunicationChannel)).required(),
  tagIds: yup.array(yup.string().min(1)).optional(),
})

export const updateContactSchema = createContactSchema.partial()

export const addCreditSchema = yup.object({
  amount: yup.number().min(1, 'Amount must be at least 1').required('Amount is required'),
  reason: yup.string().min(1, 'Reason is required').required('Reason is required'),
})

export const signDocumentSchema = yup.object({
  signatureDataUrl: yup.string().min(1, 'Signature is required').required('Signature is required'),
  acceptedAt: yup.string().min(1, 'Accepted date is required').required('Accepted date is required'),
})

export const createTagSchema = yup.object({
  name: yup.string().min(1, 'Tag name is required').required('Tag name is required'),
  color: yup.string().min(3, 'Color is required').required('Color is required'),
  isAuto: yup.boolean().optional(),
})

export const createPlanSchema = yup.object({
  name: yup.string().min(1, 'Name is required').required('Name is required'),
  description: yup.string().nullable().defined(),
  billingCycle: yup.mixed<BillingCycle>().oneOf(Object.values(BillingCycle)).required(),
  price: yup.string().min(1, 'Price is required').required('Price is required'),
  benefits: yup.object().required(),
  isActive: yup.boolean().required(),
})

export const createPackSchema = yup.object({
  name: yup.string().min(1, 'Name is required').required('Name is required'),
  creditCount: yup.number().integer().min(1).required(),
  price: yup.string().min(1, 'Price is required').required('Price is required'),
  validityDays: yup.number().integer().min(1).required(),
  applicableServiceTypes: yup.array(yup.string().min(1)).min(1, 'Select at least one service type').required(),
  isActive: yup.boolean().required(),
})

export const addRelationshipSchema = yup.object({
  contactIdB: yup.string().min(1, 'Contact is required').required('Contact is required'),
  relationshipType: yup.mixed<RelationshipType>().oneOf(Object.values(RelationshipType)).required(),
  isPrimary: yup.boolean().required(),
  permissions: yup
    .object({
      canBook: yup.boolean().required(),
      canPay: yup.boolean().required(),
    })
    .required(),
})

export const createDocumentSchema = yup.object({
  documentType: yup.mixed<DocumentType>().oneOf(Object.values(DocumentType)).required(),
  title: yup.string().min(1).required(),
  content: yup.string().min(1).required(),
  requiresFor: yup.array(yup.mixed()).required(),
})

