import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

// ICONS
import { AlertCircle } from 'lucide-react';
import { Icons } from '@/config/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useUserMovieActivity, useUserMovieWatchlist } from '@/features/user/userQueries';
import { useUserMovieWatchlistDelete, useUserMovieWatchlistInsert } from '@/features/user/userMutations';
import { ContextMenuMovieWatchlistAction } from '@/components/context-menu/ContextMenuMovieWatchlistAction';

interface MovieWatchlistActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchlistAction({
  movieId
}
: MovieWatchlistActionProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const {
    data: activity,
  } = useUserMovieActivity({
    userId: user?.id,
    movieId: movieId,
  });

  const {
    data: watchlist,
    isLoading,
    isError,
  } = useUserMovieWatchlist({
    userId: user?.id,
    movieId: movieId,
  });
  const insertWatchlist = useUserMovieWatchlistInsert();
  const deleteWatchlist = useUserMovieWatchlistDelete();

  const handleWatchlist = async () => {
    if (watchlist) return;
    await insertWatchlist.mutateAsync({
      userId: user?.id,
      movieId: movieId,
    }, {
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    });
  }

  const handleUnwatchlist = async () => {
    if (!watchlist) return;
    await deleteWatchlist.mutateAsync({
      watchlistId: watchlist.id,
    }, {
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    });
  }

  if (user === null) {
    return (
      <TooltipBox tooltip={'Connectez-vous'}>
        <Button
          size="icon"
          variant={'action'}
          className={`rounded-full`}
          asChild
        >
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <Icons.watchlist />
          </Link>
        </Button>
      </TooltipBox>
    );
  }

  return (
    <ContextMenuMovieWatchlistAction watchlistItem={watchlist}>
      <TooltipBox tooltip={
        activity ? (
          watchlist ? (
            'Supprimer des films à revoir'
          ) : (
            'Envie de le revoir'
          )
        ) : watchlist ? (
          'Supprimer des films à voir'
        ) : (
          'Envie de le voir'
        )
      }>
        <Button
          onClick={async () => watchlist ? await handleUnwatchlist() : await handleWatchlist()}
          disabled={isLoading || isError || activity === undefined || watchlist === undefined || insertWatchlist.isPending || deleteWatchlist.isPending}
          size="icon"
          variant={'action'}
          className={`rounded-full`}
        >
          {(isLoading || watchlist === undefined)  ? (
            <Icons.spinner className="animate-spin" />
          ) : isError ? (
            <AlertCircle />
          ) : (
            <Icons.watchlist className={`${watchlist && 'fill-foreground'}`} />
          )}
        </Button>
      </TooltipBox>
    </ContextMenuMovieWatchlistAction>
  );
}
