import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/next-auth.config'

export async function getStaffSession() {
  return getServerSession(authOptions)
}

