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
import { MediaMovie, MediaTvSeries, UserActivity } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import { useModal } from '@/context/modal-context';
import { createShareController } from "@/components/ShareController/ShareController";
import { useUserActivityMovieUpdateMutation, useUserActivityTvSeriesUpdateMutation } from "@/features/client/user/userMutations";
import { ShareControllerMovie } from "@/components/ShareController/ShareControllerMovie";
import { ShareControllerTvSeries } from "@/components/ShareController/ShareControllerTvSeries";
import { ModalUserRecosMovieSend } from "@/components/Modals/recos/ModalUserRecosMovieSend";
import { ModalUserRecosTvSeriesSend } from "@/components/Modals/recos/ModalUserRecosTvSeriesSend";

interface DataTableRowActionsProps {
  table: Table<UserActivity>;
  row: Row<UserActivity>;
  column: Column<UserActivity, unknown>;
  data: UserActivity;
}

export function DataTableRowActions({
  row,
  table,
  column,
  data,
}: DataTableRowActionsProps) {
  const t = useTranslations();
  const { openModal, createConfirmModal } = useModal();
  const updateActivityMovie = useUserActivityMovieUpdateMutation();
  const updateActivityTvSeries = useUserActivityTvSeriesUpdateMutation();
  const updateActivity = data.media?.media_type === 'movie' ? updateActivityMovie : updateActivityTvSeries;
  
  const sharedController = data.media?.media_type === 'movie'
      ? createShareController(ShareControllerMovie, { movie: data.media as MediaMovie })
      : createShareController(ShareControllerTvSeries, { tvSeries: data.media as MediaTvSeries });

  const sendModal = data.media?.media_type === 'movie'
      ? () => openModal(ModalUserRecosMovieSend, { movieId: data.media_id!, movieTitle: data.media.title})
      : () => openModal(ModalUserRecosTvSeriesSend, { tvSeriesId: data.media_id!, tvSeriesTitle: data.media.title});

  const handleUnlike = async () => {
    if (!data) return;
    await updateActivity.mutateAsync({
      activityId: data.id,
      isLiked: false,
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
          onClick={sendModal}
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openModal(ModalShare, {
              title: data?.media?.title,
              type: data?.media?.media_type,
              path: data?.media?.url ?? '',
              shareController: sharedController,
            })}
          >
            <Icons.share className='w-4' />
            {upperFirst(t('common.messages.share'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => createConfirmModal({
              title: upperFirst(t('pages.collection.heart_picks.modal.delete_confirm.label')),
              description: t.rich('pages.collection.heart_picks.modal.delete_confirm.description', {
                title: data.media?.title!,
                important: (chunk) => <b>{chunk}</b>,
              }),
              onConfirm: handleUnlike,
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