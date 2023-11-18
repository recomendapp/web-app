'use client';

import { HelpCircle, Info, LogOut, Settings, Sparkles, Store, User, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import Novu from '@/context/NovuProvider';
import { getInitiales } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext/auth-context';
import { useRightSidebar } from '@/context/right-sidebar-context';
import FriendsList from '@/components/Friends/FriendsList';
import FollowedUserListButton from '@/components/FollowedUsers/FollowedUserListButton';
import UserAvatar from '../UserAvatar/UserAvatar';

export function UserNav({
  following = true,
} : {
  following?: boolean
}) {

  const { user, loading, logout } = useAuth();

  if (!user) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <nav className='flex items-center gap-4'>
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
              <Link href={'/@' + user?.username} className='flex gap-2'>
                <UserAvatar user={user} />
                <div className='flex flex-col space-y-1 !items-start'>
                  <p className="text-sm font-medium leading-none">{user?.full_name}</p>
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
              <Link href={'https://shop.recomend.app/'} target='_blank'>
                <Store className="mr-2 h-4 w-4" />
                <span>Store / Gift shop</span>
                <DropdownMenuShortcut>↗</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'https://help.recomend.app/'} target='_blank'>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help / FAQs</span>
                <DropdownMenuShortcut>↗</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'/about'}>
                <Info className="mr-2 h-4 w-4" />
                <span>About</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
            {!user?.premium && <DropdownMenuItem asChild>
              <Link href={'/upgrade'} className='text-accent-1'>
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Upgrade to Premium</span>
              </Link>
            </DropdownMenuItem>}
            <DropdownMenuItem asChild>
              <Link href={'/settings/profile'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
