'use client';

import { cn } from '@/lib/utils';
import { UserNav } from '../User/UserNav/UserNav';
import { Button } from '../ui/button';
import Link from 'next/link';
import { NovuInbox } from '../novu/NovuInbox';
import { SocialButton } from './components/SocialButton';
import { NotificationsButton } from '../notifications/NotificationsButton';
import { useAuth } from '@/context/auth-context';

export default function HeaderRightSide({
  className,
} : {
  className?: string;
}) {
  const { session } = useAuth();
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {session ? (
        <>
          {/* <NovuInbox /> */}
          <NotificationsButton />
          <SocialButton />
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
