import { AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
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
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

// GRAPHQL
// import { useQuery, useMutation } from '@apollo/client';
// import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
// import GET_USER_MOVIE_WATCHLIST_BY_MOVIE_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByMovieId';
// import INSERT_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/InsertUserMovieActivity';
// import DELETE_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/DeleteUserMovieActivity';
// import type {
//   DeleteUserMovieActivityMutation,
//   GetUserMovieActivityByMovieIdQuery,
//   InsertUserMovieActivityMutation,
// } from '@/graphql/__generated__/graphql';

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchAction({ movieId }: MovieWatchActionProps) {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.id, 'activity', { movieId }],
    queryFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or locale or movie id');
      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`*, review:user_movie_review(*)`)
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
        .maybeSingle()
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!movieId,
  });

  const { mutateAsync: insertActivityMutation } = useMutation({
    mutationFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
      const {data, error } = await supabase
        .from('user_movie_activity')
        .insert({
          user_id: user?.id,
          movie_id: movieId,
        })
        .select(`*, review:user_movie_review(*)`)
        .single()
        if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId }], data)

      // UPDATE WATCHLIST
      queryClient.setQueryData(['user', user?.id, 'watchlist', { movieId }], false)
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'watchlist']
      });
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'guidelist']
      });
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  const { mutateAsync: deleteActivityMutation } = useMutation({
    mutationFn: async () => {
      if (!activity?.id) throw Error('Missing activity id');
      const { error } = await supabase
        .from('user_movie_activity')
        .delete()
        .eq('id', activity?.id)
      if (error) throw error;
      return null;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId }], data)
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  if (user === null) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={'action'}
            className={`rounded-full hover:text-foreground`}
            asChild
          >
            <Link href={'/login'}>
              <div
                className={`transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[2px]`}
              >
                <Check size={16} />
              </div>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Connectez-vous</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          {!activity ? (
            <Button
              onClick={async () => !activity && await insertActivityMutation()}
              disabled={isLoading || isError || activity === undefined}
              size="icon"
              variant={'action'}
              className={`rounded-full hover:text-foreground`}
            >
              {(isLoading || activity === undefined) ? (
                <Icons.spinner className="animate-spin" />
              ) : isError ? (
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
                disabled={(isLoading || isError) && true}
                size="icon"
                variant={'action'}
                className={`rounded-full`}
              >
                {(isLoading || activity == undefined) ? (
                  <Icons.spinner className="animate-spin" />
                ) : isError ? (
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
            onClick={async () => activity && await deleteActivityMutation()}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
