import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/playlists/PlaylistCommentModal';
import { PlaylistItem } from '@/types/type.db';
import { MessageSquarePlusIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { usePlaylistIsAllowedToEditQuery } from '@/features/client/playlist/playlistQueries';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

export function DataComment({ playlistItem }: { playlistItem: PlaylistItem }) {
  const common = useTranslations('common');
  const { openModal } = useModal();
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEditQuery(playlistItem?.playlist_id as number);
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
          <TooltipBox tooltip={upperFirst(common('messages.add_comment', { count: 1 }))}>
            <MessageSquarePlusIcon className='w-5 h-5' />
          </TooltipBox>
        }
      </p>
    </>
  );
}