'use client';

import { cn } from '@/lib/utils';
import { usePathname } from '@/lib/i18n/routing';
import { useMemo } from 'react';
import { Link } from "@/lib/i18n/routing";
import {
  Search,
  Home,
  Library,
  Zap,
  Compass,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Icons } from '@/config/icons';
import { useTranslations } from 'next-intl';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Navbar({ className }: NavbarProps) {
  const { session } = useAuth();
  const routesDic = useTranslations('routes');
  const common = useTranslations('common');
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: routesDic('home'),
        active: pathname === '/',
        href: '/',
      },
      {
        icon: Search,
        label: routesDic('search'),
        active: pathname.startsWith('/search') || pathname.startsWith('/movie'),
        href: '/search',
      },
      {
        icon: Compass,
        label: routesDic('explore'),
        active: pathname === '/map',
        href: '/explore',
      },
      {
        icon: session ? Zap : Icons.shop,
        label: session ? routesDic('feed') : routesDic('shop'),
        active: session ? pathname.startsWith('/feed') : false,
        href: session ? '/feed' : 'https://shop.recomend.app',
        target: session ? undefined : '_blank',
      },
      {
        icon: session ? Library : Icons.user,
        label: session ? routesDic('library') : common('word.login'),
        active:
        session ?
            pathname.startsWith('/collection') ||
            pathname.startsWith('/auth') ||
            pathname.startsWith('/resetPassword') ||
            pathname.startsWith('/verifyEmail')
            : pathname.startsWith('/auth'),
        href: session ? '/collection' : '/auth/login',
      },
    ],
    [pathname, session, routesDic, common]
  );

  return (
    <div
      className={cn(
        `h-navbar bg-navbar border-t w-full grid grid-cols-5 rounded-t-lg`,
        className
      )}
    >
    {routes.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className={` opacity-100 ${
          !item.active && ' opacity-70'
        } w-full h-full flex flex-col items-center justify-center text-center text-xs gap-1`}
        target={item.target}
      >
        <item.icon className="w-8" />
        {item.label}
      </Link>
    ))}
    </div>
  );
}
