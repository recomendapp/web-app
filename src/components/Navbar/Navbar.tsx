'use client';

import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Home,
  Library,
  Rss,
  Zap,
  Music2,
  Compass,
  Radio,
  User,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Icons } from '@/config/icons';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Navbar({ className }: NavbarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: 'Accueil',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: Search,
        label: 'Recherche',
        active: pathname.startsWith('/search') || pathname.startsWith('/movie'),
        href: '/search',
      },
      {
        icon: Compass,
        label: 'Carte',
        active: pathname === '/map',
        href: '/explore',
      },
      {
        icon: user ? Zap : Icons.shop,
        label: user ? 'Feed' : 'Shop',
        active: user ? pathname.startsWith('/feed') : false,
        href: user ? '/feed' : 'https://shop.recomend.app',
        target: '_blank',
      },
      {
        icon: user ? Library : Icons.user,
        label: user ? 'Bibliothèque' : 'Se connecter',
        active:
          user ?
            pathname.startsWith('/collection') ||
            pathname.startsWith('/auth') ||
            pathname.startsWith('/resetPassword') ||
            pathname.startsWith('/verifyEmail')
            : pathname.startsWith('/auth'),
        href: user ? '/collection' : '/auth/login',
      },
    ],
    [pathname, user]
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
