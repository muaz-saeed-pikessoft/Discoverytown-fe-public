'use client'

import EmptyState from '@/components/shared/EmptyState'
import PageHeader from '@/components/shared/PageHeader'

export default function AdminOnboardingPage() {
  return (
    <div>
      <PageHeader title='Onboarding' subtitle='Complete setup steps to access admin tools.' />
      <EmptyState title='Coming soon' description='Onboarding flow will be available here.' />
    </div>
  )
}

