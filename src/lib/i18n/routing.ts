import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales } from './locales';
 
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