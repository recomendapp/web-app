import { useModal } from '@/context/modal-context';
import { UserMovieWatchlist } from '@/types/type.db';
import { MessageSquarePlusIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import ModalMovieWatchlistComment from '@/components/Modals/Movie/ModalMovieWatchlistComment';

export function DataComment({ watchlistItem }: { watchlistItem: UserMovieWatchlist }) {

  const { openModal } = useModal();

  return (
    <p
      onClick={() => openModal(ModalMovieWatchlistComment, { watchlistItem })}
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
