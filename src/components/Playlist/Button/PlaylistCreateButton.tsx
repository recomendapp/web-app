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

export function PlaylistCreateButton({
  icon = true,
  filmId,
}: {
  icon?: boolean;
  filmId?: string;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full shrink-0"
            onClick={() => setOpen(!open)}
          >
            {icon ? <Plus /> : 'Créer une playlist'}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Créer une playlist</TooltipContent>
      </Tooltip>
      <Modal
        open={open}
        setOpen={setOpen}
        header={{
          title: 'Créer une playlist',
        }}
        content={
          <PlaylistForm
            success={() => setOpen(false)}
            filmId={filmId}
          />
        }
      />
    </>
  )
}
