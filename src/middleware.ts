// src/middleware.ts
import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import arcjet, { shield, slidingWindow /* or tokenBucket */ } from '@arcjet/next';

// 1) Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/app(.*)',
  '/api/private(.*)',
]);

// 2) Single Arcjet client (created once per edge runtime boot)
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Basic security checks (WAF-like)
    shield({ mode: 'LIVE' }),

    // Simple rate limiting by IP (e.g., 20 req per minute, windowed)
    slidingWindow({
      mode: 'LIVE', // use "DRY_RUN" during testing if you don't want to block yet
      interval: 60, // seconds
      max: 20, // max requests per interval
      // identifier: (ctx) => ctx.ip, // rate-limit key (not supported)
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  // 3) Arcjet: evaluate request first
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    // You can inspect decision.reason if you want to log the cause
    return new Response('Blocked by Arcjet', { status: 429 });
  }

  // 4) Clerk: protect only the routes that should require auth
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // 5) Continue normally
  return NextResponse.next();
});

// 6) Don't match static assets; do NOT gate auth pages here
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
