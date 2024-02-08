import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

// COMPONENTS
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// GRAPHQL
import { useQuery, useMutation } from '@apollo/client';
import GET_PLAYLIST_LIKE_BY_PLAYLIST_ID from '@/graphql/Playlist/PlaylistLike/queries/GetPlaylistLikeByPlaylistId';
import { DeletePlaylistLikeMutation, GetPlaylistLikeByPlaylistIdQuery, InsertPlaylistLikeMutation } from '@/graphql/__generated__/graphql';
import INSERT_PLAYLIST_LIKE from '@/graphql/Playlist/PlaylistLike/mutations/InsertPlaylistLike';
import DELETE_PLAYLIST_LIKE from '@/graphql/Playlist/PlaylistLike/mutations/DeletePlaylistLike';
import GET_PLAYLISTS_LIKE_BY_USER_ID from '@/graphql/Playlist/PlaylistLike/queries/GetPlaylistsLikeByUserId';

// ICONS
import { AlertCircle, Heart } from 'lucide-react';
import { Icons } from '../../../../icons';

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
  playlistId: number;
}

export function PlaylistLikeAction({ playlistId }: MovieLikeActionProps) {

  const { user } = useAuth();

  const router = useRouter();

  const {
    data: playlistFollowerQuery,
    loading,
    error,
  } = useQuery<GetPlaylistLikeByPlaylistIdQuery>(GET_PLAYLIST_LIKE_BY_PLAYLIST_ID, {
    variables: {
      movie_id: playlistId,
      user_id: user?.id,
    },
    skip: !user || !playlistId,
  });
  const isLiked = playlistFollowerQuery?.playlist_likeCollection?.edges[0]?.node ? true : false;

  const [insertPlaylistFollowerMutation] =
    useMutation<InsertPlaylistLikeMutation>(INSERT_PLAYLIST_LIKE, {
      update: (cache, { data }) => {
        if (data?.insertIntoplaylist_likeCollection?.records.length! > 0) {
          cache.writeQuery({
            query: GET_PLAYLIST_LIKE_BY_PLAYLIST_ID,
            variables: {
              movie_id: playlistId,
              user_id: user?.id,
            },
            data: {
              ...playlistFollowerQuery,
              playlist_likeCollection: {
                ...playlistFollowerQuery?.playlist_likeCollection,
                edges: [
                  {
                    node: data?.insertIntoplaylist_likeCollection?.records[0],
                  },
                ],
              },
            },
          });
        }
      },
      refetchQueries: [
        {
          query: GET_PLAYLISTS_LIKE_BY_USER_ID,
          variables: {
            user_id: user?.id,
          },
        },
      ],
    });

  const [deletePlaylistFollowerMutation] =
    useMutation<DeletePlaylistLikeMutation>(DELETE_PLAYLIST_LIKE, {
      update: (cache, { data }) => {
        if (data?.deleteFromplaylist_likeCollection.records.length! > 0) {
          cache.writeQuery({
            query: GET_PLAYLIST_LIKE_BY_PLAYLIST_ID,
            variables: {
              movie_id: playlistId,
              user_id: user?.id,
            },
            data: {
              ...playlistFollowerQuery,
              playlist_likeCollection: {
                ...playlistFollowerQuery?.playlist_likeCollection,
                edges: [],
              },
            },
          });
        }
      },
      refetchQueries: [
        {
          query: GET_PLAYLISTS_LIKE_BY_USER_ID,
          variables: {
            user_id: user?.id,
          },
        },
      ],
    });

  const handleLike = async () => {
    try {
      if (!user || !playlistId) throw Error("User or playlist_id doesn't exist");
      await insertPlaylistFollowerMutation({
        variables: {
          playlist_id: playlistId,
          user_id: user?.id,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleUnlike = async () => {
    try {
      if (!user || !playlistId) throw Error("User or playlist_id doesn't exist");
      await deletePlaylistFollowerMutation({
        variables: {
          playlist_id: playlistId,
          user_id: user?.id,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };

  if (!user) {
    return (
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
              <Heart className={`transition hover:text-accent-1`} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Connectez-vous</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            isLiked ? handleUnlike() : handleLike();
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
                transition hover:text-accent-1
                ${isLiked && 'text-accent-1 fill-accent-1'}
              `}
            />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {isLiked ? (
          <p>Retirer des playlists sauvegardées</p>
        ) : (
          <p>Ajouter aux playlists sauvegardées</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
