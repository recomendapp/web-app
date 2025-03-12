'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React, { useState } from 'react';
import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { Playlist } from '@/types/type.db';

export function PlaylistEditButton({
  children,
  filmId,
  playlist,
}: {
  children?: React.ReactNode;
  filmId?: string;
  playlist?: Playlist;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('general');

  if (!user || user?.id != playlist?.user_id) return children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="absolute top-4 right-4 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <PencilIcon size={20} />
      </Button>
      <div onClick={() => setOpen(!open)}>{children}</div>
      <DialogContent className="max-w-3xl h-[98%] lg:h-2/3">
        {!playlist ? (
          <>
            <DialogHeader>
              <DialogTitle>Créer une playlist</DialogTitle>
            </DialogHeader>
            <PlaylistForm
              success={() => setOpen(false)}
              filmId={filmId}
              playlist={playlist}
            />
          </>
        ) : (
          <>
            <DialogHeader className="flex-row space-y-0">
              <DialogTitle
                className={`py-2 px-4 border-b-2 cursor-pointer
                  ${view == 'general' ? 'border-accent-yellow' : 'border-muted'}
                `}
                onClick={() => setView('general')}
              >
                General
              </DialogTitle>
              <DialogTitle
                className={`py-2 px-4 border-b-2 cursor-pointer
                  ${view == 'guest' ? 'border-accent-yellow' : 'border-muted'}
                `}
                onClick={() => setView('guest')}
              >
                Members
              </DialogTitle>
            </DialogHeader>
            {view == 'general' && (
              <PlaylistForm
                success={() => setOpen(false)}
                filmId={filmId}
              />
            )}
            {/* {view == 'guest' && (
              // <ScrollArea className="border h-full">
                <PlaylistGuest playlist={playlist} />
              // </ScrollArea>
            )} */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
