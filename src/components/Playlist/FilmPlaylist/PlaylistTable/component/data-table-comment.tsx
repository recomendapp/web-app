import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';

// COMPONENTS

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_PLAYLIST_BY_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistById';
import type { GetPlaylistByIdQuery, PlaylistItemFragment} from '@/graphql/__generated__/graphql';
import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/Playlist/PlaylistCommentModal';

export function DataComment({ playlistItem }: { playlistItem: PlaylistItemFragment }) {

  const { openModal } = useModal();

  const { user } = useAuth();

  const locale = useLocale();

  const { data: playlistQuery } = useQuery<GetPlaylistByIdQuery>(GET_PLAYLIST_BY_ID, {
    variables: {
      id: playlistItem.playlist_id,
      locale: locale
    },
    skip: !playlistItem.playlist_id || !locale,
  });
  const playlist = playlistQuery?.playlistCollection?.edges[0]?.node;

  const isAllowedToEdit = Boolean(
    user?.id &&
    playlist &&
    (
      user?.id === playlist?.user_id ||
      (
        playlist?.guests?.edges.some(
          ({ node }) => node.user_id === user?.id && node.edit
        ) &&
        playlist?.user?.subscriptions?.edges.length! > 0
      )
    )
  );
  
  return (
    <>
      <p onClick={() => openModal({
        id: `playlist-item-${playlistItem.id}-comment`,
        content: <PlaylistCommentModal id={`playlist-item-${playlistItem.id}-comment`} playlistItem={playlistItem} />,
      })}>
        {isAllowedToEdit ? (
          playlistItem.comment ? (
            <span className="line-clamp-2 break-all">{playlistItem.comment}</span>
          ) : (
            <span className='line-clamp-1 italic'>Ajouter un commentaire...</span>
          )
        ) : (
          <p className="line-clamp-2 break-all">{playlistItem.comment}</p>
        )}
      </p>
    </>
  );
}
