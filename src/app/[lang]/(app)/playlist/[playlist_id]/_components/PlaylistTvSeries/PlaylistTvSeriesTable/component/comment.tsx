import { useModal } from '@/context/modal-context';
import { PlaylistItemTvSeries } from '@recomendapp/types';
import { MessageSquarePlusIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { usePlaylistIsAllowedToEditQuery } from '@/features/client/playlist/playlistQueries';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { useAuth } from '@/context/auth-context';
import ModalPlaylistTvSeriesComment from '@/components/Modals/playlists/ModalPlaylistTvSeriesComment';

export function DataComment({ playlistItem }: { playlistItem: PlaylistItemTvSeries }) {
  const t = useTranslations();
  const { session } = useAuth();
  const { openModal } = useModal();
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEditQuery({
    playlistId: playlistItem.playlist_id,
    userId: session?.user.id
  });
  return (
    <>
      <p
        onClick={() => openModal(ModalPlaylistTvSeriesComment, { playlistItem })}
        className={` cursor-pointer
          text-muted-foreground
        `}
      >
        {playlistItem.comment && <span className='line-clamp-2 break-all'>{playlistItem.comment}</span>}
        {!playlistItem.comment && isAllowedToEdit &&
          <TooltipBox tooltip={upperFirst(t('common.messages.add_comment', { count: 1 }))}>
            <MessageSquarePlusIcon className='w-5 h-5' />
          </TooltipBox>
        }
      </p>
    </>
  );
}