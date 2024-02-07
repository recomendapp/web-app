'use client';

import {
  HelpCircle,
  Info,
  LogOut,
  Settings,
  Sparkles,
  Store,
} from 'lucide-react';
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
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import FollowedUserListButton from '@/components/FollowedUsers/FollowedUserListButton';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useTranslations } from 'next-intl';

export function UserNav({ following = true }: { following?: boolean }) {
  const { user, loading, logout } = useAuth();
  const t = useTranslations('routes');

  if (!user) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <nav className="flex items-center gap-4">
      {following && <FollowedUserListButton />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserAvatar user={user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <DropdownMenuItem asChild>
              <Link href={'/@' + user?.username} className="flex gap-2">
                <UserAvatar user={user} />
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
            <DropdownMenuItem asChild>
              <Link href={'https://shop.recomend.app/'} target="_blank">
                <Store className="mr-2 h-4 w-4" />
                <span>{t('shop')}</span>
                <DropdownMenuShortcut>↗</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'https://help.recomend.app/'} target="_blank">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>{t('help')}</span>
                <DropdownMenuShortcut>↗</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'/about'}>
                <Info className="mr-2 h-4 w-4" />
                <span>{t('about')}</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
            {!user.premium && (
              <DropdownMenuItem asChild>
                <Link href={'/upgrade'} className="text-accent-1">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Upgrade to Premium</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href={'/settings/profile'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('settings')}</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logout')}</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
