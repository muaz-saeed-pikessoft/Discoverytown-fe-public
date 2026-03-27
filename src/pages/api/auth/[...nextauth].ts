import NextAuth from 'next-auth'

import { authOptions } from '@/lib/auth/next-auth.config'

export default NextAuth(authOptions)

