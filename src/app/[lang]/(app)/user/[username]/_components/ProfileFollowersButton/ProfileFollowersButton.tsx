'use client';
import { useRouter } from 'next/navigation';

// AUTH
import { useAuth } from '@/context/auth-context';

// COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// ICONS
import { Send } from 'lucide-react';
import { Icons } from '@/components/icons';
import { MovieSendModal } from '@/components/Modals/Movie/Actions/MovieSendModal';
import { useState } from 'react';
import { Modal } from '@/components/Modals/Modal';
import { cn } from '@/lib/utils';
import { ProfileFollowersModal } from '@/components/Modals/Profile/ProfileFollowersModal';

interface ProfileFollowersButtonProps {
  userId: string;
  className?: string;
}

export function ProfileFollowersButton({
	userId,
	className,
} : ProfileFollowersButtonProps) {
  const [ openSendModal, setOpenSendModal ] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'action'}
            onClick={() => setOpenSendModal(true)}
			className={cn(className)}
          >
			followers
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
			Voir ses followers
		</TooltipContent>
      </Tooltip>
      <Modal
        open={openSendModal}
        setOpen={setOpenSendModal}
        header={{
          title: 'Followers',
        }}
        content={
			<ProfileFollowersModal
				userId={userId}
			/>
        }
      />
    </>
  );
}
