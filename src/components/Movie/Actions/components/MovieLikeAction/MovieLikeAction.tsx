import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

// COMPONENTS
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// ICONS
import { AlertCircle, Heart } from 'lucide-react';
import { Icons } from '../../../../icons';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieLikeAction({ movieId }: MovieLikeActionProps) {

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
    mutationFn: async ({ is_liked } : { is_liked: boolean }) => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
      const {data, error } = await supabase
        .from('user_movie_activity')
        .insert({
          user_id: user?.id,
          movie_id: movieId,
          is_liked: is_liked,
        })
        .select(`*, review:user_movie_review(*)`)
        .single()
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId }], data);

      // UPDATE WATCHLIST
      queryClient.setQueryData(['user', user?.id, 'watchlist', { movieId }], false);
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'watchlist']
      });
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'guidelist']
      });
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'likes']
      });
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  const { mutateAsync: updateActivityMutation } = useMutation({
    mutationFn: async ({ is_liked } : { is_liked: boolean }) => {
      if (!activity?.id) throw Error('Missing profile id or movie id');
      const {data, error } = await supabase
        .from('user_movie_activity')
        .update({
            is_liked: is_liked,
        })
        .eq('id', activity?.id)
        .select(`*, review:user_movie_review(*)`)
        .single()
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId }], data);
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id, 'collection', 'likes']
      });
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  const handleLike = async () => {
    if (activity) {
      await updateActivityMutation({
        is_liked: true,
      });
    } else {
      await insertActivityMutation({
        is_liked: true,
      });
    }
  };

  const handleUnlike = async () => {
    await updateActivityMutation({
     is_liked: false,
    });
  };

  if (user === null) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={'action'}
            className="rounded-full"
            asChild
          >
            <Link href={'/auth/login'}>
              <Heart className={`transition hover:text-accent-pink`} />
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            activity?.is_liked ? handleUnlike() : handleLike();
          }}
          disabled={isLoading || isError || activity === undefined}
          size="icon"
          variant={'action'}
          className="rounded-full"
        >
          {(isLoading || activity === undefined) ? (
            <Icons.spinner className="animate-spin" />
          ) : isError ? (
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
  );
}
