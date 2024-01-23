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
import { useMutation } from '@apollo/client';
import { useAuth } from '@/context/auth-context';

// GRAPHQL
import GET_USER_MOVIE_ACTIVITY from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivity';
import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
import DELETE_FILM_LIKE_MUTATION from '@/components/Movie/Actions/mutations/updateUserMovieActivityMutation';
import USER_MOVIE_ACTIVITY_QUERY from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
import UPDATE_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/UpdateUserMovieActivity';
import { GetUserMovieActivityQuery, TmdbMovieMinimalFragment, UpdateUserMovieActivityMutation, UserMovieActivityFragment } from '@/graphql/__generated__/graphql';
import toast from 'react-hot-toast';
import { useLocale } from 'next-intl';

interface DataTableRowActionsProps {
  table: Table<{ node: UserMovieActivityFragment }>;
  row: Row<{ node: UserMovieActivityFragment }>;
  column: Column<{ node: UserMovieActivityFragment }, unknown>;
  data: { node: UserMovieActivityFragment };
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
  const [deleteFilmLikeMutation, { error: errorDeleteFilmLike }] = useMutation(
    DELETE_FILM_LIKE_MUTATION,
    {
      update: (cache, { data }) => {
        const filmLikesData = cache.readQuery<any>({
          query: USER_MOVIE_ACTIVITY_QUERY,
          variables: {
            filter: {
              user_id: { eq: user?.id },
              is_liked: { eq: true },
            },
            orderBy: {
              created_at: 'DescNullsLast',
            },
          },
        });
        cache.writeQuery({
          query: USER_MOVIE_ACTIVITY_QUERY,
          variables: {
            filter: {
              user_id: { eq: user?.id },
              is_liked: { eq: true },
            },
            orderBy: {
              created_at: 'DescNullsLast',
            },
          },
          data: {
            user_movie_activityCollection: {
              edges: filmLikesData!.user_movie_activityCollection.edges.filter(
                (edge: any) =>
                  edge.node.movie_id !=
                  data?.updateuser_movie_activityCollection?.records[0]
                    ?.movie_id
              ),
            },
          },
        });
      },
    }
  );

  const [updateActivityMutation] = useMutation<UpdateUserMovieActivityMutation>(
    UPDATE_ACTIVITY_MUTATION,
    {
      update: (cache, { data: cacheData }) => {
        cache.writeQuery({
          query: GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID,
          variables: {
            movie_id: data.node.movie_id,
            user_id: user?.id,
          },
          data: {
            user_movie_activityCollection: {
              edges: [
                {
                  node: cacheData?.updateuser_movie_activityCollection?.records[0],
                },
              ],
            },
          },
        });

        const likesData = cache.readQuery<GetUserMovieActivityQuery>({
          query: GET_USER_MOVIE_ACTIVITY,
          variables: {
            filter: {
              user_id: { eq: user?.id },
              is_liked: { eq: true },
            },
            orderBy: {
              created_at: 'DescNullsLast',
            },
            locale: locale,
          },
        });
        if (likesData?.user_movie_activityCollection?.edges) {
          cache.writeQuery<GetUserMovieActivityQuery>({
            query: GET_USER_MOVIE_ACTIVITY,
            variables: {
              filter: {
                user_id: { eq: user?.id },
                is_liked: { eq: true },
              },
              orderBy: {
                created_at: 'DescNullsLast',
              },
              locale: locale,
            },
            data: {
              ...likesData,
              user_movie_activityCollection: {
                ...likesData?.user_movie_activityCollection,
                edges: likesData!.user_movie_activityCollection?.edges.filter(
                  ({ node }) =>
                    node.id !=
                    cacheData?.updateuser_movie_activityCollection?.records[0]
                      ?.id
                ),
              },
            },
          });
        }

      },
    }
  );

  const handleUnlike = async () => {
    try {
      if (!user || !data.node.movie_id) throw Error("User or movieId doesn't exist");
      await updateActivityMutation({
        variables: {
          id: data.node.id,
          movie_id: data.node.movie_id,
          user_id: user.id,
          is_liked: false,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
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
          <DropdownMenuItem
            onClick={handleUnlike}
          >
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
  if (!movie?.directors?.edges.length) {
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
