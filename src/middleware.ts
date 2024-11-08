import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from './lib/supabase/middleware';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = intlMiddleware(request);

  const url = request.nextUrl.clone();
  const localeMatch = url.pathname.split('/')[1];
  const hasLocale = routing.locales.includes(localeMatch as any);
  if (hasLocale) url.pathname = url.pathname.replace(`/${localeMatch}`, '');
  
  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const supabase = createMiddlewareClient({ request, response });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**
   * Check locale if user is logged in
   */
  const localeHeader = response.headers.get('x-middleware-request-x-next-intl-locale');
  const { data: config } = await supabase.rpc('get_config', {
    user_id: user?.id,
  }).single();

  if (user && config?.user_language && routing.locales.includes(config.user_language)) {
    const wrongLocale =
      (hasLocale && localeMatch !== config.user_language) ||
      (localeHeader && localeHeader !== config.user_language);
    if (wrongLocale) {
      url.pathname = `/${config.user_language}${url.pathname}`;
      return (NextResponse.redirect(url));
    }
  }

  /**
   * Check maintenance mode
   * 
   * If the app is in maintenance mode, redirect all users to the maintenance page
   * If the app is not in maintenance mode, redirect all users to the home page
   * 
   */
  if (config?.maintenance_mode && url.pathname !== '/maintenance' && process.env.NODE_ENV !== 'development') {
    url.pathname = `/maintenance`;
    return (NextResponse.redirect(url));
  } else if (url.pathname === '/maintenance' && !config?.maintenance_mode) {
    url.pathname = '/';
    return (NextResponse.redirect(url));
  }

  /**
   * Redirect user if not logged in
   */
  const anonUserOnly = [
    '/auth'
  ];
  if (user && anonUserOnly.some((path) => request.nextUrl.pathname.startsWith(path))) {
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
  const authentifiedUserOnly = [
    '/collection',
    '/feed',
    '/settings',
  ];
  if (!user && authentifiedUserOnly.some((path) => request.nextUrl.pathname.startsWith(path))) {
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return (NextResponse.redirect(url));
  }

  return (response);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // User pages
    '/@:username/:path*',
  ],
};
