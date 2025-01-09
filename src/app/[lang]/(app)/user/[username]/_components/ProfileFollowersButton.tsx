'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProfileFollowersModal } from '@/components/Modals/Profile/ProfileFollowersModal';
import { useModal } from '@/context/modal-context';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

interface ProfileFollowersButtonProps {
  userId: string;
  className?: string;
  disabled?: boolean;
}

export function ProfileFollowersButton({
	userId,
	className,
  disabled = false,
} : ProfileFollowersButtonProps) {
  const common = useTranslations('common');
  const { createModal } = useModal();

  return (
      <TooltipBox tooltip={upperFirst(common('messages.see_followers'))}>
        <Button
          variant={'action'}
          onClick={() => createModal({
            header: {
              title: upperFirst(common('messages.follower', { count: 2 })),
            },
            content: <ProfileFollowersModal userId={userId} />,
          })}
          className={cn(className)}
          disabled={disabled}
        >
        {common('messages.follower', { count: 2 })}
        </Button>
      </TooltipBox>
  );
}
