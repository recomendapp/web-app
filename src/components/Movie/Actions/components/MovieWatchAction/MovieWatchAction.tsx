import { AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '../../../../icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

// GRAPHQL
import { useQuery, useMutation } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
import GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByMovieId';
import INSERT_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/InsertUserMovieActivity';
import DELETE_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/DeleteUserMovieActivity';
import type {
  DeleteUserMovieActivityMutation,
  GetUserMovieActivityByMovieIdQuery,
  InsertUserMovieActivityMutation,
} from '@/graphql/__generated__/graphql';

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
}

export function MovieWatchAction({ movieId }: MovieWatchActionProps) {
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
  const [deleteActivityMutation] = useMutation<DeleteUserMovieActivityMutation>(
    DELETE_ACTIVITY_MUTATION,
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
              edges: [],
            },
          },
        });
      },
    }
  );
  const handleWatch = async () => {
    try {
      if (!user || !movieId) throw Error("User or movieId doesn't exist");
      await insertActivityMutation({
        variables: {
          movie_id: movieId,
          user_id: user?.id,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleUnwatch = async () => {
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
              className={`rounded-full hover:text-foreground`}
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
                <AlertCircle />
              ) : (
                <div
                  className={`transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[2px]`}
                >
                  <Check size={16} />
                </div>
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
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {!activity ? (
              <Button
                onClick={() => !activity && handleWatch()}
                disabled={(loading || error) && true}
                size="icon"
                variant={'action'}
                className={`rounded-full hover:text-foreground`}
              >
                {loading ? (
                  <Icons.spinner className="animate-spin" />
                ) : error ? (
                  <AlertCircle />
                ) : (
                  <div
                    className={`
                        transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[2px]
                        ${activity && 'bg-blue-500 border-blue-500'}
                      `}
                  >
                    <Check size={16} />
                  </div>
                )}
              </Button>
            ) : (
              <AlertDialogTrigger disabled={!activity}>
                <Button
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
                    <div
                      className={`
                        border-2 hover:border-blue-500 rounded-full p-[2px]
                        ${activity && 'bg-blue-500 border-blue-500'}
                      `}
                    >
                      <Check size={16} />
                    </div>
                  )}
                </Button>
              </AlertDialogTrigger>
            )}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {activity ? <p>Retirer des films vus</p> : <p>Marquer comme vu</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Oula, tu es sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Voulez-vous supprimer toutes vos actions effectuées sur cette oeuvre
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => activity && handleUnwatch()}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
