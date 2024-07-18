import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en-US', 'fr-FR'] as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
