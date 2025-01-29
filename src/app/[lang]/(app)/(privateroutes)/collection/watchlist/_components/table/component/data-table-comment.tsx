import { useModal } from '@/context/modal-context';
import { UserWatchlist } from '@/types/type.db';
import { MessageSquarePlusIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { ModalWatchlistComment } from '@/components/Modals/watchlist/ModalWatchlistComment';

export function DataComment({ watchlistItem }: { watchlistItem: UserWatchlist }) {

  const { openModal } = useModal();

  return (
    <p
      onClick={() => openModal(ModalWatchlistComment, { watchlistItem })}
      className={`cursor-pointer text-muted-foreground`}
    >
      {watchlistItem?.comment && <span className='line-clamp-2 break-all'>{watchlistItem.comment}</span>}
      {!watchlistItem?.comment &&
        <TooltipBox tooltip='Ajouter un commentaire'>
          <MessageSquarePlusIcon className='w-5 h-5' />
        </TooltipBox>
      }
    </p>
  );
}
