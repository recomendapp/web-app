'use client';

import { Link } from "@/lib/i18n/routing";
import { Column, Row, Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import { UserWatchlistMovie } from '@recomendapp/types/dist';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import { useModal } from '@/context/modal-context';
import { createShareController } from "@/components/ShareController/ShareController";
import { useUserWatchlistMovieDeleteMutation } from "@/features/client/user/userMutations";
import { ShareControllerMovie } from "@/components/ShareController/ShareControllerMovie";
import { ModalUserRecosMovieSend } from "@/components/Modals/recos/ModalUserRecosMovieSend";
import { ModalUserWatchlistMovieComment } from "@/components/Modals/watchlist/ModalUserWatchlistMovieComment";

interface DataTableRowActionsProps {
  table: Table<UserWatchlistMovie>;
  row: Row<UserWatchlistMovie>;
  column: Column<UserWatchlistMovie, unknown>;
  data: UserWatchlistMovie;
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const t = useTranslations();
  const { openModal, createConfirmModal } = useModal();
  const deleteWatchlistMovie = useUserWatchlistMovieDeleteMutation();

  const handleUnwatchlist = async () => {
    if (!data) return;
    await deleteWatchlistMovie.mutateAsync({
      watchlistId: data.id,
    }, {
      onSuccess: () => {
        toast.success(upperFirst(t('common.messages.deleted')));
      },
      onError: () => {
        toast.error(upperFirst(t('common.messages.an_error_occurred')));
      }
    });
  }

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4 text-accent-yellow" />
            <span className="sr-only">{upperFirst(t('common.messages.open_menu'))}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
          onClick={() => openModal(ModalUserRecosMovieSend, { movieId: data.movie_id!, movieTitle: data.movie?.title })}
          >
            <Icons.send className='w-4' />
            {upperFirst(t('common.messages.send_to_friend'))}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={data?.movie?.url ?? ''}>
              <Icons.eye className='w-4' />
              {upperFirst(t('common.messages.go_to_film'))}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={() => openModal(ModalUserWatchlistMovieComment, { watchlistItem: data })}
          >
            <Icons.comment className='w-4' />
            {data?.comment ? upperFirst(t('common.messages.view_comment', { count: 1 })) : upperFirst(t('common.messages.add_comment', { count: 1 }))}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openModal(ModalShare, {
              title: data?.movie?.title,
              type: 'movie',
              path: data?.movie?.url ?? '',
              shareController: createShareController(ShareControllerMovie, { movie: data?.movie! }),
            })}
          >
            <Icons.share className='w-4' />
            {upperFirst(t('common.messages.share'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => createConfirmModal({
              title: upperFirst(t('pages.collection.watchlist.modal.delete_confirm.title')),
              description: t.rich('pages.collection.watchlist.modal.delete_confirm.description', {
                title: data?.movie?.title!,
                important: (chunk) => <b>{chunk}</b>,
              }),
              onConfirm: handleUnwatchlist,
            })}
          >
            <Icons.delete className='w-4' />
            {upperFirst(t('common.messages.delete'))}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};