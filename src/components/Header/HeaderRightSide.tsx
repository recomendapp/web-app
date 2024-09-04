'use client';

import { cn } from '@/lib/utils';
import { UserNav } from '../User/UserNav/UserNav';
import { Button } from '../ui/button';
import Link from 'next/link';
import FollowedUserListButton from '../FollowedUsers/FollowedUserListButton';

export default function HeaderRightSide({
  isLogged,
  className,
} : {
  isLogged: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {isLogged ? (
        <>
          <FollowedUserListButton />
          <UserNav />
        </>
      ) : (
        <Button asChild>
          <Link href={'/auth/login'} className="whitespace-nowrap">
            Se connecter
          </Link>
        </Button>
      )}
    </div>
  )
}
