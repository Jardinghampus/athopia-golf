import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/feed(.*)',
  '/spelare(.*)',
  '/turneringar(.*)',
  '/statistik(.*)',
  '/podcast(.*)',
  '/sammanfattning(.*)',
  '/prenumerera(.*)',
])

const isOnboarding = createRouteMatcher(['/onboarding', '/(app)/onboarding'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, sessionClaims } = await auth()
    if (!userId) {
      await auth.protect()
      return
    }
    if (!isOnboarding(req)) {
      const meta = (sessionClaims?.unsafeMetadata ?? {}) as Record<string, unknown>
      if (!meta['favoritePlayers'] && !meta['sport']) {
        const { NextResponse } = await import('next/server')
        return NextResponse.redirect(new URL('/onboarding', req.url))
      }
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
