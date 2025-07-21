'use client';

import { cn } from '@/lib/utils';
import { UserNav } from '../User/UserNav';
import { Button } from '../ui/button';
import { Link } from "@/lib/i18n/routing";
import { SocialButton } from './components/SocialButton';
import { NotificationsButton } from '../notifications/NotificationsButton';
import { useAuth } from '@/context/auth-context';
import { useTranslations } from 'next-intl';
import { useNotifications } from '@/context/notifications-context';

export default function HeaderRightSide({
  className,
} : {
  className?: string;
}) {
  const { session } = useAuth();
  const { state } = useNotifications();
  const common = useTranslations('common');
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {session ? (
        <>
          {state === 'success' && <NotificationsButton />}
          <SocialButton />
          <UserNav />
        </>
      ) : (
        <Button asChild>
          <Link href={'/auth/login'} className="whitespace-nowrap">
            {common('word.login')}
          </Link>
        </Button>
      )}
    </div>
  )
}
