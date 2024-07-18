import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
// import { User } from '@/types/type.user';
import { locales } from '@/lib/next-intl/navigation';
import { createMiddlewareClient } from './lib/supabase/middleware';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en-US',
  localePrefix: 'never',
});

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = createMiddlewareClient({ request, response });
  await supabase.auth.getSession();

  // CHECK APP SETTINGS
  const { data: app_settings } = await supabase.from('app_settings').select('*').single();
  if (app_settings?.maintenance_mode && process.env.NODE_ENV !== 'development') {
    request.nextUrl.pathname = `/maintenance`;
  } else if (request.nextUrl.pathname === '/maintenance' && !app_settings?.maintenance_mode) {
    request.nextUrl.pathname = '/';
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
