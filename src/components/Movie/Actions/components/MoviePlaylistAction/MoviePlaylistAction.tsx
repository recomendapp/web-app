'use client';
import { ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useAuth } from '@/context/auth-context';

import { useModal } from '@/context/modal-context';
import { MoviePlaylistModal } from '@/components/Modals/Movie/Actions/MoviePlaylistModal';
import { Icons } from '@/components/icons';
import { Modal } from '@/components/Modals/Modal';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MoviePlaylistActionProps {
  movieId: number;
}

export function MoviePlaylistAction({ movieId }: MoviePlaylistActionProps) {
  
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const { openModal } = useModal();

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
                <ListPlus />
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
            onClick={() => openModal(MoviePlaylistModal, { movieId })}
          >
            {loading ? <Icons.spinner className="animate-spin" /> : <ListPlus />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Ajouter à une playlist
        </TooltipContent>
      </Tooltip>
    </>
  );
}
