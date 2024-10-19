'use client';

import React, { useState } from 'react';
import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Modal } from '@/components/Modals/Modal';
import { useModal } from '@/context/modal-context';
import { PlaylistModal } from '@/components/Modals/Playlist/PlaylistModal';
import { TooltipBox } from '@/components/Box/TooltipBox';

export function PlaylistCreateButton({
  icon = true,
  filmId,
}: {
  icon?: boolean;
  filmId?: string;
}) {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
      <TooltipBox tooltip='Créer une playlist'>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="rounded-full shrink-0"
          onClick={() => openModal(PlaylistModal, { filmId })}
        >
          {icon ? <Plus /> : 'Créer une playlist'}
        </Button>
      </TooltipBox>
  )
}
