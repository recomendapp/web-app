'use client';
import { ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

import { useModal } from '@/context/modal-context';
import { MoviePlaylistModal } from '@/components/Modals/Movie/Actions/MoviePlaylistModal';
import { Icons } from '@/components/icons';
import { Modal } from '@/components/Modals/Modal';
import { useState } from 'react';

interface MoviePlaylistActionProps {
  movieId: number;
}

export function MoviePlaylistAction({ movieId }: MoviePlaylistActionProps) {
  
  const { user, loading } = useAuth();

  const { openModal } = useModal();

  const router = useRouter();

  const [ openAddPlaylistModal, setOpenAddPlaylistModal ] = useState(false);

  if (user === null) {
    return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={loading}
              size="icon"
              variant={'action'}
              className="rounded-full"
            >
              <ListPlus />
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
            onClick={() => setOpenAddPlaylistModal(true)}
          >
            {loading ? <Icons.spinner className="animate-spin" /> : <ListPlus />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Ajouter à une playlist
        </TooltipContent>
      </Tooltip>
      <Modal
        open={openAddPlaylistModal}
        setOpen={setOpenAddPlaylistModal}
        header={{
          title: 'Ajouter à',
        }}
        content={
          <MoviePlaylistModal
            onClose={() => setOpenAddPlaylistModal(false)}
            movieId={movieId} 
          />
        }
      />
    </>
  );
}
