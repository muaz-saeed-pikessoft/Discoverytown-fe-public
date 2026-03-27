export enum ContactType {
  CUSTOMER = 'CUSTOMER',
  CHILD = 'CHILD',
  CORPORATE = 'CORPORATE',
  LEAD = 'LEAD',
  VENDOR = 'VENDOR',
  STAFF = 'STAFF',
}

export enum RelationshipType {
  PARENT_CHILD = 'PARENT_CHILD',
  GUARDIAN = 'GUARDIAN',
  CO_PARENT = 'CO_PARENT',
  EMERGENCY_CONTACT = 'EMERGENCY_CONTACT',
  EMPLOYER_EMPLOYEE = 'EMPLOYER_EMPLOYEE',
  CORPORATE_MEMBER = 'CORPORATE_MEMBER',
}

export enum SubscriptionStatus {
  TRIALING = 'TRIALING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  PAST_DUE = 'PAST_DUE',
  EXPIRED = 'EXPIRED',
}

export enum CreditPackStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  EXHAUSTED = 'EXHAUSTED',
}

export enum CreditTransactionType {
  PURCHASE = 'PURCHASE',
  DEDUCTION = 'DEDUCTION',
  REFUND = 'REFUND',
  EXPIRY = 'EXPIRY',
  MANUAL_ADD = 'MANUAL_ADD',
  MANUAL_REMOVE = 'MANUAL_REMOVE',
}

export enum DocumentType {
  WAIVER = 'WAIVER',
  PARENTAL_CONSENT = 'PARENTAL_CONSENT',
  MEMBERSHIP_TERMS = 'MEMBERSHIP_TERMS',
  FACILITY_RULES = 'FACILITY_RULES',
  CONTRACT = 'CONTRACT',
  CUSTOM = 'CUSTOM',
}

export enum BillingCycle {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

export enum CommunicationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

export interface Tag {
  id: string
  name: string
  color: string
  isAuto: boolean
  contactCount?: number
}

export interface ContactTagWithTag {
  tagId: string
  tag: Tag
  appliedAt: string
}

export interface Plan {
  id: string
  name: string
  description: string | null
  billingCycle: BillingCycle
  price: string
  benefits: Record<string, unknown>
  isActive: boolean
  subscriptionCount?: number
}

export interface SubscriptionWithPlan {
  id: string
  planId: string
  plan: Plan
  status: SubscriptionStatus
  currentPeriodStart: string
  currentPeriodEnd: string
  pausedUntil: string | null
  cancelledAt: string | null
}

export interface CreditPackDefinition {
  id: string
  name: string
  creditCount: number
  price: string
  validityDays: number
  applicableServiceTypes: string[]
  isActive: boolean
}

export interface CreditPackPurchase {
  id: string
  packDefinitionId: string
  packDefinition: CreditPackDefinition
  creditsPurchased: number
  creditsRemaining: number
  pricePaid: string
  purchasedAt: string
  expiresAt: string
  status: CreditPackStatus
}

export interface CreditLedgerEntry {
  id: string
  transactionType: CreditTransactionType
  creditsChange: number
  balanceAfter: number
  bookingId: string | null
  notes: string | null
  createdAt: string
}

export interface ContactSummary {
  id: string
  firstName: string
  lastName: string
  email: string | null
  contactType: ContactType
}

export interface Contact {
  id: string
  tenantId: string
  contactType: ContactType
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
  dob: string | null
  gender: string | null
  address: string | null
  referralSource: string | null
  metadata: {
    allergies?: string[]
    emergencyContact?: { name: string; phone: string; relation: string }
    schoolName?: string
    companyName?: string
    membershipCardNumber?: string
    preferredSport?: string
  }
  creditBalance: string
  totalSpend: string
  marketingOptIn: boolean
  preferredChannel: CommunicationChannel
  isActive: boolean
  createdAt: string
  deletedAt: string | null
  tags: ContactTagWithTag[]
  activeSubscription: SubscriptionWithPlan | null
  activePacks: CreditPackPurchase[]
  mediaAttachments: { role: string; file: { filePath: string } }[]
}

export interface ContactRelationship {
  id: string
  contactIdA: string
  contactIdB: string
  relationshipType: RelationshipType
  isPrimary: boolean
  permissions: { canBook: boolean; canPay: boolean }
  partner: ContactSummary
}

export interface Document {
  id: string
  documentType: DocumentType
  title: string
  content: string
  version: number
  isActive: boolean
  requiresFor: unknown[]
}

export interface DocumentSignature {
  id: string
  documentId: string
  document: { title: string; version: number; documentType: DocumentType }
  signedAt: string
  documentVersion: number
  isValid: boolean
}

export interface SpendSummary {
  totalSpend: string
  lastBookingAt: string | null
}

export interface ContactFilters {
  search?: string
  contactTypes?: ContactType[]
  tagIds?: string[]
  subscriptionStatus?: SubscriptionStatus | 'NONE'
  hasActivePack?: boolean
  hasCredits?: boolean
  createdFrom?: string
  createdTo?: string
}

export interface DocumentSignatureStatus {
  document: Document
  signature: DocumentSignature | null
  isRequired: boolean
}

export interface CreateContactInput {
  contactType: ContactType
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
  dob: string | null
  gender: string | null
  address: string | null
  referralSource: string | null
  metadata: Contact['metadata']
  marketingOptIn: boolean
  preferredChannel: CommunicationChannel
  tagIds?: string[]
}

export type UpdateContactInput = Partial<CreateContactInput> & {
  isActive?: boolean
}

export interface CreateRelationshipInput {
  contactIdB: string
  relationshipType: RelationshipType
  isPrimary: boolean
  permissions: { canBook: boolean; canPay: boolean }
}

export interface CreateDocumentInput {
  documentType: DocumentType
  title: string
  content: string
  requiresFor: unknown[]
}

export interface SignDocumentInput {
  signatureDataUrl: string
  acceptedAt: string
}

export interface CreatePlanInput {
  name: string
  description: string | null
  billingCycle: BillingCycle
  price: string
  benefits: Record<string, unknown>
  isActive: boolean
}

export interface CreatePackInput {
  name: string
  creditCount: number
  price: string
  validityDays: number
  applicableServiceTypes: string[]
  isActive: boolean
}

export interface PurchasePackInput {
  paymentMethodId: string
}

export interface UpdateProfileInput {
  firstName: string
  lastName: string
  phone: string | null
  address: string | null
  gender: string | null
  preferredChannel: CommunicationChannel
  marketingOptIn: boolean
}

export interface AddFamilyMemberInput {
  firstName: string
  lastName: string
  dob: string
  allergies: string[]
  emergencyContact: { name: string; phone: string; relation: string }
  schoolName?: string
}

export interface SubscribeInput {
  paymentMethodId: string
  startDate?: string
}

