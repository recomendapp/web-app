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
import { FilmAction } from '@/types/type.film';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/lib/supabase/supabase';

import INSERT_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/insertMovieActivityMutation'
import UPDATE_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/updateMovieActivityMutation'

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: string;
}

export function MovieLikeAction({
  filmId,
}: MovieLikeActionProps) {

  const { user } = useAuth();

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: activity,
    isLoading: loading,
    isError: error
  } = useQuery({
    queryKey: ['user', user?.id, 'film', filmId, 'activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_movie_activity')
        .select(`*, review(*)`)
        .eq('film_id', filmId)
        .eq('user_id', user?.id)
        .single()
      return (data)
    },
    enabled: user?.id !== undefined && user?.id !== null,
  });

  const {
    mutateAsync: insertActivityMutation,
  } = useMutation(INSERT_ACTIVITY_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'activity'], data)
    }
  })

  const {
    mutateAsync: updateActivityMutation,
  } = useMutation(UPDATE_ACTIVITY_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'activity'], data)
    }
  })

  const handleLike = async () => {
    try {
      if (activity) {
        user?.id && await updateActivityMutation({
          film_id: filmId,
          user_id: user?.id,
          data: {
            is_liked: true
          },
        })
      } else {
        user?.id && await insertActivityMutation({
          queryClient: queryClient,
          film_id: filmId,
          user_id: user?.id,
          is_liked: true,
        })
      }
    } catch (errors) {
      toast.error('Une erreur s\'est produite');
    }
  }

  const handleUnlike = async () => {
    try {
      user?.id && await updateActivityMutation({
        film_id: filmId,
        user_id: user?.id,
        data: {
          is_liked: false
        },
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
              className="rounded-full"
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
                <AlertCircle />
              ) : (
                <Heart
                  className={`transition hover:text-like`}
                />
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
              activity?.is_liked ?
                handleUnlike()
              :
                handleLike()
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
                  transition hover:text-like
                  ${activity?.is_liked && 'text-like fill-like'}
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