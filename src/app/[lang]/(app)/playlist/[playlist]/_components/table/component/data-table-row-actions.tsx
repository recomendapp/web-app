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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// ICONS
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import ButtonShare from '@/components/utils/ButtonShare';
import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/Playlist/PlaylistCommentModal';
import { Movie, PlaylistItem } from '@/types/type.db';
import { ModalMoviePlaylist } from '@/components/Modals/Movie/Actions/ModalMoviePlaylist';
import { EyeIcon, TextIcon } from 'lucide-react';
import { Icons } from '@/config/icons';
import { useDeletePlaylistItem } from '@/features/playlist/playlistMutations';
import { usePlaylistIsAllowedToEdit } from '@/features/playlist/playlistQueries';


interface DataTableRowActionsProps {
  data: PlaylistItem;
}

export function DataTableRowActions({ data }: DataTableRowActionsProps) {
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(data?.playlist_id as number);
  const { openModal, createConfirmModal } = useModal();
  
  const [openShowDirectors, setOpenShowDirectors] = useState(false);

  // const { mutateAsync: deletePlaylistItem } = useMutation({
  //   mutationFn: async () => {
	// 		if (!data?.id) throw Error('Missing id');
	// 		const { error } = await supabase
	// 		  .from('playlist_item')
	// 		  .delete()
	// 		  .eq('id', data.id)
	// 		if (error) throw error;
	// 		return null;
	// 	},
  //   onError: () => {
  //     toast.error('Une erreur s\'est produite');
  //   }
  // })

  const { mutateAsync: deletePlaylistItem } = useDeletePlaylistItem();

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

        <DropdownMenuContent align="end" className="max-w-sm">
          <DropdownMenuItem asChild>
            <Link href={`/film/${data?.movie_id}`}>
              <EyeIcon className='w-4' />
              Voir le film
            </Link>
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
              <TextIcon className='w-4' />
              {data?.comment ? 'Voir le commentaire' : 'Ajouter un commentaire'}
            </DropdownMenuItem>
          )}
          {/* PLAYLIST */}
          {isAllowedToEdit && (
            <DropdownMenuItem
              onClick={() => openModal(ModalMoviePlaylist, { movieId: data?.movie_id!, movie: data?.movie })}
            >
              <Icons.addPlaylist className='w-4' />
              Ajouter à une playlist
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.share className='w-4' />
            <ButtonShare url={`${location.origin}/film/${data?.movie_id}`} />
          </DropdownMenuItem>
          {isAllowedToEdit && (
            <DropdownMenuItem
              onClick={() => createConfirmModal({
                title: 'Supprimer le film',
                description: `Êtes-vous sûr de vouloir supprimer ${data?.movie?.title} de la playlist ?`,
                onConfirm: () => data && deletePlaylistItem({ playlistItemId: data.id, movieId: data.movie_id }),
              })}
            >
              <Icons.trash />
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
        <Link href={`/person/${movie.directors[0].slug ?? movie.directors[0].id}`}>
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
          {movie?.directors?.map((person) => (
            <Button key={person?.id} variant={'ghost'} asChild>
              <Link href={`/person/${person?.slug ?? person?.id}`}>{person?.name}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
