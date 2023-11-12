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
import { useAuth } from '@/context/AuthContext/AuthProvider';
import UPDATE_FILM_RATING_MUTATION from '@/components/Film/FilmAction/components/MovieRatingAction/mutations/updateFilmRatingMutation';
import { toast } from 'react-toastify';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import INSERT_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/insertMovieActivityMutation'
import UPDATE_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/updateMovieActivityMutation'
import { supabase } from '@/lib/supabase/supabase';
import movieActivityQuery from '../../queries/movieActivityQuery';

interface MovieRatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: string;
  // filmAction: FilmAction;
  // loading: boolean;
  // error: ApolloError | undefined;
}

export function MovieRatingAction({
  filmId,
  // filmAction,
  // loading,
  // error,
}: MovieRatingActionProps) {

  const { user, loading: userLoading } = useAuth();

  const router = useRouter();
  const [ratingValue, setRatingValue] = useState(5);

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
        .maybeSingle()
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
  

  useEffect(() => {
    activity?.rating && setRatingValue(activity?.rating)
  }, [activity])

  const handleRate = async () => {
    try {
      if (activity) {
        user?.id && await updateActivityMutation({
          film_id: filmId,
          user_id: user?.id,
          data: {
            rating: ratingValue
          },
        })
      } else {
        user?.id && await insertActivityMutation({
          queryClient: queryClient,
          film_id: filmId,
          user_id: user?.id,
          rating: ratingValue
        })
      }
    } catch {
      toast.error('Une erreur s\'est produite');
    }
  }
  const handleUnrate = async () => {
    if (activity.review) {
      toast.error('Impossible car vous avez une critique sur ce film');
      return ;
    }
    try {
      user?.id && await updateActivityMutation({
        film_id: filmId,
        user_id: user?.id,
        data: {
          rating: null
        },
      })
    } catch {
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
                  disabled={(loading || error ) && true}
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
    )
  }

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* {userId ? ( */}
              <DialogTrigger asChild>
                <Button
                  disabled={(loading || error ) && true}
                  size="rating"
                  variant={activity?.rating ? 'rating-enabled' : 'rating'}
                >
                  {loading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : error ? (
                    <AlertCircle />
                  ) : activity?.rating ? (
                    <p className='font-bold text-lg'>
                      {activity?.rating}
                    </p>
                  ) : (
                    <Star />
                  )}
                </Button>
              </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {activity?.rating ? <p>Modifier la note</p> : <p>Ajouter une note</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader className='relative'>
          <div className='absolute w-full flex justify-center -top-16'>
            <p className='absolute top-6 text-2xl text-accent-1-foreground font-bold'>{ratingValue}</p>
            <Star size={80} className='text-accent-1 fill-accent-1'/>
          </div>
          <DialogTitle className='text-center pt-4'>NOTER</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            <MovieRating rating={ratingValue} setRating={setRatingValue}/>
          </div>
        </div>
        <DialogFooter className='flex flex-col justify-center'>
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

export default function MovieRating({ rating, setRating } : { rating: number, setRating: Dispatch<SetStateAction<number>> }) {

  const [hover, setHover] = useState<number | null>(null)

  const stars = [1,2,3,4,5,6,7,8,9,10];

  return (
      <div className='flex w-full justify-center'>
          {stars.map((i) => {
              return (
                  <label key={i}>
                      <input 
                          type="radio" 
                          name="rating" 
                          className='hidden' 
                          value={rating}
                          onClick={() => {
                            setRating(i)
                          }}
                      />
                      <Star 
                          // color={i <= ( hover || rating) ? stars.filledColor : stars.unfilledColor } 
                          aria-hidden="true"
                          onMouseEnter={() => setHover(i)}
                          onMouseLeave={() => setHover(null)}
                          className={`
                            text-accent-1
                            ${ i <= ( hover || rating) && 'fill-accent-1'}
                          `} 
                      />                        
                  </label>                    
              )
          })}

      </div>
  );
  
}