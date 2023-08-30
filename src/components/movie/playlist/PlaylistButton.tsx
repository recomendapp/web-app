'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Dispatch, useState } from 'react';
import { PlaylistForm } from '@/components/movie/playlist/PlaylistForm';
import { useQueryClient } from 'react-query';

interface PlaylistButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  movieId?: number;
  playlist?: any;
  setPlaylist?: Dispatch<any>;
}

export function PlaylistButton({
  children,
  userId,
  movieId,
  playlist,
  setPlaylist,
}: PlaylistButtonProps) {
  const [playlistModalIsOpen, setPlaylistModalIsOpen] = useState(false);

  const queryClient = useQueryClient();

  return (
    <Dialog open={playlistModalIsOpen} onOpenChange={setPlaylistModalIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {playlist ? 'Modifier les informations' : 'Créer une playlist'}
          </DialogTitle>
        </DialogHeader>
        <PlaylistForm
          success={() => {
            setPlaylistModalIsOpen(false);
            queryClient.invalidateQueries(['user', userId, 'playlists']);
          }}
          userId={userId}
          movieId={movieId}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      </DialogContent>
    </Dialog>
  );
}
