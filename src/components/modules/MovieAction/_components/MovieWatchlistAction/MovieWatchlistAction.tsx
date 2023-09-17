import { AlertCircle, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '../../../../icons';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';
import { handleGetWatchlist, handleUnwatchlist, handleWatchlist } from '@/components/modules/MovieAction/_components/MovieWatchlistAction/_queries/movie-action-watchlist';
import { handleGetWatch } from '@/components/modules/MovieAction/_components/MovieWatchAction/_queries/movie-action-watch';
import { useUser } from '@/context/UserProvider';

interface MovieWatchlistActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchlistAction({
  movieId,
}: MovieWatchlistActionProps) {

  const { user } = useUser();

  const queryClient = useQueryClient();

  const {
    data: isWatched,
    isLoading: isWatchedLoading,
    isError: isWatchedError,
  } = useQuery({
    queryKey: ['movie', movieId, 'watch'],
    queryFn: () => handleGetWatch(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });

  const {
    data: isWatchlisted,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', movieId, 'watchlist'],
    queryFn: () => handleGetWatchlist(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });  

  const router = useRouter();

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={(isLoading || isError) && true}
              size="icon"
              variant={'action'}
              className={`rounded-full`}
            >
              {isLoading ? (
                <Icons.spinner className="animate-spin" />
              ) : isError ? (
                <AlertCircle />
              ) : (
                <Bookmark />
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
            onClick={(e) => {
              if (user?.$id) {
                isWatchlisted?.id ? handleUnwatchlist(isWatchlisted.id, movieId, queryClient) : handleWatchlist(user.$id, movieId, queryClient);
              } else {
                router.push('/login');
              }
            }}
            disabled={(isLoading || isError) && true}
            size="icon"
            variant={'action'}
            className={`rounded-full`}
          >
            {isLoading ? (
              <Icons.spinner className="animate-spin" />
            ) : isError ? (
              <AlertCircle />
            ) : (
              <Bookmark className={`${isWatchlisted?.state && 'fill-foreground'}`}/>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {isWatched?.state ? <p>Envie de le revoir</p> : <p>Envie de le voir</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}