import apiClient from '@/api/client'
import type { PaginatedResponse } from '@/types/api.types'
import type {
  AddFamilyMemberInput,
  Contact,
  ContactRelationship,
  CreditLedgerEntry,
  CreditPackDefinition,
  CreditPackPurchase,
  DocumentSignature,
  DocumentSignatureStatus,
  Plan,
  PurchasePackInput,
  SignDocumentInput,
  SubscribeInput,
  SubscriptionWithPlan,
  UpdateProfileInput,
} from '@/types/clients.shared'

export async function getMyProfile(): Promise<Contact> {
  const response = await apiClient.get<Contact>('/api/v1/my-profile')
  return response.data
}

export async function updateMyProfile(input: UpdateProfileInput): Promise<Contact> {
  const response = await apiClient.patch<Contact>('/api/v1/my-profile', input)
  return response.data
}

export async function getMyFamily(): Promise<ContactRelationship[]> {
  const response = await apiClient.get<ContactRelationship[]>('/api/v1/my-family')
  return response.data
}

export async function addFamilyMember(input: AddFamilyMemberInput): Promise<ContactRelationship> {
  const response = await apiClient.post<ContactRelationship>('/api/v1/my-family', input)
  return response.data
}

export async function updateFamilyMember(relationshipId: string, input: Partial<AddFamilyMemberInput>): Promise<void> {
  await apiClient.patch(`/api/v1/my-family/${relationshipId}`, input)
}

export async function removeFamilyMember(relationshipId: string): Promise<void> {
  await apiClient.delete(`/api/v1/my-family/${relationshipId}`)
}

export async function getMyDocuments(): Promise<DocumentSignatureStatus[]> {
  const response = await apiClient.get<DocumentSignatureStatus[]>('/api/v1/my-documents')
  return response.data
}

export async function signMyDocument(documentId: string, input: SignDocumentInput): Promise<DocumentSignature> {
  const response = await apiClient.post<DocumentSignature>(`/api/v1/my-documents/${documentId}/sign`, input)
  return response.data
}

export async function getMySubscription(): Promise<SubscriptionWithPlan | null> {
  const response = await apiClient.get<SubscriptionWithPlan | null>('/api/v1/my-subscription')
  return response.data
}

export async function getAvailablePlans(): Promise<Plan[]> {
  const response = await apiClient.get<Plan[]>('/api/v1/plans')
  return response.data
}

export async function subscribeToPlan(planId: string, input: SubscribeInput): Promise<SubscriptionWithPlan> {
  const response = await apiClient.post<SubscriptionWithPlan>('/api/v1/my-subscription', { planId, ...input })
  return response.data
}

export async function cancelMySubscription(reason: string): Promise<void> {
  await apiClient.post('/api/v1/my-subscription/cancel', { reason })
}

export async function pauseMySubscription(pauseUntil: string): Promise<void> {
  await apiClient.post('/api/v1/my-subscription/pause', { pauseUntil })
}

export async function getMyCredits(): Promise<{ balance: string; packs: CreditPackPurchase[] }> {
  const response = await apiClient.get<{ balance: string; packs: CreditPackPurchase[] }>('/api/v1/my-credits')
  return response.data
}

export async function getMyCreditLedger(params?: object): Promise<PaginatedResponse<CreditLedgerEntry>> {
  const response = await apiClient.get<PaginatedResponse<CreditLedgerEntry>>('/api/v1/my-credits/ledger', { params })
  return response.data
}

export async function getAvailableCreditPacks(): Promise<CreditPackDefinition[]> {
  const response = await apiClient.get<CreditPackDefinition[]>('/api/v1/credit-packs/definitions')
  return response.data
}

export async function purchaseCreditPack(packDefinitionId: string, input: PurchasePackInput): Promise<CreditPackPurchase> {
  const response = await apiClient.post<CreditPackPurchase>('/api/v1/my-credits/purchase', { packDefinitionId, ...input })
  return response.data
}

