import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName, headerName } from './settings';

acceptLanguage.languages([...languages]);

export function i18nMiddleware(req: NextRequest): NextResponse {
  const pathname = req.nextUrl.pathname;

  // 1. Determine desired language (cookie > header > fallback)
  let resolvedLng: string | undefined | null;
  if (req.cookies.has(cookieName)) {
    resolvedLng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
  }
  if (!resolvedLng && req.headers.has('Accept-Language')) {
    resolvedLng = acceptLanguage.get(req.headers.get('Accept-Language')!);
  }
  if (!resolvedLng) {
    resolvedLng = fallbackLng;
  }

  let response: NextResponse;

  // 2. Handle redirect for default language prefix in path (e.g., /en-US/about -> /about)
  if (pathname.startsWith(`/${fallbackLng}/`) || pathname === `/${fallbackLng}`) {
    const newPath = pathname.replace(`/${fallbackLng}`, '') || '/';
    response = NextResponse.redirect(new URL(newPath, req.url));
  } else {
    const lngInPath = languages.find(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`);

    // 3. Handle mismatch between path and detected language -> redirect
    if (lngInPath && lngInPath !== resolvedLng) {
      const newPath = pathname.replace(`/${lngInPath}`, resolvedLng === fallbackLng ? '' : `/${resolvedLng}`);
      response = NextResponse.redirect(new URL(newPath === '' ? '/' : newPath, req.url));
    }
    // 4. Handle missing language in path -> redirect or rewrite
    else if (!lngInPath) {
      if (resolvedLng === fallbackLng) {
        response = NextResponse.rewrite(new URL(`/${resolvedLng}${pathname}`, req.url));
      } else {
        response = NextResponse.redirect(new URL(`/${resolvedLng}${pathname}`, req.url));
      }
    }
    // 5. If everything is consistent, continue
    else {
      response = NextResponse.next();
    }
  }

  // Set final headers and cookies on the response
  const finalLangForHeader = languages.find(l => req.nextUrl.pathname.startsWith(`/${l}`)) || resolvedLng;
  response.headers.set(headerName, finalLangForHeader);
  if (req.cookies.get(cookieName)?.value !== resolvedLng) {
    response.cookies.set(cookieName, resolvedLng, { path: '/' });
  }

  return response;
}
