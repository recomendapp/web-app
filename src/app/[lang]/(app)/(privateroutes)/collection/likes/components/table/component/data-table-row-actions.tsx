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
} from '@/components/ui/dialog';

// ICONS
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import ButtonShare from '@/components/utils/ButtonShare';
import { useAuth } from '@/context/auth-context';

import toast from 'react-hot-toast';
import { Movie, Person, UserMovieActivity } from '@/types/type.db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

interface DataTableRowActionsProps {
  table: Table<UserMovieActivity>;
  row: Row<UserMovieActivity>;
  column: Column<UserMovieActivity, unknown>;
  data: UserMovieActivity;
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [openShowDirectors, setOpenShowDirectors] = useState(false);

  const { mutateAsync: updateActivityMutation } = useMutation({
    mutationFn: async ({ is_liked } : { is_liked: boolean }) => {
      if (!data?.id) throw Error('Missing profile id or movie id');
      const {data: response, error } = await supabase
        .from('user_movie_activity')
        .update({
            is_liked: is_liked,
        })
        .eq('id', data?.id)
        .select(`*, review:user_movie_review(*)`)
        .single()
      if (error) throw error;
      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['user', user?.id, 'collection', 'likes'], (oldData: UserMovieActivity[]) => {
        return (oldData ?? [])?.filter((activity) => activity?.id !== response.id)
      })
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId: data?.movie_id }], response)
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
            <Link href={`/film/${data?.movie_id}`}>Voir le film</Link>
          </DropdownMenuItem>
          <ShowDirectorsButton
            movie={data?.movie}
            setOpen={setOpenShowDirectors}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonShare url={`${location.origin}/film/${data?.movie_id}`} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => updateActivityMutation({ is_liked: false })}
          >
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
        <Link href={`/person/${movie.directors[0].person.id}`}>
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
          {movie?.directors?.map(({ person } : { person: Person }) => (
            <Button key={person?.id} variant={'ghost'} asChild>
              <Link href={`/person/${person?.id}`}>{person?.name}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
