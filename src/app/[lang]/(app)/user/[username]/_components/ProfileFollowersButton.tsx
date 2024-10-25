'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProfileFollowersModal } from '@/components/modals/Profile/ProfileFollowersModal';
import { useModal } from '@/context/modal-context';
import { TooltipBox } from '@/components/Box/TooltipBox';

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
  const { createModal } = useModal();

  return (
      <TooltipBox tooltip='Voir ses followers'>
        <Button
          variant={'action'}
          onClick={() => createModal({
            header: {
              title: 'Followers',
            },
            content: <ProfileFollowersModal userId={userId} />,
          })}
          className={cn(className)}
          disabled={disabled}
        >
          followers
        </Button>
      </TooltipBox>
  );
}
