'use client';

import { cn } from '@/lib/utils';
import { UserNav } from '../User/UserNav/UserNav';
import { Button } from '../ui/button';
import Link from 'next/link';
// import { NovuInbox } from '../novu/NovuInbox';
import { SocialButton } from './components/SocialButton';
import { NotificationsButton } from './components/NotificationsButton';

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
