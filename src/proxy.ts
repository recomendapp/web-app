import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { siteConfig } from './config/site';
import { getSupabaseClaims } from './lib/supabase/jwt';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  const [, locale, ...rest] = new URL(
    response.headers.get('x-middleware-rewrite') || request.url
  ).pathname.split('/');
  const pathname = '/' + rest.join('/');

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: Don't remove getClaims()
  const user = await getSupabaseClaims(request);

  /**
   * Redirect user if not logged in
   */
  if (user && siteConfig.routes.anonRoutes.some((path) => pathname.startsWith(path))) {
    const redirect = request.nextUrl.searchParams.get('redirect');

    if (redirect) {
      return NextResponse.redirect(
        new URL(`/${locale}${redirect}`, request.url)
      )
    }

    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    );
  }

  /**
   * Redirect user if logged in
   */
  if (!user && siteConfig.routes.authRoutes.some((path) => pathname.startsWith(path))) {
    const redirectTo = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?redirect=${redirectTo}`, request.url)
    );
  }
  
  return (response);
}

export const config = {
  matcher: [
    "/((?!\\.well-known|api|_next|favicon\\.ico|robots\\.txt|manifest\\.webmanifest|sitemaps|opensearch\\.xml|assets|.*\\.(?:json|xml|js|css|png|jpg|jpeg|gif|svg)$).*)",
  ],
};