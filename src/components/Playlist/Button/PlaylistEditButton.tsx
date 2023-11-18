'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { useAuth } from '@/context/AuthContext/auth-context';
import { Playlist } from '@/types/type.playlist';

export function PlaylistEditButton({
  children,
  filmId,
  playlist,
  setPlaylist,
}: {
  children?: React.ReactNode,
  filmId?: string;
  playlist?: Playlist;
  setPlaylist?: Dispatch<SetStateAction<Playlist>>;
}) {
  const { user } = useAuth();
  const [ open, setOpen ] = useState(false);

  if (!user)
    return children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => user.id == playlist?.user_id && setOpen(!open)}>
        {children}
      </div>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {playlist ? 'Modifier les informations' : 'Créer une playlist'}
          </DialogTitle>
        </DialogHeader>
        <PlaylistForm
          success={() => setOpen(false)}
          userId={user.id}
          filmId={filmId}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      </DialogContent>
    </Dialog>
  );
}
