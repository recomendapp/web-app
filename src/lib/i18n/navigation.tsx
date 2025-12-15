'use client'

import NextLink, { LinkProps } from 'next/link';
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
  redirect as nextRedirect,
} from 'next/navigation';
import { useParams } from 'next/navigation';
import { fallbackLng, languages } from './settings';
import React, { ComponentPropsWithoutRef } from 'react';

// =================================================================================
// LINK COMPONENT
// =================================================================================

type CustomLinkProps = ComponentPropsWithoutRef<typeof NextLink> & {};

/**
 * An internationalized version of the Next.js Link component.
 * It will automatically prefix the href with the current language if needed.
 */
export function Link({ href, children, ...props }: CustomLinkProps) {
    const params = useParams();
    const lng = (params.lang as string) || fallbackLng;

    const hrefStr = href.toString();

    const isExternal = hrefStr.startsWith('http');
    const isLangPrefixed = languages.some(l => hrefStr.startsWith(`/${l}/`) || hrefStr === `/${l}`);

    if (isExternal || isLangPrefixed) {
        return <NextLink href={href} {...props}>{children}</NextLink>;
    }

    const localizedHref = (lng && lng !== fallbackLng) ? `/${lng}${href}` : href;

    return <NextLink href={localizedHref === '' ? '/' : localizedHref} {...props}>{children}</NextLink>;
}


// =================================================================================
// USE_PATHNAME HOOK
// =================================================================================

/**
 * An internationalized version of the Next.js usePathname hook.
 * Returns the current pathname without any language prefix.
 */
export function usePathname(): string {
  const pathname = useNextPathname();
  const params = useParams();
  const lng = params.lang as string | undefined;

  // If a language is in params and the path starts with it, remove it
  if (lng && pathname.startsWith(`/${lng}`)) {
    return pathname.substring(lng.length + 1) || '/';
  }

  return pathname;
}


// =================================================================================
// USE_ROUTER HOOK
// =================================================================================

/**
 * An internationalized version of the Next.js useRouter hook.
 * The `push` and `replace` methods are wrapped to automatically handle language prefixes.
 */
export function useRouter() {
  const router = useNextRouter();
  const params = useParams();
  const lng = (params.lang as string) || fallbackLng;

  const prefixHref = (href: string) => {
    // Don't prefix if it's an external link or already prefixed
    const isExternal = href.startsWith('http');
    const isLangPrefixed = languages.some(l => href.startsWith(`/${l}/`) || href === `/${l}`);
    if (isExternal || isLangPrefixed) {
        return href;
    }
    
    if (lng && lng !== fallbackLng) {
      return `/${lng}${href}`;
    }
    return href;
  };

  return {
    ...router,
    push: (href: string, options?: any) => {
      return router.push(prefixHref(href), options);
    },
    replace: (href: string, options?: any) => {
      return router.replace(prefixHref(href), options);
    },
  };
}
