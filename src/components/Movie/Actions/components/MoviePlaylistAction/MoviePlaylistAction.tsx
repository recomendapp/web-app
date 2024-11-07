'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useAuth } from '@/context/auth-context';

import { useModal } from '@/context/modal-context';
import { ModalMoviePlaylist } from '@/components/Modals/Movie/Actions/ModalMoviePlaylist';
import { Icons } from '@/config/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TooltipBox } from '@/components/Box/TooltipBox';

interface MoviePlaylistActionProps {
  movieId: number;
}

export function MoviePlaylistAction({ movieId }: MoviePlaylistActionProps) {
  
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const { openModal } = useModal();

  if (user === null) {
    return (
        <TooltipBox tooltip={'Connectez-vous'}>
          <Button
            size="icon"
            variant={'action'}
            className="rounded-full"
            asChild
          >
            <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
              <Icons.addPlaylist />
            </Link>
          </Button>
        </TooltipBox>
    );
  }

  return (
    <TooltipBox tooltip={'Ajouter à une playlist'}>
      <Button
        disabled={loading}
        size="icon"
        variant={'action'}
        className="rounded-full"
        onClick={() => openModal(ModalMoviePlaylist, { movieId })}
      >
        {loading ? <Icons.spinner className="animate-spin" /> : <Icons.addPlaylist />}
      </Button>
    </TooltipBox>
  );
}
