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
import { UserWatchlist } from '@/types/type.db';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { useUserWatchlistDeleteMutation } from '@/features/client/user/userMutations';
import { useTranslations } from 'next-intl';
import { capitalize, upperFirst } from 'lodash';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import { ModalRecoSend } from '@/components/Modals/actions/ModalRecoSend';
import { ModalWatchlistComment } from '@/components/Modals/watchlist/ModalWatchlistComment';

interface DataTableRowActionsProps {
  table: Table<UserWatchlist>;
  row: Row<UserWatchlist>;
  column: Column<UserWatchlist, unknown>;
  data: UserWatchlist;
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const common = useTranslations('common');
  const { openModal, createConfirmModal } = useModal();
  const deleteWatchlist = useUserWatchlistDeleteMutation();

  const handleUnwatchlist = async () => {
    if (!data) return;
    await deleteWatchlist.mutateAsync({
      watchlistId: data.id,
    }, {
      onSuccess: () => {
        toast.success(capitalize(common('word.deleted')));
      },
      onError: () => {
        toast.error(capitalize(common('errors.an_error_occurred')));
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
            <span className="sr-only">{capitalize(common('sr.open_menu'))}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => openModal(ModalRecoSend, { mediaId: data?.media_id, mediaTitle: data?.media?.title })}
          >
            <Icons.send className='w-4' />
            {upperFirst(common('messages.send_to_friend'))}
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => openModal(ModalPlaylistAdd, { mediaId: data?.media_id!, mediaType: data?.media_type!, mediaTitle: data?.media?.title })}
          >
            <Icons.addPlaylist className='w-4' />
            {upperFirst(common('messages.add_to_playlist'))}
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={data?.media?.url ?? ''}>
              <Icons.eye className='w-4' />
              {data?.media?.media_type === 'movie'
                ? capitalize(common('messages.go_to_film'))
                : data?.media?.media_type === 'tv_series'
                ? capitalize(common('messages.go_to_serie'))
                : data?.media?.media_type === 'person'
                ? capitalize(common('messages.go_to_person'))
                : ''
              }
            </Link>
          </DropdownMenuItem>
          {data?.media?.main_credit && data?.media.main_credit.length > 0 ? (
            <div>

            </div>
          ) : null}
          <DropdownMenuItem
            onClick={() => openModal(ModalWatchlistComment, { watchlistItem: data })}
          >
            <Icons.comment className='w-4' />
            {data?.comment ? capitalize(common('messages.view_comment', { count: 1 })) : capitalize(common('messages.add_comment', { count: 1 }))}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openModal(ModalShare, {
              title: data?.media?.title,
              type: data?.media?.media_type,
              path: data?.media?.url ?? '',
            })}
          >
            <Icons.share className='w-4' />
            {capitalize(common('word.share'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => createConfirmModal({
              title: capitalize(common('library.collection.watchlist.modal.delete_confirm.title')),
              description: common.rich('library.collection.watchlist.modal.delete_confirm.description', {
                title: data?.media?.title!,
                important: (chunk) => <b>{chunk}</b>,
              }),
              onConfirm: handleUnwatchlist,
            })}
          >
            <Icons.delete className='w-4' />
            {capitalize(common('word.delete'))}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}