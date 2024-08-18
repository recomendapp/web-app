'use client';

import { cn } from '@/lib/utils';
import { Session } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { UserNav } from '../User/UserNav/UserNav';
import { Button } from '../ui/button';
import Link from 'next/link';
import FollowedUserListButton from '../FollowedUsers/FollowedUserListButton';

export default function HeaderRightSide({
  session,
  className,
} : {
  session: Session | null;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {!session ? (
        <Button asChild>
          <Link href={'/auth/login'} className="whitespace-nowrap">
            Se connecter
          </Link>
        </Button>
      ) : (
        <>
          <FollowedUserListButton />
          <UserNav />
        </>
      )}
    </div>
  )
}
