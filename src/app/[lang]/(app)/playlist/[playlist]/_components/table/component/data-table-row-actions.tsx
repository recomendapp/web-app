'use client';

import Link from 'next/link';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';

// UI
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// ICONS
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import ButtonShare from '@/components/utils/ButtonShare';

import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/Playlist/PlaylistCommentModal';
import { Movie, Person, Playlist, PlaylistGuest, PlaylistItem } from '@/types/type.db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { MoviePlaylistModal } from '@/components/Modals/Movie/Actions/MoviePlaylistModal';
import { Modal } from '@/components/Modals/Modal';


interface DataTableRowActionsProps {
  data: PlaylistItem;
}

export function DataTableRowActions({ data }: DataTableRowActionsProps) {
  
  const { openModal, createConfirmModal } = useModal();
  
  const [openShowDirectors, setOpenShowDirectors] = useState(false);

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const playlist = queryClient.getQueryData<Playlist>(['playlist', data?.playlist_id]);

  const isAllowedToEdit = Boolean(
    user?.id &&
    playlist &&
    (
      user?.id === playlist?.user_id ||
      (
        playlist?.guests?.some(
          (guest: PlaylistGuest ) => guest?.user_id === user?.id && guest?.edit
        ) &&
        playlist?.user?.premium
      )
    )
  );

  const { mutateAsync: deletePlaylistItem } = useMutation({
    mutationFn: async () => {
			if (!data?.id) throw Error('Missing id');
			const { error } = await supabase
			  .from('playlist_item')
			  .delete()
			  .eq('id', data.id)
			if (error) throw error;
			return null;
		},
    onError: () => {
      toast.error('Une erreur s\'est produite');
    }
  })

  return (
    <>
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-end">
          <div className="hidden lg:invisible lg:group-hover:visible lg:flex items-center gap-2">
            <MovieAction filmId={data?.movie_id!} rating like />
          </div>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4 text-accent-1" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/film/${data?.movie_id}`}>Voir le film</Link>
          </DropdownMenuItem>
          <ShowDirectorsButton
            movie={data?.movie}
            setOpen={setOpenShowDirectors}
          />
          {/* COMMENT */}
          {/* {isAllowedToEdit && (
            <DropdownMenuItem
              // onClick={() => openModal({
              //   id: `playlist-item-${data?.id}-comment`,
              //   content: <PlaylistCommentModal id={`playlist-item-${data?.id}-comment`} playlistItem={data!} />,
              // })}
              onClick={() => openModal(PlaylistCommentModal, { playlistItem: data! })}
            >
              {data?.comment ? 'Voir le commentaire' : 'Ajouter un commentaire'}
            </DropdownMenuItem>
          )}
          {!isAllowedToEdit && data?.comment && (
            <DropdownMenuItem
              onClick={() => openModal({
                id: `playlist-item-${data?.id}-comment`,
                content: <PlaylistCommentModal id={`playlist-item-${data?.id}-comment`} playlistItem={data!} />,
              })}
            >
              Voir le commentaire
            </DropdownMenuItem>
          )} */}
          {(isAllowedToEdit || data?.comment) && (
            <DropdownMenuItem
              onClick={() => openModal(PlaylistCommentModal, { playlistItem: data! })}
            >
              {data?.comment ? 'Voir le commentaire' : 'Ajouter un commentaire'}
            </DropdownMenuItem>
          )}
          {/* PLAYLIST */}
          {user?.id && (
            <DropdownMenuItem
              onClick={() => openModal(MoviePlaylistModal, { movieId: data?.movie_id! })}
            >
              Ajouter à une playlist
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonShare url={`${location.origin}/film/${data?.movie_id}`} />
          </DropdownMenuItem>
          {isAllowedToEdit && (
            <DropdownMenuItem
              onClick={() => createConfirmModal({
                title: 'Supprimer le film',
                description: `Êtes-vous sûr de vouloir supprimer ${data?.movie?.title} de la playlist ?`,
                onConfirm: deletePlaylistItem,
              })}
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal
        movie={data?.movie}
        open={openShowDirectors}
        setOpen={setOpenShowDirectors}
      />
    </>
  );
}

export function ShowDirectorsButton({
  movie,
  setOpen,
}: {
  movie: Movie;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  if (!movie?.directors?.length) {
    return (
      <DropdownMenuItem asChild>
        <p>Unknow</p>
      </DropdownMenuItem>
    );
  }
  if (movie?.directors.length == 1) {
    return (
      <DropdownMenuItem asChild>
        <Link href={`/person/${movie.directors[0].id}`}>
          Voir le réalisateur
        </Link>
      </DropdownMenuItem>
    );
  }
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      Voir les réalisateurs
    </DropdownMenuItem>
  );
}

export function ShowDirectorsModal({
  movie,
  open,
  setOpen,
}: {
  movie: Movie;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl bg-black">
        <DialogHeader>
          <DialogTitle className="text-center">Réalisateur</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {movie?.directors?.map((person: any) => (
            <Button key={person?.id} variant={'ghost'} asChild>
              <Link href={`/person/${person?.id}`}>{person?.name}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
