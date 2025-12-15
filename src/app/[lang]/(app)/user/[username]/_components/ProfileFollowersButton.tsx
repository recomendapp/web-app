'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProfileFollowersModal } from '@/components/Modals/profiles/ProfileFollowersModal';
import { useModal } from '@/context/modal-context';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { upperFirst } from 'lodash';
import { useCallback } from 'react';
import { useT } from '@/lib/i18n/client';

interface ProfileFollowersButtonProps {
  userId: string;
  className?: string;
  disabled?: boolean;
}

export const ProfileFollowersButton = ({
	userId,
	className,
  disabled = false,
} : ProfileFollowersButtonProps) => {
  const { t } = useT();
  const { createModal } = useModal();

  const handleOpenFollowersModal = useCallback(() => {
    createModal({
      header: {
        title: upperFirst(t('common.messages.follower', { count: 2 })),
      },
      content: <ProfileFollowersModal userId={userId} />,
    });
  }, [createModal, t, userId]);

  return (
      <TooltipBox tooltip={upperFirst(t('common.messages.see_followers'))}>
        <Button
        variant={'outline'}
        onClick={handleOpenFollowersModal}
        className={cn(className)}
        disabled={disabled}
        >
        {t('common.messages.follower', { count: 2 })}
        </Button>
      </TooltipBox>
  );
}
