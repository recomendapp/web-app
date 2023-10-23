'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Dispatch, SetStateAction, useState } from 'react';
import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { useQueryClient } from 'react-query';
import { Models } from 'appwrite';

interface PlaylistButtonProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
  filmId?: string;
  playlist?: Models.Document;
  setPlaylist?: Dispatch<SetStateAction<Models.Document>>;
}

export function PlaylistButton({
  open,
  setOpen,
  userId,
  filmId,
  playlist,
  setPlaylist,
}: PlaylistButtonProps) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {playlist ? 'Modifier les informations' : 'Créer une playlist'}
          </DialogTitle>
        </DialogHeader>
        <PlaylistForm
          success={() => setOpen(false)}
          userId={userId}
          filmId={filmId}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      </DialogContent>
    </Dialog>
  );
}
