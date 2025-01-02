import { AlertCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Icons } from '../../../config/icons';
import { usePathname } from 'next/navigation';
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
import Link from 'next/link';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useUserMovieActivity } from '@/features/user/userQueries';
import { useUserMovieActivityInsert, useUserMovieActivityUpdate } from '@/features/user/userMutations';

interface MovieRatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieRatingAction({ movieId }: MovieRatingActionProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const [ratingValue, setRatingValue] = useState(5);

  const {
    data: activity,
    isLoading,
    isError,
  } = useUserMovieActivity({
    userId: user?.id,
    movieId: movieId,
  });

  const insertActivity = useUserMovieActivityInsert();
  const updateActivity = useUserMovieActivityUpdate();

  useEffect(() => {
    activity?.rating && setRatingValue(activity?.rating);
  }, [activity]);

  const handleRate = async () => {
    if (activity) {
      await updateActivity.mutateAsync({
        activityId: activity.id,
        rating: ratingValue,
      });
    } else {
      await insertActivity.mutateAsync({
        userId: user?.id,
        movieId: movieId,
        rating: ratingValue,
      });
    }
  };
  const handleUnrate = async () => {
    if (activity?.review)
      return toast.error('Impossible car vous avez une critique sur ce film');
    await updateActivity.mutateAsync({
      activityId: activity!.id,
      rating: null,
    });
  };

  if (user === null) {
    return (
      <TooltipBox tooltip={'Connectez-vous'}>
        <Button
          variant={'rating'}
          asChild
        >
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <Star />
          </Link>
        </Button>
      </TooltipBox>
    );
  }

  return (
    <Dialog>
      <TooltipBox tooltip={activity?.rating ? 'Modifier la note' : 'Ajouter une note'}>
        <DialogTrigger asChild>
          <Button
            disabled={isLoading || isError || activity === undefined || insertActivity.isPending || updateActivity.isPending}
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
      </TooltipBox>
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
