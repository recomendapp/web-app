'use client';
import { usePathname } from 'next/navigation';

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
import Link from 'next/link';
import { useModal } from '@/context/modal-context';

interface MovieSendActionProps {
  movieId: number;
}

export function MovieSendAction({ movieId }: MovieSendActionProps) {
  const { user, loading } = useAuth();
  const { openModal } = useModal();
  const pathname = usePathname();

  const [ openSendModal, setOpenSendModal ] = useState(false);

  if (user === null) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={'action'}
            className="rounded-full"
            asChild
          >
            <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
              <Send />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Connectez-vous</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={loading}
            size="icon"
            variant={'action'}
            className="rounded-full"
            // onClick={() => setOpenSendModal(true)}
            onClick={() => openModal(MovieSendModal, { movieId })}
          >
            {loading ? <Icons.spinner className="animate-spin" /> : <Send />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Envoyer à un(e) ami(e)</TooltipContent>
      </Tooltip>
      {/* <Modal
        open={openSendModal}
        onOpenChange={setOpenSendModal}
        header={{
          title: 'Envoyer à',
        }}
        content={
          <MovieSendModal
            onClose={() => setOpenSendModal(false)}
            movieId={movieId} 
          />
        }
      /> */}
    </>
  );
}
