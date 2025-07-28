'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from "@/lib/i18n/routing";
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import { UserAvatar } from './UserAvatar';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Icons } from '@/config/icons';

export function UserNav({
  className,
} : {
  className?: string;
}) {
  const { user, loading, logout } = useAuth();
  const t = useTranslations('routes');

  const routes = useMemo(() => [
    {
      icon: Icons.shop,
      label: 'shop',
      href: 'https://shop.recomend.app/',
      shortcut: '↗',
      target: '_blank',
      visble: true,
    },
    {
      icon: Icons.help,
      label: 'help',
      href: 'https://help.recomend.app/',
      shortcut: '↗',
      target: '_blank',
      visble: true,
    },
    {
      icon: Icons.about,
      label: 'about',
      href: '/about',
      shortcut: null,
      target: undefined,
      visble: true,
    },
    {
      icon: Icons.legal,
      label: 'legal',
      href: '/legal/terms-of-use',
      shortcut: null,
      target: undefined,
      visble: true,
    },
    {
      icon: Icons.sparkles,
      label: 'upgrade',
      href: '/upgrade',
      shortcut: null,
      target: undefined,
      visble: !user?.premium,
    },
    {
      icon: Icons.settings,
      label: 'settings',
      href: '/settings/profile',
      shortcut: null,
      target: undefined,
      visble: true,
    },
  ], [user]);

  if (!user) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar avatarUrl={user.avatar_url} username={user.username} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <DropdownMenuItem asChild>
            <Link href={'/@' + user?.username} className="flex gap-2">
              <UserAvatar avatarUrl={user.avatar_url} username={user.username} />
              <div className="flex flex-col space-y-1 !items-start">
                <p className="text-sm font-medium leading-none line-clamp-1">
                  {user?.full_name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  @{user?.username}
                </p>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {routes.map((route, i) => (
            route.visble && (
              <DropdownMenuItem key={i} asChild>
                <Link href={route.href} target={route.target}>
                  <route.icon className="w-4" />
                  <span>{t(route.label)}</span>
                  {route.shortcut ? <DropdownMenuShortcut>{route.shortcut}</DropdownMenuShortcut> : null}
                </Link>
              </DropdownMenuItem>
            )
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <Icons.logout className="w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
