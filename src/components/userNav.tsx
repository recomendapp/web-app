'use client';
import { useEffect, useState } from 'react';

import { LogOut, Settings, User } from 'lucide-react';

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

import { useUser } from '@/context/user';
import { Skeleton } from '@/components/ui/skeleton';
import Novu from '@/utils/novu';
import { getInitiales } from '@/lib/utils';

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
  skeleton?: boolean;
}

export function UserNav({ skeleton }: UserNavProps) {
  const { user, userLoading, logout } = useUser();

  if (user === null) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (user === false) {
    return (
      <Button asChild>
        <Link href={'/login'} className="whitespace-nowrap">
          Se connecter
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Novu userId={user.$id} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitiales(user)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={'/@' + user.username}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'/settings/profile'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
