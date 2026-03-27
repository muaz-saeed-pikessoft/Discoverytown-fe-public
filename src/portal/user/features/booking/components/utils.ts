import type { ServiceType } from '@/types/scheduling.shared'

export function serviceTypeToParam(serviceType: ServiceType): string {
  return serviceType.toLowerCase().replaceAll('_', '-')
}

