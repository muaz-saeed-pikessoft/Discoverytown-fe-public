import apiClient from '@/api/client'
import type { StaffLoginRequest, StaffLoginResponse } from '@/types/auth'

export async function staffLogin(payload: StaffLoginRequest): Promise<StaffLoginResponse> {
  const response = await apiClient.post<StaffLoginResponse>('/api/v1/auth/staff/login', payload)
  return response.data
}

export async function staffRefresh(): Promise<{ accessToken: string; refreshToken: string; expiresIn?: number }> {
  const response = await apiClient.post<{ accessToken: string; refreshToken: string; expiresIn?: number }>(
    '/api/v1/auth/staff/refresh'
  )
  return response.data
}

export async function staffLogout(): Promise<void> {
  await apiClient.post('/api/v1/auth/staff/logout')
}

