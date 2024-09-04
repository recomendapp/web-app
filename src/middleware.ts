import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from './lib/supabase/middleware';
import { routing } from './lib/i18n/routing';
import { NextURL } from 'next/dist/server/web/next-url';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = intlMiddleware(request);

  console.log('\n');
  const url = request.nextUrl.clone();
  console.log('url.pathname', url.pathname);
  const localeMatch = url.pathname.split('/')[1];
  console.log('localeMatch', localeMatch);
  const hasLocale = routing.locales.includes(localeMatch as any);
  console.log('hasLocale', hasLocale);
  if (hasLocale) url.pathname = url.pathname.replace(`/${localeMatch}`, '');
  console.log('url.pathname', url.pathname);
  
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
  if (user && (hasLocale || localeHeader)) {
    const { data: user_data } = await supabase.from('user').select('language').eq('id', user.id).single();
    if (user_data?.language && ((hasLocale && localeMatch !== user_data.language) || (localeHeader && localeHeader !== user_data.language))) {
      url.pathname = `/${user_data.language}${url.pathname}`;
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
  const { data: app_settings } = await supabase.from('app_settings').select('*').single();
  if (app_settings?.maintenance_mode && url.pathname !== '/maintenance' && process.env.NODE_ENV !== 'development') {
    url.pathname = `/maintenance`;
    return (NextResponse.redirect(url));
  } else if (url.pathname === '/maintenance' && !app_settings?.maintenance_mode) {
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
    url.pathname = '/';
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
    return (NextResponse.redirect(url));
  }

  return (response);

  // CHECK APP SETTINGS
  // const { data: app_settings } = await supabase.from('app_settings').select('*').single();
  // if (app_settings?.maintenance_mode && process.env.NODE_ENV !== 'development') {
  //   request.nextUrl.pathname = `/maintenance`;
  // } else if (request.nextUrl.pathname === '/maintenance' && !app_settings?.maintenance_mode) {
  //   request.nextUrl.pathname = '/';
  // }
  
  // return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
