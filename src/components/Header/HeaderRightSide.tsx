'use client';

import { cn } from '@/lib/utils';
import { UserNav } from '../User/UserNav';
import { Button } from '../ui/button';
import { Link } from "@/lib/i18n/navigation";
import { SocialButton } from './components/SocialButton';
import { NotificationsButton } from '../notifications/NotificationsButton';
import { useAuth } from '@/context/auth-context';
import { useTranslations } from 'next-intl';
import { useNotifications } from '@/context/notifications-context';
import { upperFirst } from 'lodash';

export default function HeaderRightSide({
  className,
} : {
  className?: string;
}) {
  const { session } = useAuth();
  const { state } = useNotifications();
  const t = useTranslations();
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
            {upperFirst(t('common.messages.login'))}
          </Link>
        </Button>
      )}
    </div>
  )
}
