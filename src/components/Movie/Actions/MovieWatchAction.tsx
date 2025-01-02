import { AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Icons } from '../../../config/icons';
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
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useUserMovieActivity } from '@/features/user/userQueries';
import { useUserMovieActivityDelete, useUserMovieActivityInsert } from '@/features/user/userMutations';

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchAction({ movieId }: MovieWatchActionProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const {
    data: activity,
    isLoading,
    isError,
  } = useUserMovieActivity({
    userId: user?.id,
    movieId: movieId,
  });

  const insertActivity = useUserMovieActivityInsert();
  const deleteActivity = useUserMovieActivityDelete();

  const handleInsertActivity = async () => {
    if (activity) return;
    await insertActivity.mutateAsync({
      userId: user?.id,
      movieId: movieId,
    }), {
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    };
  };

  const handleDeleteActivity = async () => {
    if (!activity) return;
    await deleteActivity.mutateAsync({
      activityId: activity.id,
    }), {
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    };
  };

  if (user === null) {
    return (
      <TooltipBox tooltip={'Connectez-vous'}>
        <Button
          size="icon"
          variant={'action'}
          className={`rounded-full hover:text-foreground`}
          asChild
        >
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <div
              className={`transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[0.5px]`}
            >
              <Check />
            </div>
          </Link>
        </Button>
      </TooltipBox>
    );
  }

  return (
    <AlertDialog>
      <TooltipBox tooltip={activity ? 'Retirer des films vus' : 'Marquer comme vu'}>
        {!activity ? (
          <Button
            onClick={async () => await handleInsertActivity()}
            disabled={isLoading || isError || activity === undefined || insertActivity.isPending || deleteActivity.isPending}
            size="icon"
            variant={'action'}
            className={`rounded-full hover:text-foreground`}
          >
            {(isLoading || activity === undefined) ? (
              <Icons.spinner className="animate-spin" />
            ) : isError ? (
              <AlertCircle />
            ) : (
              <div
                className={`
                    transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[0.5px]
                    ${activity && 'bg-blue-500 border-blue-500'}
                  `}
              >
                <Check />
              </div>
            )}
          </Button>
        ) : (
          <AlertDialogTrigger disabled={!activity}>
            <Button
              disabled={(isLoading || isError) && true}
              size="icon"
              variant={'action'}
              className={`rounded-full`}
            >
              {(isLoading || activity == undefined) ? (
                <Icons.spinner className="animate-spin" />
              ) : isError ? (
                <AlertCircle />
              ) : (
                <div
                  className={`
                    border-2 hover:border-blue-500 rounded-full p-[0.5px]
                    ${activity && 'bg-blue-500 border-blue-500'}
                  `}
                >
                  <Check />
                </div>
              )}
            </Button>
          </AlertDialogTrigger>
        )}
      </TooltipBox>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Oula, tu es sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Voulez-vous supprimer toutes vos actions effectuées sur cette oeuvre
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => await handleDeleteActivity()}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
