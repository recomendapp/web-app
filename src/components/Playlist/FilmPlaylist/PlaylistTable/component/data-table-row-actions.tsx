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
import ShowCommentModal from './ShowCommentModal';

// GRAPHQL
import { useMutation, useQuery } from '@apollo/client';
import GET_PLAYLIST_BY_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistById';
import DELETE_PLAYLIST_ITEM from '@/graphql/Playlist/PlaylistItem/mutations/DeletePlaylistItem';
import type { DeletePlaylistItemMutation, GetPlaylistByIdQuery, PlaylistItemFragment, TmdbMovieMinimalFragment} from '@/graphql/__generated__/graphql';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import toast from 'react-hot-toast';


interface DataTableRowActionsProps {
  data: PlaylistItemFragment;
}

export function DataTableRowActions({ data }: DataTableRowActionsProps) {
  const [openShowDirectors, setOpenShowDirectors] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { user } = useAuth();

  const locale = useLocale();

  const { data: playlistQuery, refetch } = useQuery<GetPlaylistByIdQuery>(GET_PLAYLIST_BY_ID, {
    variables: {
      id: data.playlist_id,
      locale: locale
    },
    skip: !data.playlist_id || !locale,
  });
  const playlist = playlistQuery?.playlistCollection?.edges[0]?.node;

  const isAllowedToEdit = Boolean(
    user?.id &&
    playlist &&
    (
      user?.id === playlist?.user_id ||
      (
        playlist?.guests?.edges.some(
          ({ node }) => node.user_id === user?.id && node.edit
        ) &&
        playlist?.user?.subscriptions?.edges.length! > 0
      )
    )
  );

  return (
    <>
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-end">
          <div className="hidden lg:invisible lg:group-hover:visible lg:flex items-center gap-2">
            <MovieAction filmId={data.movie_id} rating like />
          </div>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/film/${data.movie_id}`}>Voir le film</Link>
          </DropdownMenuItem>
          <ShowDirectorsButton
            movie={data.movie}
            setOpen={setOpenShowDirectors}
          />
          {/* COMMENT */}
          {isAllowedToEdit && (
            <DropdownMenuItem onClick={() => setOpenComment(true)}>
              {data.comment ? 'Voir le commentaire' : 'Ajouter un commentaire'}
            </DropdownMenuItem>
          )}
          {!isAllowedToEdit && data.comment && (
            <DropdownMenuItem onClick={() => setOpenComment(true)}>
              Voir le commentaire
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonShare url={`${location.origin}/film/${data.movie_id}`} />
          </DropdownMenuItem>
          {isAllowedToEdit && (
            <DropdownMenuItem onClick={() => setOpenDelete(true)}>
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal
        movie={data.movie}
        open={openShowDirectors}
        setOpen={setOpenShowDirectors}
      />
      <ShowCommentModal
        playlistItem={data}
        open={openComment}
        setOpen={setOpenComment}
      />
      <DeleteModal
        playlistItem={data}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}

export function ShowDirectorsButton({
  movie,
  setOpen,
}: {
  movie: TmdbMovieMinimalFragment;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  if (!movie.directors?.edges.length) {
    return (
      <DropdownMenuItem asChild>
        <p>Unknow</p>
      </DropdownMenuItem>
    );
  }
  if (movie.directors.edges.length == 1) {
    return (
      <DropdownMenuItem asChild>
        <Link href={`/person/${movie.directors.edges[0].node.person.id}`}>
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
  movie: TmdbMovieMinimalFragment;
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
          {movie.directors?.edges.map(({ node }) => (
            <Button key={node.id} variant={'ghost'} asChild>
              <Link href={`/person/${node.person.id}`}>{node.person.name}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteModal({
  playlistItem,
  open,
  setOpen,
}: {
  playlistItem: PlaylistItemFragment;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [deletePlaylistItem] = useMutation<DeletePlaylistItemMutation>(DELETE_PLAYLIST_ITEM);

  async function handleDelete() {
    try {
      const { data } = await deletePlaylistItem({
        variables: {
          id: playlistItem.id,
        },
      });
      if (!data?.deleteFromplaylist_itemCollection?.records?.length) throw new Error('Nothing deleted');
      setOpen(false);
    } catch (error) {
      toast.error("Une erreur s\'est produite");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
