import type { PaginatedResponse } from '@/types/api.types'
import {
  BillingCycle,
  CommunicationChannel,
  ContactType,
  CreditPackStatus,
  CreditTransactionType,
  DocumentType,
  RelationshipType,
  SubscriptionStatus,
  type Contact,
  type ContactRelationship,
  type ContactSummary,
  type CreditLedgerEntry,
  type CreditPackDefinition,
  type CreditPackPurchase,
  type Document,
  type DocumentSignature,
  type Plan,
  type SubscriptionWithPlan,
  type Tag,
} from '@/types/clients.shared'
import type { Booking } from '@/types/scheduling.shared'

const tenantId = 'tenant-mock-1'

function nowIso(): string {
  return new Date().toISOString()
}

export function paginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    success: true,
    statusCode: 200,
    message: 'OK',
    data: items,
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: items.length,
      itemsPerPage: items.length,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }
}

export const tags: Tag[] = [
  { id: 'tag-vip', name: 'VIP', color: '#3B82F6', isAuto: false, contactCount: 1 },
  { id: 'tag-waiver', name: 'Waiver Pending', color: '#EF4444', isAuto: true, contactCount: 1 },
]

export const plans: Plan[] = [
  {
    id: 'plan-monthly',
    name: 'Monthly Member',
    description: 'Unlimited open play and discounted classes',
    billingCycle: BillingCycle.MONTHLY,
    price: '89.00',
    benefits: { discountedClasses: true, priorityBooking: true },
    isActive: true,
    subscriptionCount: 1,
  },
]

export const packDefinitions: CreditPackDefinition[] = [
  {
    id: 'pack-10',
    name: '10 Class Pack',
    creditCount: 10,
    price: '180.00',
    validityDays: 120,
    applicableServiceTypes: ['GYM_CLASS', 'WORKSHOP'],
    isActive: true,
  },
]

export const activeSubscription: SubscriptionWithPlan = {
  id: 'sub-1',
  planId: plans[0].id,
  plan: plans[0],
  status: SubscriptionStatus.ACTIVE,
  currentPeriodStart: nowIso(),
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString(),
  pausedUntil: null,
  cancelledAt: null,
}

export const purchasedPack: CreditPackPurchase = {
  id: 'purchase-1',
  packDefinitionId: packDefinitions[0].id,
  packDefinition: packDefinitions[0],
  creditsPurchased: 10,
  creditsRemaining: 6,
  pricePaid: '180.00',
  purchasedAt: nowIso(),
  expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60_000).toISOString(),
  status: CreditPackStatus.ACTIVE,
}

export const contacts: Contact[] = [
  {
    id: 'contact-parent-1',
    tenantId,
    contactType: ContactType.CUSTOMER,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 013-2222',
    dob: '1990-05-10',
    gender: 'female',
    address: '123 Discovery Way',
    referralSource: 'Website',
    metadata: { preferredSport: 'Gymnastics' },
    creditBalance: '6',
    totalSpend: '480.00',
    marketingOptIn: true,
    preferredChannel: CommunicationChannel.EMAIL,
    isActive: true,
    createdAt: nowIso(),
    deletedAt: null,
    tags: [{ tagId: tags[0].id, tag: tags[0], appliedAt: nowIso() }],
    activeSubscription,
    activePacks: [purchasedPack],
    mediaAttachments: [],
  },
  {
    id: 'contact-child-1',
    tenantId,
    contactType: ContactType.CHILD,
    firstName: 'Mia',
    lastName: 'Johnson',
    email: null,
    phone: null,
    dob: '2018-11-02',
    gender: null,
    address: null,
    referralSource: null,
    metadata: {
      allergies: ['Peanuts'],
      emergencyContact: { name: 'Sarah Johnson', phone: '(555) 013-2222', relation: 'Mother' },
      schoolName: 'Discovery Elementary',
    },
    creditBalance: '0',
    totalSpend: '0',
    marketingOptIn: false,
    preferredChannel: CommunicationChannel.EMAIL,
    isActive: true,
    createdAt: nowIso(),
    deletedAt: null,
    tags: [{ tagId: tags[1].id, tag: tags[1], appliedAt: nowIso() }],
    activeSubscription: null,
    activePacks: [],
    mediaAttachments: [],
  },
]

const parentSummary: ContactSummary = {
  id: contacts[0].id,
  firstName: contacts[0].firstName,
  lastName: contacts[0].lastName,
  email: contacts[0].email,
  contactType: contacts[0].contactType,
}

const childSummary: ContactSummary = {
  id: contacts[1].id,
  firstName: contacts[1].firstName,
  lastName: contacts[1].lastName,
  email: contacts[1].email,
  contactType: contacts[1].contactType,
}

export let relationships: ContactRelationship[] = [
  {
    id: 'rel-1',
    contactIdA: contacts[0].id,
    contactIdB: contacts[1].id,
    relationshipType: RelationshipType.PARENT_CHILD,
    isPrimary: true,
    permissions: { canBook: true, canPay: true },
    partner: childSummary,
  },
  {
    id: 'rel-2',
    contactIdA: contacts[1].id,
    contactIdB: contacts[0].id,
    relationshipType: RelationshipType.GUARDIAN,
    isPrimary: true,
    permissions: { canBook: false, canPay: false },
    partner: parentSummary,
  },
]

export let documents: Document[] = [
  {
    id: 'doc-waiver-1',
    documentType: DocumentType.WAIVER,
    title: 'Facility Waiver',
    content: '<p>Waiver content...</p>',
    version: 1,
    isActive: true,
    requiresFor: [{ contactType: ContactType.CUSTOMER }],
  },
]

export let signatures: DocumentSignature[] = []

export let creditLedgerByContact: Record<string, CreditLedgerEntry[]> = {
  [contacts[0].id]: [
    {
      id: 'ledger-1',
      transactionType: CreditTransactionType.PURCHASE,
      creditsChange: 10,
      balanceAfter: 10,
      bookingId: null,
      notes: '10 class pack purchased',
      createdAt: nowIso(),
    },
    {
      id: 'ledger-2',
      transactionType: CreditTransactionType.DEDUCTION,
      creditsChange: -4,
      balanceAfter: 6,
      bookingId: 'booking-1',
      notes: 'Classes used',
      createdAt: nowIso(),
    },
  ],
}

export let bookingsByContact: Record<string, Booking[]> = {
  [contacts[0].id]: [],
}

export let subscriptionsByContact: Record<string, SubscriptionWithPlan | null> = {
  [contacts[0].id]: activeSubscription,
  [contacts[1].id]: null,
}

export let packsByContact: Record<string, CreditPackPurchase[]> = {
  [contacts[0].id]: [purchasedPack],
  [contacts[1].id]: [],
}

