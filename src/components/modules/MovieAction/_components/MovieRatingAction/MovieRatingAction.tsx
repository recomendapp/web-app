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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useQuery, useQueryClient } from 'react-query';
import { handleGetRating, handleRate, handleUnrate } from '@/components/modules/MovieAction/_components/MovieRatingAction/queries/movie-action-rating';
import { useUser } from '@/context/UserProvider';

interface MovieRatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: any;
}

export function MovieRatingAction({
  movieId,
}: MovieRatingActionProps) {

  const { user } = useUser();

  const queryClient = useQueryClient();

  const [ratingValue, setRatingValue] = useState<number>(0);

  const {
    data: isRated,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', movieId, 'rating'],
    queryFn: () => handleGetRating(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });

  useEffect(() => {
    setRatingValue(isRated?.rating)
  }, [isRated])

  const router = useRouter();

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
                <Button
                  onClick={() => router.push('/login')}
                  disabled={(isLoading || isError ) && true}
                  size="rating"
                  variant={'rating'}
                >
                  {isLoading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : isError ? (
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
                  disabled={(isLoading || isError ) && true}
                  size="rating"
                  variant={isRated?.state ? 'rating-enabled' : 'rating'}
                >
                  {isLoading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : isError ? (
                    <AlertCircle />
                  ) : isRated?.state ? (
                    <p className='font-bold text-lg'>
                      {isRated.rating}
                    </p>
                  ) : (
                    <Star />
                  )}
                </Button>
              </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isRated?.state ? <p>Modifier la note</p> : <p>Ajouter une note</p>}
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
          {/* <DialogDescription>
              {movie}
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            <MovieRating rating={ratingValue} setRating={setRatingValue}/>
          </div>
        </div>
        <DialogFooter className='flex flex-col justify-center'>
          <DialogClose asChild>
            <Button onClick={() => handleRate(user.$id, isRated ? isRated : null, movieId, queryClient, ratingValue)}>Enregistrer</Button>
          </DialogClose>
          {isRated && isRated.id && (
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => handleUnrate(isRated, movieId, queryClient)}>
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