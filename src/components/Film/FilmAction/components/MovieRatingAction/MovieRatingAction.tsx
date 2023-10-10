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
import { ApolloError, useMutation } from '@apollo/client';
import { useAuth } from '@/context/AuthContext/AuthProvider';

import FILM_ACTION_QUERY from '@/components/Film/FilmAction/queries/filmActionQuery';
import INSERT_FILM_ACTION_MUTATION from '@/components/Film/FilmAction/mutations/insertFilmActionMutation';
import UPDATE_FILM_ACTION_MUTATION from '@/components/Film/FilmAction/mutations/updateFilmActionMutation';
import { toast } from 'react-toastify';
import { DialogClose } from '@radix-ui/react-dialog';

interface MovieRatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: string;
  filmAction: FilmAction;
  loading: boolean;
  error: ApolloError | undefined;
}

export function MovieRatingAction({
  filmId,
  filmAction,
  loading,
  error,
}: MovieRatingActionProps) {

  const { user, loading: userLoading } = useAuth();

  const router = useRouter();

  const [ratingValue, setRatingValue] = useState<number>(filmAction?.rating);

  // useEffect(() => {
  //   setRatingValue(filmAction.rating)
  // }, [filmAction.rating])

  const [ updateFilmActionMutation ] = useMutation(UPDATE_FILM_ACTION_MUTATION);
  const [ insertFilmActionMutation, { error: errorAddingFilmAction} ] = useMutation(INSERT_FILM_ACTION_MUTATION, {
    update: (store, { data }) => {
      const filmActionData = store.readQuery<{ film_actionCollection: { edges: [{ action: FilmAction}]}}>({
        query: FILM_ACTION_QUERY,
        variables: {
          film_id: filmId,
          user_id: user?.id,
        },
      })
      store.writeQuery({
        query: FILM_ACTION_QUERY,
        variables: {
          film_id: filmId,
          user_id: user?.id,
        },
        data: {
          film_actionCollection: {
            edges: [
              ...filmActionData!.film_actionCollection.edges,
              { action: data.insertIntofilm_actionCollection.records[0] }
            ]
          }
        }
      })
    },
  });

  const handleRate = async () => {
    try {
      const mutationToUse = filmAction ? updateFilmActionMutation : insertFilmActionMutation;
      const { errors } = await mutationToUse({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_watched: true,
          rating: ratingValue,
          is_watchlisted: false,
        }
      });
      if (errors) throw error;
    } catch {
      toast.error('Une erreur s\'est produite');
    }
  }
  const handleUnrate = async () => {
    try {
      const { errors } = await updateFilmActionMutation({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          rating: null,
        }
      });
      if (errors) throw error;
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
                  variant={filmAction?.rating ? 'rating-enabled' : 'rating'}
                >
                  {loading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : error ? (
                    <AlertCircle />
                  ) : filmAction?.rating ? (
                    <p className='font-bold text-lg'>
                      {filmAction?.rating}
                    </p>
                  ) : (
                    <Star />
                  )}
                </Button>
              </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {filmAction?.rating ? <p>Modifier la note</p> : <p>Ajouter une note</p>}
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
          {filmAction?.rating && (
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