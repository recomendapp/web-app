'use client';

import { Button } from '@/components/ui/button';

// ICONS
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProfileFolloweesModal } from '@/components/Modals/Profile/ProfileFolloweesModal';
import { useModal } from '@/context/modal-context';
import { TooltipBox } from '@/components/Box/TooltipBox';

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
  const { createModal } = useModal();
  const [ openSendModal, setOpenSendModal ] = useState(false);

  return (
    <TooltipBox tooltip='Voir ses suivis'>
      <Button
        variant={'action'}
        onClick={() => createModal({
          header: {
            title: 'Followees',
          },
          content: <ProfileFolloweesModal userId={userId} />,
        })}
        className={cn(className)}
        disabled={disabled}
      >
        suivi(e)s
      </Button>
    </TooltipBox>
  );
}
