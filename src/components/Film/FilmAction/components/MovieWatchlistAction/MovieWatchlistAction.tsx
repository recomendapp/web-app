import { AlertCircle, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '../../../../icons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext/auth-context';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/lib/supabase/supabase';

import DELETE_WATCHLIST_MUTATION from '@/components/Film/FilmAction/components/MovieWatchlistAction/mutations/deleteWatchlistMutation'
import INSERT_WATCHLIST_MUTATION from '@/components/Film/FilmAction/components/MovieWatchlistAction/mutations/insertWatchlistMutation'


interface MovieWatchlistActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: number;
  // filmAction: FilmAction;
  // loading: boolean;
  // error: ApolloError | undefined;
}

export function MovieWatchlistAction({
  filmId,
  // filmAction,
  // loading,
  // error,
}: MovieWatchlistActionProps) {

  const { user } = useAuth();

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useQuery({
    queryKey: ['user', user?.id, 'film', filmId, 'activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_movie_activity')
        .select(`*, review(*)`)
        .eq('film_id', filmId)
        .eq('user_id', user?.id)
        .maybeSingle()
      return (data)
    },
    enabled: user?.id !== undefined && user?.id !== null,
  });

  const {
    data: isWatchlisted,
    isLoading: loading,
    isError: error
  } = useQuery({
    queryKey: ['user', user?.id, 'film', filmId, 'watchlist'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_movie_watchlist')
        .select('*')
        .eq('film_id', filmId)
        .eq('user_id', user?.id)
        .maybeSingle()
      return (data)
    },
    enabled: user?.id !== undefined && user?.id !== null,
  });

  const {
    mutateAsync: deleteWatchlistMutation,
  } = useMutation(DELETE_WATCHLIST_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'watchlist'], data)
    }
  })

  const {
    mutateAsync: insertWatchlistMutation,
  } = useMutation(INSERT_WATCHLIST_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'watchlist'], data)
    }
  })

  // const [ insertFilmWatchlistMutation, { error: errorInsertFilmWatchlist } ] = useMutation(INSERT_FILM_WATCHLIST_MUTATION, {
  //   update: (store, { data }) => {
  //     const filmActionData = store.readQuery<FilmAction>({
  //       query: FILM_ACTION_QUERY,
  //       variables: {
  //         film_id: filmId,
  //         user_id: user?.id,
  //       },
  //     })
  //     store.writeQuery({
  //       query: FILM_ACTION_QUERY,
  //       variables: {
  //         film_id: filmId,
  //         user_id: user?.id,
  //       },
  //       data: {
  //         ...filmActionData,
  //         watchlist: {
  //           edges: {
  //             ...data.insertIntofilm_watchlistCollection.records
  //           }
  //         }
  //       }
  //     })
  //   },
  // });
  // const [ deleteFilmWatchlistMutation, { error: errorDeleteFilmWatchlist } ] = useMutation(DELETE_FILM_WATCHLIST_MUTATION, {
  //   update: (store, { data }) => {
  //     const filmActionData = store.readQuery<FilmAction>({
  //       query: FILM_ACTION_QUERY,
  //       variables: {
  //         film_id: filmId,
  //         user_id: user?.id,
  //       },
  //     })
  //     store.writeQuery({
  //       query: FILM_ACTION_QUERY,
  //       variables: {
  //         film_id: filmId,
  //         user_id: user?.id,
  //       },
  //       data: {
  //         ...filmActionData,
  //         watchlist: {
  //           edges: []
  //         }
  //       }
  //     })
  //   },
  // });
  
  const handleWatchlist = async () => {
    try {
      user?.id && await insertWatchlistMutation({
        film_id: filmId,
        user_id: user?.id
      })
    } catch (errors) {
      toast.error('Une erreur s\'est produite');
    }
  }
  const handleUnwatchlist = async () => {
    try {
      user?.id && await deleteWatchlistMutation({
        film_id: filmId,
        user_id: user?.id
      })
    } catch (errors) {
      toast.error('Une erreur s\'est produite');
    }
  }

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
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              isWatchlisted ?
                handleUnwatchlist()
              :
                handleWatchlist();
            }}
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
              <Bookmark className={`${isWatchlisted && 'fill-foreground'}`}/>
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
        ) : (
          isWatchlisted ? (
            <p>Supprimer des films à voir</p>
          ) : (
            <p>Envie de le voir</p>
          )
        )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}