import { Suspense } from 'react'

import CommerceFlowPageClient from '@/modules/commerce/components/CommerceFlowPageClient'

export default function CheckoutPage() {
  return (
    <Suspense>
      <CommerceFlowPageClient />
    </Suspense>
  )
}
