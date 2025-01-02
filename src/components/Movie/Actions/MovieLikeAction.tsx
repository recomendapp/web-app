import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

// COMPONENTS
import { Button } from '@/components/ui/button';

// ICONS
import { AlertCircle, Heart } from 'lucide-react';
import { Icons } from '../../../config/icons';
import Link from 'next/link';
import {  useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useUserMovieActivity } from '@/features/user/userQueries';
import { useUserMovieActivityInsert, useUserMovieActivityUpdate } from '@/features/user/userMutations';
import { userKeys } from '@/features/user/userKeys';

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieLikeAction({ movieId }: MovieLikeActionProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const queryClient = useQueryClient();

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

  const handleLike = async () => {
    if (activity) {
      await updateActivity.mutateAsync({
        activityId: activity.id,
        isLiked: true,
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [userKeys.collectionLikes(user?.id as string)]
          });
        },
        onError: () => {
          toast.error('Une erreur s\'est produite');
        }
      });
    } else {
      await insertActivity.mutateAsync({
        userId: user?.id,
        movieId: movieId,
        isLiked: true,
      }, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [userKeys.collectionLikes(user?.id as string)]
          });
        },
        onError: () => {
          toast.error('Une erreur s\'est produite');
        }
      });
    }
  };

  const handleUnlike = async () => {
    if (!activity) return;
    await updateActivity.mutateAsync({
      activityId: activity.id,
      isLiked: false,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [userKeys.collectionLikes(user?.id as string)]
        });
      },
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    });
  };

  if (user === null) {
    return (
      <TooltipBox tooltip={'Connectez-vous'}>
        <Button
          size="icon"
          variant={'action'}
          className="rounded-full"
          asChild
        >
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <Heart className={`transition hover:text-accent-pink`} />
          </Link>
        </Button>
      </TooltipBox>
    );
  }

return (
    <TooltipBox tooltip={activity?.is_liked ? 'Retirer des coups de coeur' : 'Ajouter aux coups de coeur'}>
      <Button
        onClick={() => {
          activity?.is_liked ? handleUnlike() : handleLike();
        }}
        disabled={isLoading || isError || activity === undefined || insertActivity.isPending || updateActivity.isPending}
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
    </TooltipBox>
  );
}
