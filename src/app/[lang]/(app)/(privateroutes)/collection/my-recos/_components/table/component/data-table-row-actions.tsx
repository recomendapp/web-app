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
import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import { UserRecosAggregated } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { capitalize, upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import { ModalRecosSenders } from '@/components/Modals/recos/ModalRecosSenders';
import { useUserRecosCompleteMutation, useUserRecosDeleteMutation } from '@/features/client/user/userMutations';
import toast from 'react-hot-toast';
import { ModalRecoSend } from '@/components/Modals/actions/ModalRecoSend';
import { createShareController } from "@/components/ShareController/ShareController";
import { ShareControllerMedia } from "@/components/ShareController/ShareControllerMedia";

interface DataTableRowActionsProps {
  table: Table<UserRecosAggregated>;
  row: Row<UserRecosAggregated>;
  column: Column<UserRecosAggregated, unknown>;
  data: UserRecosAggregated;
}

export function DataTableRowActions({
  row,
  data,
}: DataTableRowActionsProps) {
  const { user } = useAuth();
  const common = useTranslations('common');
  const { openModal, createConfirmModal } = useModal();
  const deleteRecoMutation = useUserRecosDeleteMutation();
  const completeRecoMutation = useUserRecosCompleteMutation();

  const handleDeleteReco = async () => {
    if (!user || !data?.media_id) {
      toast.error(upperFirst(common('errors.an_error_occurred')));
      return;
    }
    await deleteRecoMutation.mutateAsync({
      userId: user?.id,
      mediaId: data?.media_id,
    }, {
      onSuccess: () => {
        toast.success(upperFirst(common('word.deleted')));
      },
      onError: () => {
        toast.error(upperFirst(common('errors.an_error_occurred')));
      }
    });
  };

  const handleCompleteReco = async () => {
    if (!user || !data?.media_id) {
      toast.error(upperFirst(common('errors.an_error_occurred')));
      return;
    }
    await completeRecoMutation.mutateAsync({
      userId: user?.id,
      mediaId: data?.media_id,
    }, {
      onSuccess: () => {
        toast.success(upperFirst(common('messages.completed')));
      },
      onError: () => {
        toast.error(upperFirst(common('errors.an_error_occurred')));
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
            onClick={() => createConfirmModal({
              title: capitalize(common('library.collection.my_recos.modal.complete_confirm.title')),
              description: common.rich('library.collection.my_recos.modal.complete_confirm.description', {
                title: data.media?.title!,
                important: (chunk) => <b>{chunk}</b>,
              }),
              onConfirm: handleCompleteReco,
            })}
          >
            <Icons.check className='w-4' />
            {upperFirst(common('messages.complete'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal(ModalRecoSend, { mediaId: data?.media_id!, mediaTitle: data.media?.title })}
          >
            <Icons.send className='w-4' />
            {upperFirst(common('messages.send_to_friend'))}
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => openModal(ModalPlaylistAdd, { mediaId: data?.media_id!, mediaType: data?.media_type!, mediaTitle: media.title })}
          >
            <Icons.addPlaylist className='w-4' />
            {upperFirst(common('messages.add_to_playlist'))}
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={data.media?.url ?? ''}>
              <Icons.eye className='w-4' />
              {data.media?.media_type === 'movie'
                ? capitalize(common('messages.go_to_film'))
                : data.media?.media_type === 'tv_series'
                ? capitalize(common('messages.go_to_serie'))
                : data.media?.media_type === 'person'
                ? capitalize(common('messages.go_to_person'))
                : ''
              }
            </Link>
          </DropdownMenuItem>
          {data.media?.main_credit && data.media.main_credit.length > 0 ? (
            <div>

            </div>
          ) : null}
          {/* <ShowDirectorsButton
            movie={data?.movie}
            setOpen={setOpenShowDirectors}
          /> */}
          {data?.senders?.length! > 0 && (
            <DropdownMenuItem
              onClick={() => openModal(ModalRecosSenders, { comments: row.original?.senders })}
            >
              <Icons.comment className='w-4' />
              {capitalize(common('messages.view_recommendations', { count: data?.senders?.length }))}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openModal(ModalShare, {
              title: data.media?.title,
              type: data.media?.media_type,
              path: data.media?.url ?? '',
              shareController: createShareController(ShareControllerMedia, {
                media: data.media!,
              }),
            })}
          >
            <Icons.share className='w-4' />
            {capitalize(common('word.share'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => createConfirmModal({
              title: capitalize(common('library.collection.my_recos.modal.delete_confirm.title')),
              description: common.rich('library.collection.my_recos.modal.delete_confirm.description', {
                title: data.media?.title!,
                important: (chunk) => <b>{chunk}</b>,
              }),
              onConfirm: handleDeleteReco,
            })}
          >
            <Icons.delete className='w-4' />
            {capitalize(common('word.delete'))}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <ShowDirectorsModal
        movie={data?.movie}
        open={openShowDirectors}
        setOpen={setOpenShowDirectors}
      /> */}
    </div>
  );
}

// export function ShowDirectorsButton({
//   movie,
//   setOpen,
// }: {
//   movie: Movie;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   const common = useTranslations('common');
//   if (!movie?.directors?.length) {
//     return (
//       <DropdownMenuItem>
//         <Icons.user className='w-4' />
//         {capitalize(common('messages.no_director'))}
//       </DropdownMenuItem>
//     );
//   }
//   if (movie.directors.length == 1) {
//     return (
//       <DropdownMenuItem asChild>
//         <Link href={`/person/${movie.directors[0]?.slug ?? movie.directors[0]?.id}`}>
//           <Icons.user className='w-4' />
//           {capitalize(common('messages.view_directors', { count: movie.directors.length }))}
//         </Link>
//       </DropdownMenuItem>
//     );
//   }
//   return (
//     <DropdownMenuItem onClick={() => setOpen(true)}>
//       <Icons.users className='w-4' />
//       {capitalize(common('messages.view_directors', { count: movie.directors.length }))}
//     </DropdownMenuItem>
//   );
// }

// export function ShowDirectorsModal({
//   movie,
//   open,
//   setOpen,
// }: {
//   movie: Movie;
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="max-w-5xl bg-black">
//         <DialogHeader>
//           <DialogTitle className="text-center">Réalisateur</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-4">
//           {movie?.directors?.map((person: any) => (
//             <Button key={person?.id} variant={'ghost'} asChild>
//               <Link href={`/person/${person?.slug ?? person.id}`}>{person?.name}</Link>
//             </Button>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
