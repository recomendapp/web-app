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
import { FilmAction } from '@/types/type.film';
// import { ApolloError, useMutation } from '@apollo/client';
import { useAuth } from '@/context/AuthContext/auth-context';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/lib/supabase/client';

import DELETE_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/deleteMovieActivtyMutation'
import INSERT_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/insertMovieActivityMutation'

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: number;
}

export function MovieWatchAction({
  filmId,
}: MovieWatchActionProps) {

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
      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`*, review:user_movie_review(*)`)
        .eq('film_id', filmId)
        .eq('user_id', user!.id)
        .maybeSingle()
      if (error) throw error;
      return (data)
    },
    enabled: !!user,
  });

  const {
    mutateAsync: deleteActivityMutation,
  } = useMutation(DELETE_ACTIVITY_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'activity'], data)
    }
  })

  const {
    mutateAsync: insertActivityMutation,
  } = useMutation(INSERT_ACTIVITY_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'activity'], data)
    }
  })


  const handleWatch = async () => {
    try {
      user?.id && await insertActivityMutation({
        queryClient: queryClient,
        film_id: filmId,
        user_id: user?.id
      })
    } catch (errors) {
      toast.error('Une erreur s\'est produite');
    }
  }
  const handleUnwatch = async () => {
    try {
      user?.id && await deleteActivityMutation({
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
    )
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
        <AlertDialogFooter className='gap-2'>
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