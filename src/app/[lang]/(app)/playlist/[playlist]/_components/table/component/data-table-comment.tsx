import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/Playlist/PlaylistCommentModal';
import { Playlist, PlaylistGuest, PlaylistItem } from '@/types/type.db';
import { useQueryClient } from '@tanstack/react-query';

export function DataComment({ playlistItem }: { playlistItem: PlaylistItem }) {

  const { openModal } = useModal();

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const playlist = queryClient.getQueryData<Playlist>(['playlist', playlistItem?.playlist_id]);

  const isAllowedToEdit = Boolean(
    user?.id &&
    playlist &&
    (
      user?.id === playlist?.user_id ||
      (
        playlist?.guests?.some(
          (guest: PlaylistGuest ) => guest?.user_id === user?.id && guest?.edit
        ) &&
        playlist?.user?.premium
      )
    )
  );
  
  return (
    <>
      <p
        onClick={() => openModal({
          id: `playlist-item-${playlistItem?.id}-comment`,
          content: <PlaylistCommentModal id={`playlist-item-${playlistItem?.id}-comment`} playlistItem={playlistItem} />,
        })}
        className='text-muted-foreground'
      >
        {isAllowedToEdit ? (
          playlistItem?.comment ? (
            <span className="line-clamp-2 break-all">{playlistItem.comment}</span>
          ) : (
            <span className='line-clamp-1 italic'>Ajouter un commentaire...</span>
          )
        ) : (
          <p className="line-clamp-2 break-all">{playlistItem?.comment}</p>
        )}
      </p>
    </>
  );
}
