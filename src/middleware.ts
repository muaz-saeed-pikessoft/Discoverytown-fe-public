import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const bypassAdminAuth = process.env.NEXT_PUBLIC_BYPASS_ADMIN_AUTH === 'true'

  const isAdmin = pathname.startsWith('/admin')
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isMyAccount = pathname.startsWith('/my-account')

  // Staff session cookie (next-auth). We don't validate here yet; Step 5 will tighten this.
  const hasStaffSession = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token')

  // Legacy user session cookie (existing system) - keep existing behavior (best-effort).
  const hasLegacyUserSession = request.cookies.get('access_token')

  if (bypassAdminAuth && isAdmin) {
    return NextResponse.next()
  }

  if (isAdmin && !hasStaffSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (isMyAccount && !hasLegacyUserSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (isAuthPage && hasStaffSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/my-account', '/login', '/register'],
}

