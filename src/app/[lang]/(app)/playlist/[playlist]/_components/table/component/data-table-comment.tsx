import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/modals/Playlist/PlaylistCommentModal';
import { Playlist, PlaylistGuest, PlaylistItem } from '@/types/type.db';
import { useQueryClient } from '@tanstack/react-query';
import { MessageSquarePlusIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { playlistKeys } from '@/features/playlist/playlistKeys';

export function DataComment({ playlistItem }: { playlistItem: PlaylistItem }) {

  const { openModal } = useModal();

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const playlist = queryClient.getQueryData<Playlist>(playlistKeys.detail(playlistItem?.playlist_id as number));

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
        onClick={() => openModal(PlaylistCommentModal, { playlistItem })}
        className={` cursor-pointer
          text-muted-foreground
        `}
      >
        {playlistItem?.comment && <span className='line-clamp-2 break-all'>{playlistItem.comment}</span>}
        {!playlistItem?.comment && isAllowedToEdit &&
          <TooltipBox tooltip='Ajouter un commentaire'>
            <MessageSquarePlusIcon className='w-5 h-5' />
          </TooltipBox>
        }
      </p>
    </>
  );
}
