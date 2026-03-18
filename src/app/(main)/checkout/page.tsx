import { Suspense } from 'react'

import CommerceFlowPageClient from '@/components/commerce/CommerceFlowPageClient'

export default function CheckoutPage() {
  return (
    <Suspense>
      <CommerceFlowPageClient />
    </Suspense>
  )
}
