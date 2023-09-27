import { AlertCircle, Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '../../../../icons';
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
import { useUser } from '@/context/UserProvider';
import { FilmAction } from '@/types/type.film';
import { ApolloError, useMutation } from '@apollo/client';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { toast } from 'react-toastify';
import FILM_ACTION_QUERY from '@/components/modules/MovieAction/queries/filmActionQuery';
import INSERT_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/insertFilmActionMutation';
import DELETE_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/deleteFilmActionMutation';
import UPDATE_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/updateFilmActionMutation';

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: string;
  filmAction: FilmAction;
  loading: boolean;
  error: ApolloError | undefined;
}

export function MovieWatchAction({
  filmId,
  filmAction,
  loading,
  error,
}: MovieWatchActionProps) {

  const { user } = useAuth();

  const router = useRouter();

  const [ updateFilmActionMutation ] = useMutation(UPDATE_FILM_ACTION_MUTATION);
  const [ insertFilmActionMutation, { error: errorAddingWatch } ] = useMutation(INSERT_FILM_ACTION_MUTATION, {
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
  const [ deleteFilmActionMutation, { error: errorDeletingWatch } ] = useMutation(DELETE_FILM_ACTION_MUTATION, {
    update: (store, { data }) => {
      // cache.evict({ id: `${data.deleteFromfilm_actionCollection.records[0].__typename}:${data.deleteFromfilm_actionCollection.records[0].id}` });
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
            edges: filmActionData!.film_actionCollection.edges.filter(edge => {
                edge.action.film_id !== data.deleteFromfilm_actionCollection.records[0]
            })
          }
        }
      })
    },
  });

  const handleWatch = async () => {
    try {
      const mutationToUse = filmAction ? updateFilmActionMutation : insertFilmActionMutation;
      const { errors } = await mutationToUse({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_watched: true,
          is_watchlisted: false,
        }
      });
      if (errors) throw errors;
      toast.success('Ajouté à vos films vus');
    } catch (errors) {
      toast.error('Une erreur s\'est produite');
    }
  }
  const handleUnwatch = async () => {
    try {
      const mutationToUse = filmAction.is_watchlisted ? updateFilmActionMutation : deleteFilmActionMutation;
      const { errors } = await mutationToUse({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_liked: false,
          is_watched: false,
          rating: null,
          review_id: null,
        }
      });
      if (errors) throw errors;
      toast.success('Supprimé de vos films vus');
    } catch (errors) {
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
                disabled={(loading || error) && true}
                size="icon"
                variant={'action'}
                className={`rounded-full hover:text-foreground`}
              >
                {loading ? (
                  <Icons.spinner className="animate-spin" />
                ) : error ? (
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
            {!filmAction?.is_watched ? (
              <Button
                onClick={() => !filmAction?.is_watched && handleWatch()}
                disabled={(loading || error) && true}
                size="icon"
                variant={'action'}
                className={`rounded-full hover:text-foreground`}
              >
                {loading ? (
                  <Icons.spinner className="animate-spin" />
                ) : error ? (
                  <AlertCircle />
                ) : (
                  <div 
                      className={`
                        transition border-2 border-foreground hover:border-blue-500 hover:text-blue-500 rounded-full p-[2px]
                        ${filmAction?.is_watched && 'bg-blue-500 border-blue-500'}
                      `}
                    >
                      <Check size={16} />
                  </div>
                )}
              </Button>
            ) : (
              <AlertDialogTrigger disabled={!filmAction?.is_watched}>
                <Button
                  disabled={(loading || error) && true}
                  size="icon"
                  variant={'action'}
                  className={`rounded-full`}
                >
                  {loading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : error ? (
                    <AlertCircle />
                  ) : (
                    <div 
                      className={`
                        border-2 hover:border-blue-500 rounded-full p-[2px]
                        ${filmAction?.is_watched && 'bg-blue-500 border-blue-500'}
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
            {filmAction?.is_watched ? <p>Retirer des films vus</p> : <p>Marquer comme vu</p>}
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
            onClick={() => filmAction?.is_watched && handleUnwatch()}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}