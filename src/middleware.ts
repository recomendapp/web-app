import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { User } from './types/type.user';

const locales = ['en', 'fr'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never',
  
})

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
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
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}