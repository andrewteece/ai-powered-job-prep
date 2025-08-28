import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Only gate the routes that should require auth
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/app(.*)',
  '/api/private(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const session = await auth();
    if (!session.isAuthenticated) {
      const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(req.url)}`;
      return Response.redirect(signInUrl);
    }
  }
});

// Don't match static assets; do NOT include /sign-in or /sign-up here
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
