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
import { useQuery, useQueryClient } from 'react-query';
import { handleGetLike, handleLike, handleUnlike } from '@/components/modules/MovieAction/_components/MovieLikeAction/_queries/movie-action-like';
import { useUser } from '@/context/UserProvider';

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieLikeAction({
  movieId,
}: MovieLikeActionProps) {

  const { user } = useUser();

  const queryClient = useQueryClient();

  const {
    data: isLiked,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', movieId, 'like'],
    queryFn: () => handleGetLike(user.$id, movieId),
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
              className="rounded-full"
            >
              {isLoading ? (
                <Icons.spinner className="animate-spin" />
              ) : isError ? (
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
            onClick={(e) => {
              if (user?.$id) {
                isLiked && isLiked.state && isLiked.id ? handleUnlike(isLiked.id, movieId, queryClient) : handleLike(user.$id, movieId, queryClient);
              } else {
                router.push('/login');
              }
            }}
            disabled={(isLoading || isError) && true}
            size="icon"
            variant={'action'}
            className="rounded-full"
          >
            {isLoading ? (
              <Icons.spinner className="animate-spin" />
            ) : isError ? (
              <AlertCircle />
            ) : (
              <Heart
                className={`
                  transition hover:text-like
                  ${isLiked && isLiked.state && 'text-like fill-like'}
                `}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {isLiked && isLiked.state ? (
            <p>Retirer des coups de coeur</p>
          ) : (
            <p>Ajouter aux coups de coeur</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}