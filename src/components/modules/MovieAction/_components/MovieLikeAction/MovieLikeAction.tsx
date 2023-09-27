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
import { useUser } from '@/context/UserProvider';
import { ApolloError, useMutation } from '@apollo/client';
import { FilmAction } from '@/types/type.film';
import { toast } from 'react-toastify';
import FILM_ACTION_QUERY from '@/components/modules/MovieAction/queries/filmActionQuery';
import INSERT_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/insertFilmActionMutation';
import UPDATE_FILM_ACTION_MUTATION from '@/components/modules/MovieAction/mutations/updateFilmActionMutation';
import { useAuth } from '@/context/AuthContext/AuthProvider';

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  filmId: string;
  filmAction: FilmAction;
  loading: boolean;
  error: ApolloError | undefined;
}

export function MovieLikeAction({
  filmId,
  filmAction,
  loading,
  error,
}: MovieLikeActionProps) {

  const { user } = useAuth();

  const router = useRouter();

  const [ updateFilmActionMutation ] = useMutation(UPDATE_FILM_ACTION_MUTATION);
  const [ insertFilmActionMutation, { error: errorAddingFilmAction} ] = useMutation(INSERT_FILM_ACTION_MUTATION, {
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

  const handleLike = async () => {
    try {
      const mutationToUse = filmAction ? updateFilmActionMutation : insertFilmActionMutation;
      const { errors } = await mutationToUse({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_liked: true,
          is_watched: true,
          is_watchlisted: false,
        }
      });
      if (errors) throw errors;
      toast.success('Ajouté à vos coups de coeur');
    } catch (errors) {
      toast.error('Une erreur s\'est produite');
    }
  }

  const handleUnlike = async () => {
    try {
      const { errors } = await updateFilmActionMutation({
        variables: {
          film_id: filmId,
          user_id: user?.id,
          is_liked: false,
        }
      });
      if (errors) throw errors;
      toast.success('Supprimé de vos coups de coeur');
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
              className="rounded-full"
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
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
            onClick={() => {
              filmAction?.is_liked ?
                handleUnlike()
              :
                handleLike()
            }}
            disabled={(loading || error) && true}
            size="icon"
            variant={'action'}
            className="rounded-full"
          >
            {loading ? (
              <Icons.spinner className="animate-spin" />
            ) : error ? (
              <AlertCircle />
            ) : (
              <Heart
                className={`
                  transition hover:text-like
                  ${filmAction?.is_liked && 'text-like fill-like'}
                `}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {filmAction?.is_liked ? (
            <p>Retirer des coups de coeur</p>
          ) : (
            <p>Ajouter aux coups de coeur</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}