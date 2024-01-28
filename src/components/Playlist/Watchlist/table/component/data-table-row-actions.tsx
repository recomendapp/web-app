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
import { useMutation } from '@apollo/client';
import DELETE_USER_MOVIE_WATCHLIST from '@/graphql/User/Movie/Watchlist/mutations/DeleteUserMovieWatchlist';
import GET_USER_MOVIE_WATCHLIST_BY_USER_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByUserId';
import { DeleteUserMovieWatchlistMutation, GetUserMovieWatchlistByUserIdQuery, TmdbMovieMinimalFragment, UserMovieWatchlistFragment } from '@/graphql/__generated__/graphql';
import { useLocale } from 'next-intl';
import toast from 'react-hot-toast';

interface DataTableRowActionsProps {
  table: Table<{ node: UserMovieWatchlistFragment }>;
  row: Row<{ node: UserMovieWatchlistFragment }>;
  column: Column<{ node: UserMovieWatchlistFragment }, unknown>;
  data: { node: UserMovieWatchlistFragment };
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const { user } = useAuth();
  const locale = useLocale();
  const [openShowDirectors, setOpenShowDirectors] = useState(false);
  const [deleteFilmWatchlistMutation, { error: errorDeletingWatch }] =
    useMutation<DeleteUserMovieWatchlistMutation>(DELETE_USER_MOVIE_WATCHLIST, {
      update: (cache, { data }) => {
        const watchlistData = cache.readQuery<GetUserMovieWatchlistByUserIdQuery>({
          query: GET_USER_MOVIE_WATCHLIST_BY_USER_ID,
          variables: {
            user_id: user?.id,
            locale: locale,
          },
        });
        if (watchlistData?.user_movie_watchlistCollection?.edges) {
          cache.writeQuery<GetUserMovieWatchlistByUserIdQuery>({
            query: GET_USER_MOVIE_WATCHLIST_BY_USER_ID,
            variables: {
              user_id: user?.id,
              locale: locale,
            },
            data: {
              ...watchlistData,
              user_movie_watchlistCollection: {
                ...watchlistData?.user_movie_watchlistCollection,
                edges: watchlistData!.user_movie_watchlistCollection?.edges.filter(
                  ({ node }) =>
                    node.id !=
                    data?.deleteFromuser_movie_watchlistCollection?.records[0]
                      ?.id
                ),
              },
            },
          });
        }
      },
    });

    const handleUnwatchlist = async () => {
      try {
        if (!user || !data.node.id) throw Error("User or nodeId doesn't exist");
        await deleteFilmWatchlistMutation({
          variables: {
            id: data.node.id,
          },
        });
      } catch (errors) {
        toast.error("Une erreur s\'est produite");
      }
    };

  return (
    <>
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-end">
          <div className="hidden lg:invisible lg:group-hover:visible lg:flex items-center gap-2">
            <MovieAction filmId={data.node.movie_id} rating like />
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
            <Link href={`/film/${data.node.movie_id}`}>Voir le film</Link>
          </DropdownMenuItem>
          <ShowDirectorsButton
            movie={data.node.movie}
            setOpen={setOpenShowDirectors}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonShare url={`${location.origin}/film/${data.node.movie_id}`} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUnwatchlist}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal
        movie={data.node.movie}
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
  if (movie.directors?.edges.length == 1) {
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
