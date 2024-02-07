'use client';
import { ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

import { useModal } from '@/context/modal-context';
import { MoviePlaylistModal } from '@/components/Modals/Movie/Actions/MoviePlaylistModal';
import { Icons } from '@/components/icons';

interface MoviePlaylistActionProps {
  movieId: number;
}

export function MoviePlaylistAction({ movieId }: MoviePlaylistActionProps) {
  
  const { user, loading } = useAuth();

  const { openModal } = useModal();

  const router = useRouter();

  if (user === null) {
    return (
      <TooltipProvider>
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
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={loading}
            size="icon"
            variant={'action'}
            className="rounded-full"
            onClick={() => openModal({
              id: `movie-${movieId}-playlist`,
              header: {
                title: 'Ajouter à',
              },
              content: (
                <MoviePlaylistModal
                  id={`movie-${movieId}-playlist`}
                  movieId={movieId} 
                />
              ),
            })}
          >
            {loading ? <Icons.spinner className="animate-spin" /> : <ListPlus />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Ajouter à une playlist
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
