'use client';

import { Button } from '@/components/ui/button';

// ICONS
import { cn } from '@/lib/utils';
import { ProfileFolloweesModal } from '@/components/Modals/profiles/ProfileFolloweesModal';
import { useModal } from '@/context/modal-context';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

interface ProfileFolloweesButtonProps {
  userId: string;
  className?: string;
  disabled?: boolean;
}

export function ProfileFolloweesButton({
	userId,
	className,
  disabled = false,
} : ProfileFolloweesButtonProps) {
  const common = useTranslations('common');
  const { createModal } = useModal();

  return (
    <TooltipBox tooltip={upperFirst(common('messages.see_followees'))}>
      <Button
        variant={'action'}
        onClick={() => createModal({
          header: {
            title: upperFirst(common('messages.followee', { count: 2 })),
          },
          content: <ProfileFolloweesModal userId={userId} />,
        })}
        className={cn(className)}
        disabled={disabled}
      >
      {common('messages.followee', { count: 2 })}
      </Button>
    </TooltipBox>
  );
}
