import { AlertCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Icons } from '../../../../icons';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { FilmAction } from '@/types/type.film';
import { useAuth } from '@/context/AuthContext/auth-context';
// import UPDATE_FILM_RATING_MUTATION from '@/components/Movie/FilmAction/components/MovieRatingAction/mutations/updateFilmRatingMutation';
import { DialogClose } from '@radix-ui/react-dialog';

import toast from 'react-hot-toast';

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

interface MovieRatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
}

export function MovieRatingAction({ movieId }: MovieRatingActionProps) {
  const { user, loading: userLoading } = useAuth();

  const router = useRouter();
  const [ratingValue, setRatingValue] = useState(5);

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

  useEffect(() => {
    activity?.rating && setRatingValue(activity?.rating);
  }, [activity]);

  const handleRate = async () => {
    try {
      if (!user || !movieId) throw Error("User or movieId doesn't exist");
      if (activity) {
        if (!activity.id) throw Error("Activity id doesn't exist");
        await updateActivityMutation({
          variables: {
            id: activity.id,
            movie_id: movieId,
            user_id: user?.id,
            rating: ratingValue,
          },
        });
      } else {
        await insertActivityMutation({
          variables: {
            movie_id: movieId,
            user_id: user?.id,
            rating: ratingValue,
          },
        });
      }
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleUnrate = async () => {
    if (activity?.review)
      return toast.error('Impossible car vous avez une critique sur ce film');
    if (!user || !movieId || !activity?.id) throw Error("User or movieId doesn't exist");
    try {
      await updateActivityMutation({
        variables: {
          id: activity.id,
          movie_id: movieId,
          user_id: user?.id,
          rating: null,
        },
      });
    } catch {
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
              size="rating"
              variant={'rating'}
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
                <AlertCircle />
              ) : (
                <Star />
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
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* {userId ? ( */}
            <DialogTrigger asChild>
              <Button
                disabled={(loading || error) && true}
                size="rating"
                variant={activity?.rating ? 'rating-enabled' : 'rating'}
              >
                {loading ? (
                  <Icons.spinner className="animate-spin" />
                ) : error ? (
                  <AlertCircle />
                ) : activity?.rating ? (
                  <p className="font-bold text-lg">{activity?.rating}</p>
                ) : (
                  <Star />
                )}
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {activity?.rating ? (
              <p>Modifier la note</p>
            ) : (
              <p>Ajouter une note</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader className="relative">
          <div className="absolute w-full flex justify-center -top-16">
            <p className="absolute top-6 text-2xl text-accent-1-foreground font-bold">
              {ratingValue}
            </p>
            <Star size={80} className="text-accent-1 fill-accent-1" />
          </div>
          <DialogTitle className="text-center pt-4">NOTER</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            <MovieRating rating={ratingValue} setRating={setRatingValue} />
          </div>
        </div>
        <DialogFooter className="flex flex-col justify-center">
          <DialogClose asChild>
            <Button onClick={() => handleRate()}>Enregistrer</Button>
          </DialogClose>
          {activity?.rating && (
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => handleUnrate()}>
                Supprimer la note
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MovieRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}) {
  const [hover, setHover] = useState<number | null>(null);

  const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex w-full justify-center">
      {stars.map((i) => {
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={rating}
              onClick={() => {
                setRating(i);
              }}
            />
            <Star
              // color={i <= ( hover || rating) ? stars.filledColor : stars.unfilledColor }
              aria-hidden="true"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={`
                            text-accent-1
                            ${i <= (hover || rating) && 'fill-accent-1'}
                          `}
            />
          </label>
        );
      })}
    </div>
  );
}
