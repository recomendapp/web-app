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
import { FilmAction } from '@/types/type.film';
import { ApolloError, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext/AuthProvider';

import FILM_ACTION_QUERY from '@/components/modules/MovieAction/queries/filmActionQuery';
import INSERT_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/insertFilmActionMutation';
import DELETE_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/deleteFilmActionMutation';
import UPDATE_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/updateFilmActionMutation';


interface MovieWatchlistActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: string;
  filmAction: FilmAction;
  loading: boolean;
  error: ApolloError | undefined;
}

export function MovieWatchlistAction({
  filmId,
  filmAction,
  loading,
  error,
}: MovieWatchlistActionProps) {

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
  
  const handleWatchlist = async () => {
    try {
      const mutationToUse = filmAction ? updateFilmActionMutation : insertFilmActionMutation;
      const { errors } = await mutationToUse({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_watchlisted: true,
        }
      });
      if (errors) throw error;
      toast.success('Ajouté à vos films à voir');
    } catch {
      toast.error('Une erreur s\'est produite');
    }
  }
  const handleUnwatchlist = async () => {
    try {
      const mutationToUse = (!filmAction.is_liked && !filmAction.is_watched && !filmAction.rating) ? deleteFilmActionMutation : updateFilmActionMutation;
      const { errors } = await mutationToUse({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_watchlisted: false,
        }
      });
      if (errors) throw errors;
      toast.success('Supprimé de vos films à voir');
    } catch (error) {
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
              className={`rounded-full`}
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
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
            onClick={() => {
              filmAction?.is_watchlisted ?
                handleUnwatchlist()
              :
                handleWatchlist();
            }}
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
              <Bookmark className={`${filmAction?.is_watchlisted && 'fill-foreground'}`}/>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
        {filmAction?.is_watched ? (
          filmAction?.is_watchlisted ? (
            <p>Supprimer des films à revoir</p>
          ) : (
            <p>Envie de le revoir</p>
          )
        ) : (
          filmAction?.is_watchlisted ? (
            <p>Supprimer des films à voir</p>
          ) : (
            <p>Envie de le voir</p>
          )
        )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}