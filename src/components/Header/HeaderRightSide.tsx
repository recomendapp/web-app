'use client';

import { cn } from '@/lib/utils';
import { UserNav } from '../User/UserNav/UserNav';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SocialButton } from './components/SocialButton';
import { NotificationsButton } from '../notifications/NotificationsButton';
import { useAuth } from '@/context/auth-context';
import { useTranslations } from 'next-intl';

export default function HeaderRightSide({
  className,
} : {
  className?: string;
}) {
  const { session } = useAuth();
  const word = useTranslations('word');
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {session ? (
        <>
          <NotificationsButton />
          <SocialButton />
          <UserNav />
        </>
      ) : (
        <Button asChild>
          <Link href={'/auth/login'} className="whitespace-nowrap">
            {word('login')}
          </Link>
        </Button>
      )}
    </div>
  )
}
