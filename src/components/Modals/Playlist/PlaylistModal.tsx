'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React, { useState } from 'react';
import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { useAuth } from '@/context/auth-context';
import PlaylistGuest from '@/components/Playlist/FilmPlaylist/PlaylistGuest/PlaylistGuest';
import { PlaylistFragment } from '@/graphql/__generated__/graphql';
import { useModal } from '@/context/modal-context';

export function PlaylistModal({
  id,
  filmId,
  playlist,
}: {
  id: string;
  filmId?: string;
  playlist?: PlaylistFragment;
}) {
  const { user } = useAuth();
  const [view, setView] = useState('general');
  const { closeModal } = useModal();

  if (!user) return null;

  return (
    <>
      {!playlist ? (
        <>
          <DialogHeader>
            <DialogTitle>Créer une playlist</DialogTitle>
          </DialogHeader>
          <PlaylistForm
            success={() => closeModal(id)}
            userId={user?.id}
            filmId={filmId}
            playlist={playlist}
          />
        </>
      ) : (
        <>
          <DialogHeader className="flex-row space-y-0">
            <DialogTitle
              className={`py-2 px-4 border-b-2 cursor-pointer
                ${view == 'general' ? 'border-accent-1' : 'border-muted'}
              `}
              onClick={() => setView('general')}
            >
              General
            </DialogTitle>
            <DialogTitle
              className={`py-2 px-4 border-b-2 cursor-pointer
                ${view == 'guest' ? 'border-accent-1' : 'border-muted'}
              `}
              onClick={() => setView('guest')}
            >
              Members
            </DialogTitle>
          </DialogHeader>
          {view == 'general' && (
            <PlaylistForm
              success={() => closeModal(id)}
              userId={user.id}
              filmId={filmId}
              playlist={playlist}
            />
          )}
          {view == 'guest' && (
              <PlaylistGuest playlist={playlist} />
          )}
        </>
      )}
    </>
  );
}
