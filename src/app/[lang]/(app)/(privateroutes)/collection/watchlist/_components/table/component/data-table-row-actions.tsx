'use client';

import Link from 'next/link';
import { Column, Row, Table } from '@tanstack/react-table';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';

// UI
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// ICONS
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import ButtonShare from '@/components/utils/ButtonShare';
import { useAuth } from '@/context/auth-context';

// GRAPHQL
import toast from 'react-hot-toast';
import { Movie, UserMovieWatchlist } from '@/types/type.db';
import { useQueryClient } from '@tanstack/react-query';
import ModalMovieWatchlistComment from '@/components/Modals/Movie/ModalMovieWatchlistComment';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { useUserMovieWatchlistDelete } from '@/features/user/userMutations';
import { userKeys } from '@/features/user/userKeys';

interface DataTableRowActionsProps {
  table: Table<UserMovieWatchlist>;
  row: Row<UserMovieWatchlist>;
  column: Column<UserMovieWatchlist, unknown>;
  data: UserMovieWatchlist;
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const { user } = useAuth();
  const { openModal, createConfirmModal } = useModal();
  
  const queryClient = useQueryClient();

  const [openShowDirectors, setOpenShowDirectors] = useState(false);

  const deleteWatchlist = useUserMovieWatchlistDelete();

  const handleUnwatchlist = async () => {
    if (!data) return;
    await deleteWatchlist.mutateAsync({
      watchlistId: data.id,
    }, {
      onSuccess: () => {
        queryClient.setQueryData(userKeys.watchlist(user?.id as string), (oldData: UserMovieWatchlist[]) => {
          return (oldData ?? []).filter((activity) => activity?.id !== data.id)
        });
      },
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    });
  }

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
            <Link href={`/film/${data?.movie_id}`}>
              <Icons.eye className='w-4' />
              Voir le film
            </Link>
          </DropdownMenuItem>
          <ShowDirectorsButton
            movie={data?.movie}
            setOpen={setOpenShowDirectors}
          />
          <DropdownMenuItem
            onClick={() => openModal(ModalMovieWatchlistComment, { watchlistItem: data })}
          >
            <Icons.comment className='w-4' />
            {data?.comment ? 'Voir le commentaire' : 'Ajouter un commentaire'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.share className='w-4' />
            <ButtonShare url={`${location.origin}/film/${data?.movie_id}`} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => createConfirmModal({
              title: 'Supprimer de la watchlist',
              description: 'Êtes-vous sûr de vouloir supprimer ce film de votre watchlist ?',
              onConfirm: async () => data && await handleUnwatchlist(),
            })}
          >
            <Icons.delete className='w-4' />
            Delete
          </DropdownMenuItem>
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
  if (movie?.directors?.length == 1) {
    return (
      <DropdownMenuItem asChild>
        <Link href={`/person/${movie.directors[0].slug ?? movie.directors[0].id}`}>
          <Icons.user className='w-4' />
          Voir le réalisateur
        </Link>
      </DropdownMenuItem>
    );
  }
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      <Icons.user className='w-4' />
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
