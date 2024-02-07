import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

// COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// ICONS
import { AlertCircle, Bookmark } from 'lucide-react';
import { Icons } from '../../../../icons';
import Link from 'next/link';

interface MovieWatchlistActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchlistAction({
  movieId
}
: MovieWatchlistActionProps) {

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: activity,
  } = useQuery({
    queryKey: ['user', user?.id, 'activity', { movieId }],
    queryFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
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

  const {
    data: isWatchlisted,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.id, 'watchlist', { movieId }],
    queryFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
      const { data, error } = await supabase
        .from('user_movie_watchlist')
        .select(`*`)
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
        .maybeSingle()
      if (error) throw error;
      return data ? true : false;
    },
    meta: {
      normalize: false,
    },
    enabled: !!user?.id && !!movieId,
  });

  const { mutateAsync: insertWatchlistMutation } = useMutation({
    mutationFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
      const { error } = await supabase
        .from('user_movie_watchlist')
        .insert({
          user_id: user.id,
          movie_id: movieId,
        })
      if (error) throw error;
      return true;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'watchlist', { movieId }], data);
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'watchlist']
      })
    },
    onError: (error) => {
      if ('code' in error && error.code === "23505") { // Duplicate key value violates unique constraint
        queryClient.setQueryData(['user', user?.id, 'watchlist', { movieId }], true)
      } else {
        toast.error('Une erreur s\'est produite');
      }
    },
  });

  const { mutateAsync: deleteWatchlistMutation } = useMutation({
    mutationFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
      const { error } = await supabase
        .from('user_movie_watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
      if (error) throw error;
      return false;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'watchlist', { movieId }], data);
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'watchlist']
      })
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  if (user === null) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={'action'}
              className={`rounded-full`}
              asChild
            >
              <Link href={'/login'}>
                <Bookmark />
              </Link>
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
            onClick={async () => isWatchlisted ? await deleteWatchlistMutation() : await insertWatchlistMutation()}
            disabled={isLoading || isError || activity === undefined}
            size="icon"
            variant={'action'}
            className={`rounded-full`}
          >
            {(isLoading || isWatchlisted === undefined)  ? (
              <Icons.spinner className="animate-spin" />
            ) : isError ? (
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
