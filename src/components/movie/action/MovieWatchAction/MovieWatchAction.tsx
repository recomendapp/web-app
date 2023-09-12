import { AlertCircle, Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '../../../icons';
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
import { useQuery, useQueryClient } from 'react-query';
import { handleGetWatch, handleUnwatch, handleWatch } from '@/api/movie/movie_action_watch';
import { useUser } from '@/context/user';

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchAction({
  movieId,
}: MovieWatchActionProps) {

  const { user } = useUser();

  const queryClient = useQueryClient();

  const {
    data: isWatched,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', movieId, 'watch'],
    queryFn: () => handleGetWatch(user.$id, movieId),
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
                className={`rounded-full hover:text-foreground`}
              >
                {isLoading ? (
                  <Icons.spinner className="animate-spin" />
                ) : isError ? (
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
            {!isWatched?.state ? (
              <Button
                onClick={() => {
                  if (user?.$id) {
                    isWatched && isWatched.id ? handleUnwatch(user.$id, isWatched, movieId, queryClient) : handleWatch(user.$id, movieId, queryClient);
                  } else {
                    router.push('/login');
                  }
                }}
                disabled={(isLoading || isError) && true}
                size="icon"
                variant={'action'}
                className={`rounded-full hover:text-foreground`}
              >
                {isLoading ? (
                  <Icons.spinner className="animate-spin" />
                ) : isError ? (
                  <AlertCircle />
                ) : (
                  <div 
                      className={`
                        transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[2px]
                        ${isWatched && isWatched.state && 'bg-blue-500 border-blue-500'}
                      `}
                    >
                      <Check size={16} />
                  </div>
                )}
              </Button>
            ) : (
              <AlertDialogTrigger disabled={!isWatched}>
                <Button
                  onClick={() => {
                    if (user?.$id) {
                      isWatched && !isWatched.state && handleWatch(user.$id, movieId, queryClient);
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
                    <div 
                      className={`
                        border-2 hover:border-blue-500 rounded-full p-[2px]
                        ${isWatched && isWatched.state && 'bg-blue-500 border-blue-500'}
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
            {isWatched && isWatched.state ? <p>Retirer des films vus</p> : <p>Marquer comme vu</p>}
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
            onClick={() => isWatched?.id && handleUnwatch(user.$id, isWatched, movieId, queryClient)}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}