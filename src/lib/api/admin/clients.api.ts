import apiClient from '@/api/client'
import type { PaginatedResponse } from '@/types/api.types'
import type { Booking } from '@/types/scheduling.shared'
import type {
  Contact,
  ContactFilters,
  ContactRelationship,
  ContactSummary,
  CreateContactInput,
  CreateDocumentInput,
  CreatePackInput,
  CreatePlanInput,
  CreateRelationshipInput,
  CreditLedgerEntry,
  CreditPackDefinition,
  CreditPackPurchase,
  Document,
  DocumentSignature,
  Plan,
  PurchasePackInput,
  SignDocumentInput,
  SpendSummary,
  SubscriptionWithPlan,
  Tag,
  UpdateContactInput,
} from '@/types/clients.shared'

export async function getContacts(params: ContactFilters): Promise<PaginatedResponse<Contact>> {
  const response = await apiClient.get<PaginatedResponse<Contact>>('/api/v1/admin/clients/contacts', { params })
  return response.data
}

export async function getContact(id: string): Promise<Contact> {
  const response = await apiClient.get<Contact>(`/api/v1/admin/clients/contacts/${id}`)
  return response.data
}

export async function createContact(input: CreateContactInput): Promise<Contact> {
  const response = await apiClient.post<Contact>('/api/v1/admin/clients/contacts', input)
  return response.data
}

export async function updateContact(id: string, input: UpdateContactInput): Promise<Contact> {
  const response = await apiClient.patch<Contact>(`/api/v1/admin/clients/contacts/${id}`, input)
  return response.data
}

export async function softDeleteContact(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/contacts/${id}`)
}

export async function mergeContacts(sourceId: string, targetId: string): Promise<Contact> {
  const response = await apiClient.post<Contact>('/api/v1/admin/clients/contacts/merge', { sourceId, targetId })
  return response.data
}

export async function addCredit(contactId: string, amount: number, reason: string): Promise<void> {
  await apiClient.post(`/api/v1/admin/clients/contacts/${contactId}/credit`, { amount, reason })
}

export async function exportContactData(contactId: string): Promise<Blob> {
  const response = await apiClient.get<Blob>(`/api/v1/admin/clients/contacts/${contactId}/export`, { responseType: 'blob' })
  return response.data
}

export async function getContactBookingHistory(contactId: string, params?: object): Promise<PaginatedResponse<Booking>> {
  const response = await apiClient.get<PaginatedResponse<Booking>>(`/api/v1/admin/clients/contacts/${contactId}/bookings`, { params })
  return response.data
}

export async function getContactSpendSummary(contactId: string): Promise<SpendSummary> {
  const response = await apiClient.get<SpendSummary>(`/api/v1/admin/clients/contacts/${contactId}/spend`)
  return response.data
}

export async function getContactCreditLedger(
  contactId: string,
  params?: object
): Promise<PaginatedResponse<CreditLedgerEntry>> {
  const response = await apiClient.get<PaginatedResponse<CreditLedgerEntry>>(
    `/api/v1/admin/clients/contacts/${contactId}/credit-ledger`,
    { params }
  )
  return response.data
}

export async function addRelationship(contactId: string, input: CreateRelationshipInput): Promise<ContactRelationship> {
  const response = await apiClient.post<ContactRelationship>(`/api/v1/admin/clients/contacts/${contactId}/relationships`, input)
  return response.data
}

export async function updateRelationship(id: string, input: Partial<CreateRelationshipInput>): Promise<ContactRelationship> {
  const response = await apiClient.patch<ContactRelationship>(`/api/v1/admin/clients/relationships/${id}`, input)
  return response.data
}

export async function removeRelationship(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/relationships/${id}`)
}

export async function getTags(): Promise<Tag[]> {
  const response = await apiClient.get<Tag[]>('/api/v1/admin/clients/tags')
  return response.data
}

export async function createTag(input: { name: string; color: string; isAuto?: boolean }): Promise<Tag> {
  const response = await apiClient.post<Tag>('/api/v1/admin/clients/tags', input)
  return response.data
}

export async function updateTag(id: string, input: Partial<Tag>): Promise<Tag> {
  const response = await apiClient.patch<Tag>(`/api/v1/admin/clients/tags/${id}`, input)
  return response.data
}

export async function deleteTag(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/tags/${id}`)
}

export async function assignTag(contactId: string, tagId: string): Promise<void> {
  await apiClient.post(`/api/v1/admin/clients/contacts/${contactId}/tags`, { tagId })
}

export async function removeTag(contactId: string, tagId: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/contacts/${contactId}/tags/${tagId}`)
}

