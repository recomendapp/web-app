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
import { upperFirst } from 'lodash';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import { ModalRecoSend } from '@/components/Modals/actions/ModalRecoSend';
import { ModalWatchlistComment } from '@/components/Modals/watchlist/ModalWatchlistComment';
import { createShareController } from "@/components/ShareController/ShareController";
import { ShareControllerMedia } from "@/components/ShareController/ShareControllerMedia";

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
  const t = useTranslations();
  const { openModal, createConfirmModal } = useModal();
  const deleteWatchlist = useUserWatchlistDeleteMutation();

  const handleUnwatchlist = async () => {
    if (!data) return;
    await deleteWatchlist.mutateAsync({
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
            onClick={() => openModal(ModalRecoSend, { mediaId: data?.media_id, mediaTitle: data?.media?.title })}
          >
            <Icons.send className='w-4' />
            {upperFirst(t('common.messages.send_to_friend'))}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={data?.media?.url ?? ''}>
              <Icons.eye className='w-4' />
              {data?.media?.media_type === 'movie'
                ? upperFirst(t('common.messages.go_to_film'))
                : data?.media?.media_type === 'tv_series'
                ? upperFirst(t('common.messages.go_to_serie'))
                : data?.media?.media_type === 'person'
                ? upperFirst(t('common.messages.go_to_person'))
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
            {data?.comment ? upperFirst(t('common.messages.view_comment', { count: 1 })) : upperFirst(t('common.messages.add_comment', { count: 1 }))}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openModal(ModalShare, {
              title: data?.media?.title,
              type: data?.media?.media_type,
              path: data?.media?.url ?? '',
              shareController: createShareController(ShareControllerMedia, {
                media: data?.media!,
              }),
            })}
          >
            <Icons.share className='w-4' />
            {upperFirst(t('common.messages.share'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => createConfirmModal({
              title: upperFirst(t('pages.collection.watchlist.modal.delete_confirm.title')),
              description: t.rich('pages.collection.watchlist.modal.delete_confirm.description', {
                title: data?.media?.title!,
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
}