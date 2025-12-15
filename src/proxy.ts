import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from './config/site';
import { getSupabaseClaims } from './lib/supabase/jwt';
import { i18nMiddleware } from './lib/i18n/middleware';

export async function proxy(request: NextRequest) {
  const start = performance.now();
  const response = i18nMiddleware(request);

  const [, locale, ...rest] = new URL(
    response.headers.get('x-middleware-rewrite') || request.url
  ).pathname.split('/');
  const pathname = '/' + rest.join('/');

  const isBrowser =
    request.headers.get("accept")?.includes("text/html") &&
    /Mozilla|Chrome|Safari|Firefox|Edge/i.test(
      request.headers.get("user-agent") || ""
    );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: Don't remove getClaims()
  const user = await getSupabaseClaims(request);

  /**
   * Redirect user if not logged in
   */
  if (user && isAnonOnly(pathname)) {
    if (!isBrowser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
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
  if (!user && isProtected(pathname)) {
    if (!isBrowser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const redirectTo = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login?redirect=${redirectTo}`, request.url)
    );
  }
  
  const duration = performance.now() - start;
  console.log(`[i18nMiddleware] ${request.nextUrl.pathname} - ${duration.toFixed(2)}ms`);
  return response;
}

export const config = {
  matcher: [
    "/((?!\\.well-known|api|_next|favicon\\.ico|robots\\.txt|manifest\\.webmanifest|sitemaps|opensearch\\.xml|assets|.*\\.(?:json|xml|js|css|png|jpg|jpeg|gif|svg)$).*)",
  ],
};

// Utils
const isProtected = (pathname: string) => {
  return (
    /^\/film\/[^/]+\/review\/create$/.test(pathname) ||
    /^\/film\/[^/]+\/review\/[^/]+\/edit$/.test(pathname) ||
    /^\/tv-series\/[^/]+\/review\/create$/.test(pathname) ||
    /^\/tv-series\/[^/]+\/review\/[^/]+\/edit$/.test(pathname) ||
    siteConfig.routes.authRoutes.some((path) => pathname.startsWith(path))
  );
};
const isAnonOnly = (pathname: string) => {
  return siteConfig.routes.anonRoutes.some((path) => pathname.startsWith(path));
}