export async function bulkAssignTags(contactIds: string[], tagIds: string[]): Promise<void> {
  await apiClient.post('/api/v1/admin/clients/tags/bulk-assign', { contactIds, tagIds })
}

export async function getDocuments(params?: object): Promise<Document[]> {
  const response = await apiClient.get<Document[]>('/api/v1/admin/clients/documents', { params })
  return response.data
}

export async function getDocument(id: string): Promise<Document> {
  const response = await apiClient.get<Document>(`/api/v1/admin/clients/documents/${id}`)
  return response.data
}

export async function createDocument(input: CreateDocumentInput): Promise<Document> {
  const response = await apiClient.post<Document>('/api/v1/admin/clients/documents', input)
  return response.data
}

export async function updateDocument(id: string, input: Partial<CreateDocumentInput>): Promise<Document> {
  const response = await apiClient.patch<Document>(`/api/v1/admin/clients/documents/${id}`, input)
  return response.data
}

export async function deleteDocument(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/documents/${id}`)
}

export async function signDocument(documentId: string, input: SignDocumentInput): Promise<DocumentSignature> {
  const response = await apiClient.post<DocumentSignature>(`/api/v1/admin/clients/documents/${documentId}/sign`, input)
  return response.data
}

export async function sendSigningRequest(documentId: string, contactId: string): Promise<void> {
  await apiClient.post(`/api/v1/admin/clients/documents/${documentId}/send-signing-request`, { contactId })
}

export async function getUnsignedContacts(documentId: string): Promise<ContactSummary[]> {
  const response = await apiClient.get<ContactSummary[]>(`/api/v1/admin/clients/documents/${documentId}/unsigned`)
  return response.data
}

export async function getPlans(): Promise<Plan[]> {
  const response = await apiClient.get<Plan[]>('/api/v1/admin/clients/plans')
  return response.data
}

export async function createPlan(input: CreatePlanInput): Promise<Plan> {
  const response = await apiClient.post<Plan>('/api/v1/admin/clients/plans', input)
  return response.data
}

export async function updatePlan(id: string, input: Partial<CreatePlanInput>): Promise<Plan> {
  const response = await apiClient.patch<Plan>(`/api/v1/admin/clients/plans/${id}`, input)
  return response.data
}

export async function deletePlan(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/plans/${id}`)
}

export async function enrollContact(contactId: string, planId: string, input?: object): Promise<SubscriptionWithPlan> {
  const response = await apiClient.post<SubscriptionWithPlan>('/api/v1/admin/clients/subscriptions/enroll', {
    contactId,
    planId,
    ...input,
  })
  return response.data
}

export async function pauseSubscription(id: string, pauseUntil: string): Promise<void> {
  await apiClient.post(`/api/v1/admin/clients/subscriptions/${id}/pause`, { pauseUntil })
}

export async function resumeSubscription(id: string): Promise<void> {
  await apiClient.post(`/api/v1/admin/clients/subscriptions/${id}/resume`)
}

export async function cancelSubscription(id: string, reason: string): Promise<void> {
  await apiClient.post(`/api/v1/admin/clients/subscriptions/${id}/cancel`, { reason })
}

export async function getCreditPackDefinitions(): Promise<CreditPackDefinition[]> {
  const response = await apiClient.get<CreditPackDefinition[]>('/api/v1/admin/clients/credit-packs')
  return response.data
}

export async function createCreditPackDefinition(input: CreatePackInput): Promise<CreditPackDefinition> {
  const response = await apiClient.post<CreditPackDefinition>('/api/v1/admin/clients/credit-packs', input)
  return response.data
}

export async function updateCreditPackDefinition(id: string, input: Partial<CreatePackInput>): Promise<CreditPackDefinition> {
  const response = await apiClient.patch<CreditPackDefinition>(`/api/v1/admin/clients/credit-packs/${id}`, input)
  return response.data
}

export async function deleteCreditPackDefinition(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/admin/clients/credit-packs/${id}`)
}

export async function purchaseCreditPack(
  contactId: string,
  packDefinitionId: string,
  input: PurchasePackInput
): Promise<CreditPackPurchase> {
  const response = await apiClient.post<CreditPackPurchase>('/api/v1/admin/clients/credit-packs/purchase', {
    contactId,
    packDefinitionId,
    ...input,
  })
  return response.data
}

export async function getActivePacksForContact(contactId: string): Promise<CreditPackPurchase[]> {
  const response = await apiClient.get<CreditPackPurchase[]>(`/api/v1/admin/clients/contacts/${contactId}/packs`)
  return response.data
}

