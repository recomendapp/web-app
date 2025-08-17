import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from './lib/supabase/middleware';
import { routing } from './lib/i18n/routing';
import { siteConfig } from './config/site';
import { SupportedLocale } from './translations/locales';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = intlMiddleware(request);

  const url = request.nextUrl.clone();
  const localeMatch = url.pathname.split('/')[1];
  const hasLocale = routing.locales.includes(localeMatch as SupportedLocale);
  if (hasLocale) url.pathname = url.pathname.replace(`/${localeMatch}`, '');
  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const supabase = createMiddlewareClient({ request, response });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**
   * Redirect user if not logged in
   */
  if (user && siteConfig.routes.anonRoutes.some((path) => url.pathname.startsWith(path))) {
    // if /auth/login and there is redirect query param, go to redirect
    if (url.pathname === '/auth/login' && url.searchParams.has('redirect'))
      return (NextResponse.redirect(new URL(url.searchParams.get('redirect')!, request.url)));
    url.pathname = '/';
    url.search = '';
    return (NextResponse.redirect(url));
  }

  /**
   * Redirect user if logged in
   */
  if (!user && siteConfig.routes.authRoutes.some((path) => url.pathname.startsWith(path))) {
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return (NextResponse.redirect(url));
  }
  
  return (response);
}

export const config = {
  matcher: [
    `/((?!api|_next|_vercel|favicon\\.ico|manifest\\.webmanifest|robots\\.txt|sitemaps/|opensearch\\.xml|.well-known/|assets/|.*\\.(?:json|xml|js)$).*)`,
  ],
};