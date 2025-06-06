import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales } from './locales';
import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { siteConfig } from '@/config/site';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale: 'en-US',
  // Prefix for all locale-aware routes
  localePrefix: 'as-needed',
});
 
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);

export const seoLocales = (currentLocale: string, endpoint: string): AlternateURLs => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const localePrefix = currentLocale === routing.defaultLocale ? '' : `/${currentLocale}`;
  return {
    canonical: `${siteConfig.url}${localePrefix}${normalizedEndpoint}`,
    languages: Object.fromEntries([
      ['x-default', `${siteConfig.url}${normalizedEndpoint}`],
      ...locales.map((locale) => {
        const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
        return [locale, `${siteConfig.url}${prefix}${normalizedEndpoint}`];
      }),
    ]),
  };
};

export const sitemapLocales = (endpoint: string) => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return Object.fromEntries(
    locales.map((locale) => {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      return [locale, `${siteConfig.url}${prefix}${normalizedEndpoint}`];
    })
  );
};