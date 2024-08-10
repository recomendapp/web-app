'use client';

// COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// ICONS
import { useState } from 'react';
import { Modal } from '@/components/Modals/Modal';
import { cn } from '@/lib/utils';
import { ProfileFolloweesModal } from '@/components/Modals/Profile/ProfileFolloweesModal';

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
  const [ openSendModal, setOpenSendModal ] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'action'}
            onClick={() => setOpenSendModal(true)}
			      className={cn(className)}
            disabled={disabled}
          >
            suivi(e)s
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
			    Voir ses suivis
		    </TooltipContent>
      </Tooltip>
      <Modal
        open={openSendModal}
        setOpen={setOpenSendModal}
        header={{
          title: 'Suivi(e)s',
        }}
        content={
          <ProfileFolloweesModal
            userId={userId}
          />
        }
      />
    </>
  );
}
