import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/Playlist/PlaylistCommentModal';
import { PlaylistItem } from '@/types/type.db';
import { MessageSquarePlusIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { usePlaylistIsAllowedToEdit } from '@/features/playlist/playlistQueries';

export function DataComment({ playlistItem }: { playlistItem: PlaylistItem }) {

  const { openModal } = useModal();
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(playlistItem?.playlist_id as number);
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
