import { AlertCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
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

import { useAuth } from '@/context/auth-context';
import { DialogClose } from '@radix-ui/react-dialog';

import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

interface MovieRatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieRatingAction({ movieId }: MovieRatingActionProps) {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [ratingValue, setRatingValue] = useState(5);

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

  const { mutateAsync: insertActivityMutation, isPending: isInsertPending } = useMutation({
    mutationFn: async ({ rating } : { rating: number }) => {
      if (!user?.id || !movieId) throw Error('Missing profile id or movie id');
      const {data, error } = await supabase
        .from('user_movie_activity')
        .insert({
          user_id: user?.id,
          movie_id: movieId,
          rating: rating,
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
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  const { mutateAsync: updateRating, isPending: isUpdatePending } = useMutation({
    mutationFn: async ({ rating } : { rating: number | null }) => {
      if (!activity?.id ) throw Error('Missing activity id');
      if (rating === undefined ) throw Error('Missing rating');
      const { data, error } = await supabase
        .from('user_movie_activity')
        .update({
            rating: rating,
        })
        .eq('id', activity?.id)
        .select(`*, review:user_movie_review(*)`)
        .single()
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId }], data)
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  useEffect(() => {
    activity?.rating && setRatingValue(activity?.rating);
  }, [activity]);

  const handleRate = async () => {
    if (activity) {
      await updateRating({
        rating: ratingValue,
      });
    } else {
      await insertActivityMutation({
        rating: ratingValue,
      });
    }
  };
  const handleUnrate = async () => {
    if (activity?.review)
      return toast.error('Impossible car vous avez une critique sur ce film');
    await updateRating({
     rating: null,
    });
  };

  if (user === null) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'rating'}
            asChild
          >
            <Link href={'/auth/login'}>
              <Star />
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
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              disabled={isLoading || isError || activity === undefined || isInsertPending || isUpdatePending}
              variant={activity?.rating ? 'rating-enabled' : 'rating'}
            >
              {(isLoading || activity === undefined) ? (
                <Icons.spinner className="animate-spin" />
              ) : isError ? (
                <AlertCircle />
              ) : activity?.rating ? (
                <p className="font-bold text-lg">{activity?.rating}</p>
              ) : (
                <Star />
              )}
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {activity?.rating ? (
            <p>Modifier la note</p>
          ) : (
            <p>Ajouter une note</p>
          )}
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader className="relative">
          <div className="absolute w-full flex justify-center -top-16">
            <p className="absolute top-6 text-2xl text-accent-1-foreground font-bold">
              {ratingValue}
            </p>
            <Star size={80} className="text-accent-1 fill-accent-1" />
          </div>
          <DialogTitle className="text-center pt-4">NOTER</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            <MovieRating rating={ratingValue} setRating={setRatingValue} />
          </div>
        </div>
        <DialogFooter className="flex flex-col justify-center">
          <DialogClose asChild>
            <Button onClick={async () => handleRate()}>Enregistrer</Button>
          </DialogClose>
          {activity?.rating && (
            <DialogClose asChild>
              <Button variant="destructive" onClick={async () => handleUnrate()}>
                Supprimer la note
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MovieRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [tmpRating, setTmpRating] = useState(rating);

  const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleMouseEnter = (i: number) => {
    setHover(i);
    setTmpRating((prev) => {
      if (prev === rating) {
        return rating;
      } else {
        return prev;
      }
    });
    setRating(i);
  };

  const handleMouseLeave = () => {
    setHover(null);
    setRating(tmpRating);
  };

  return (
    <div className="flex w-full justify-center">
      {stars.map((i) => {
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={rating}
              onClick={() => {
                setRating(i);
                setTmpRating(i);
              }}
            />
            <Star
              aria-hidden="true"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              className={`
                            text-accent-1
                            ${i <= (hover || rating) && 'fill-accent-1'}
                          `}
            />
          </label>
        );
      })}
    </div>
  );
}
