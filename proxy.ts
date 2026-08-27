/**
 * Next.js Middleware — Route Protection
 *
 * Runs on every request before the page renders.
 * Two jobs:
 *   1. Refresh the Supabase session cookie if it has expired
 *   2. Redirect unauthenticated users away from protected routes
 *      Redirect authenticated users away from auth pages (login, register)
 *
 * Protected routes: anything under /dashboard
 * Public routes: /, /login, /register, /reset-password
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require a logged-in session
const PROTECTED_PREFIXES = ['/dashboard']

// Routes that logged-in users should not see (redirect to dashboard)
const AUTH_ROUTES = ['/login', '/register', '/reset-password']

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  // Build a response object we can attach cookie updates to
  let response = NextResponse.next({ request })

  // Create a Supabase client that can read and write cookies on the response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Write updated cookies to both the request and the response
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — this is what keeps the user logged in across requests.
  // getUser() validates the token with Supabase and refreshes it if needed.
  const { data: { user } } = await supabase.auth.getUser()

  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // Unauthenticated user trying to access a protected route → send to login
  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/login', request.url)
    // Preserve the intended destination so we can redirect after login
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated user trying to access login/register → send to dashboard
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Only run middleware on routes that need it.
// Excludes static files, images, and Next.js internals.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
