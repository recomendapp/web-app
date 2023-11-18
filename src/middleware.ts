import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
// import { User } from '@/types/type.user';
import { locales } from '@/lib/next-intl/navigation';
import { createMiddlewareClient } from './lib/supabase/middleware';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never',
  
})

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  const supabase = createMiddlewareClient({ request, response })
  await supabase.auth.getSession();
  // const { data: { session } } = await supabase.auth.getSession();
  // const { data: user } = await supabase.from('user').select('*').eq('id', session?.user.id).single() as { data: User }
  // if (user) {
  //   res.cookies.set(
  //     {
  //       name: 'NEXT_LOCALE',
  //       value: user.language,
  //       maxAge: 365 * 24 * 60 * 60,
  //       path: '/',
  //       sameSite: 'strict',
  //       priority: 'medium'
  //   });
  // }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}