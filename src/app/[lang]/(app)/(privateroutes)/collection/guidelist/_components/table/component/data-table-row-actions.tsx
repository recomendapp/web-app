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

import toast from 'react-hot-toast';
import { GuidelistSendersModal } from '@/components/modals/Guidelist/GuidelistSendersModal';
import { useModal } from '@/context/modal-context';
import { Movie, Person, UserMovieGuidelistView } from '@/types/type.db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

interface DataTableRowActionsProps {
  table: Table<UserMovieGuidelistView>;
  row: Row<UserMovieGuidelistView>;
  column: Column<UserMovieGuidelistView, unknown>;
  data: UserMovieGuidelistView;
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const [openShowDirectors, setOpenShowDirectors] = useState(false);

  const { mutateAsync: deleteGuidelistMutation } = useMutation({
    mutationFn: async () => {
      if (!data?.movie_id || !data.user_id) throw Error('Missing movie id or user id');
      const { error } = await supabase
        .from('user_movie_guidelist')
        .update({ status: 'deleted' })
        .eq('movie_id', data.movie_id)
        .eq('user_id', data.user_id)
        .eq('status', 'active')
      if (error) throw error;
      return data;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['user', user?.id, 'collection', 'guidelist'], (oldData: UserMovieGuidelistView[]) => {
        return (oldData ?? [])?.filter((activity) => activity?.movie_id !== response.movie_id)
      });
      toast.success('Supprimé');
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

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
            <Link href={`/film/${data?.movie?.slug ?? data.movie_id}`}>Voir le film</Link>
          </DropdownMenuItem>
          <ShowDirectorsButton
            movie={data?.movie}
            setOpen={setOpenShowDirectors}
          />
          {data?.senders?.length! > 0 && (
            <DropdownMenuItem
              // onClick={() => openModal({
              //   id: `guidelist-${row.original?.movie_id}-senders`,
              //   header: {
              //     title: 'Reco par',
              //   },
              //   content: <GuidelistSendersModal comments={row.original?.senders}/>,
              // })}
              onClick={() => openModal(GuidelistSendersModal, { comments: row.original?.senders })}
            >
              Voir les recos
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonShare url={`${location.origin}/film/${data?.movie_id}`} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => await deleteGuidelistMutation()}>
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
  if (movie.directors.length == 1) {
    return (
      <DropdownMenuItem asChild>
        <Link href={`/person/${movie.directors[0]?.id}`}>
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
