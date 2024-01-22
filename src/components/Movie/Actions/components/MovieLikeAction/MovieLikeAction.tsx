import { AlertCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '../../../../icons';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext/auth-context';

// GRAPHQL
import { useQuery, useMutation } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
import GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByMovieId';
import INSERT_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/InsertUserMovieActivity';
import UPDATE_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/UpdateUserMovieActivity';
import type {
  GetUserMovieActivityByMovieIdQuery,
  InsertUserMovieActivityMutation,
  UpdateUserMovieActivityMutation,
} from '@/graphql/__generated__/graphql';

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
}

export function MovieLikeAction({ movieId }: MovieLikeActionProps) {
  const { user } = useAuth();

  const router = useRouter();

  const {
    data: activityQuery,
    loading,
    error,
  } = useQuery<GetUserMovieActivityByMovieIdQuery>(GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID, {
    variables: {
      movie_id: movieId,
      user_id: user?.id,
    },
    skip: !user || !movieId,
  });
  const activity = activityQuery?.user_movie_activityCollection?.edges[0]?.node;

  const [insertActivityMutation] = useMutation<InsertUserMovieActivityMutation>(
    INSERT_ACTIVITY_MUTATION,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID,
          variables: {
            movie_id: movieId,
            user_id: user?.id,
          },
          data: {
            user_movie_activityCollection: {
              edges: [
                {
                  node: data?.insertIntouser_movie_activityCollection
                    ?.records[0],
                },
              ],
            },
          },
        });
        // Delete Watchlist
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
    }
  );
  const [updateActivityMutation] = useMutation<UpdateUserMovieActivityMutation>(
    UPDATE_ACTIVITY_MUTATION,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID,
          variables: {
            movie_id: movieId,
            user_id: user?.id,
          },
          data: {
            user_movie_activityCollection: {
              edges: [
                {
                  node: data?.updateuser_movie_activityCollection?.records[0],
                },
              ],
            },
          },
        });
      },
    }
  );

  const handleLike = async () => {
    try {
      if (!user || !movieId) throw Error("User or movieId doesn't exist");
      if (activity) {
        if (!activity.id) throw Error("Activity id doesn't exist");
        await updateActivityMutation({
          variables: {
            id: activity.id,
            movie_id: movieId,
            user_id: user?.id,
            is_liked: true,
          },
        });
      } else {
        await insertActivityMutation({
          variables: {
            movie_id: movieId,
            user_id: user?.id,
            is_liked: true,
          },
        });
      }
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleUnlike = async () => {
    try {
      if (!user || !movieId || !activity?.id) throw Error("User or movieId doesn't exist");
      await updateActivityMutation({
        variables: {
          id: activity.id,
          movie_id: movieId,
          user_id: user?.id,
          is_liked: false,
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
              className="rounded-full"
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
                <AlertCircle />
              ) : (
                <Heart className={`transition hover:text-accent-pink`} />
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
            onClick={() => {
              activity?.is_liked ? handleUnlike() : handleLike();
            }}
            disabled={(loading || error) && true}
            size="icon"
            variant={'action'}
            className="rounded-full"
          >
            {loading ? (
              <Icons.spinner className="animate-spin" />
            ) : error ? (
              <AlertCircle />
            ) : (
              <Heart
                className={`
                  transition hover:text-accent-pink
                  ${activity?.is_liked && 'text-accent-pink fill-accent-pink'}
                `}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {activity?.is_liked ? (
            <p>Retirer des coups de coeur</p>
          ) : (
            <p>Ajouter aux coups de coeur</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
