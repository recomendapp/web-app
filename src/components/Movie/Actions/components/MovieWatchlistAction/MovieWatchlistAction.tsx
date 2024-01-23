import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext/auth-context';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

// COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// GRAPHQL
import { useQuery, useMutation } from '@apollo/client';
import GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByMovieId';
import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
import GET_USER_MOVIE_WATCHLIST_BY_USER_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByUserId';
import INSERT_WATCHLIST_MUTATION from '@/graphql/User/Movie/Watchlist/mutations/InsertUserMovieWatchlist';
import DELETE_WATCHLIST_MUTATION from '@/graphql/User/Movie/Watchlist/mutations/DeleteUserMovieWatchlist';
import type {
  DeleteUserMovieWatchlistMutation,
  GetUserMovieActivityByMovieIdQuery,
  GetUserMovieWatchlistByMovieIdQuery,
  InsertUserMovieWatchlistMutation,
} from '@/graphql/__generated__/graphql';

// ICONS
import { AlertCircle, Bookmark } from 'lucide-react';
import { Icons } from '../../../../icons';
import { useLocale } from 'next-intl';

interface MovieWatchlistActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
}

export function MovieWatchlistAction({
  movieId
}
: MovieWatchlistActionProps) {

  const { user } = useAuth();

  const locale = useLocale();

  const router = useRouter();

  const {
    data: activityQuery,
    loading: activityLoading,
    error: activityError,
  } = useQuery<GetUserMovieActivityByMovieIdQuery>(GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID, {
    variables: {
      movie_id: movieId,
      user_id: user?.id,
    },
    skip: !user || !movieId,
  });
  const activity = activityQuery?.user_movie_activityCollection?.edges[0]?.node;

  const {
    data: watchlistQuery,
    loading: loading,
    error: error,
  } = useQuery<GetUserMovieWatchlistByMovieIdQuery>(GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID, {
    variables: {
      movie_id: movieId,
      user_id: user?.id,
    },
    skip: !user || !movieId,
  });
  const isWatchlisted = watchlistQuery?.user_movie_watchlistCollection?.edges[0]
    ?.node
    ? true
    : false;

  const [insertWatchlistMutation] =
    useMutation<InsertUserMovieWatchlistMutation>(INSERT_WATCHLIST_MUTATION, {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID,
          variables: {
            movie_id: movieId,
            user_id: user?.id,
          },
          data: {
            user_movie_watchlistCollection: {
              edges: [
                {
                  node: data?.insertIntouser_movie_watchlistCollection
                    ?.records[0],
                },
              ],
            },
          },
        });
      },
      refetchQueries: [
        {
          query: GET_USER_MOVIE_WATCHLIST_BY_USER_ID,
          variables: {
            user_id: user?.id,
            locale: locale,
          },
        },
      ],
    });

  const [deleteActivityMutation] =
    useMutation<DeleteUserMovieWatchlistMutation>(DELETE_WATCHLIST_MUTATION, {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID,
          variables: {
            movie_id: movieId,
            user_id: user?.id,
          },
          data: {
            user_movie_watchlistCollection: {
              edges: [],
            },
          },
        });
      },
      refetchQueries: [
        {
          query: GET_USER_MOVIE_WATCHLIST_BY_USER_ID,
          variables: {
            user_id: user?.id,
            locale: locale,
          },
        },
      ],
    });

  const handleWatchlist = async () => {
    try {
      if (!user || !movieId) throw Error("User or movieId doesn't exist");
      await insertWatchlistMutation({
        variables: {
          movie_id: movieId,
          user_id: user?.id,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleUnwatchlist = async () => {
    try {
      if (!user || !movieId) throw Error("User or movieId doesn't exist");
      await deleteActivityMutation({
        variables: {
          movie_id: movieId,
          user_id: user?.id,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={(loading || error) && true}
              size="icon"
              variant={'action'}
              className={`rounded-full`}
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
                <AlertCircle />
              ) : (
                <Bookmark />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Connectez-vous</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={isWatchlisted ? handleUnwatchlist : handleWatchlist}
            disabled={(loading || error) && true}
            size="icon"
            variant={'action'}
            className={`rounded-full`}
          >
            {loading ? (
              <Icons.spinner className="animate-spin" />
            ) : error ? (
              <AlertCircle />
            ) : (
              <Bookmark className={`${isWatchlisted && 'fill-foreground'}`} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {activity ? (
            isWatchlisted ? (
              <p>Supprimer des films à revoir</p>
            ) : (
              <p>Envie de le revoir</p>
            )
          ) : isWatchlisted ? (
            <p>Supprimer des films à voir</p>
          ) : (
            <p>Envie de le voir</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
