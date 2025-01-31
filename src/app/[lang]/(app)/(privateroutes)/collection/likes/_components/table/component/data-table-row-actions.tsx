'use client';

import Link from 'next/link';
import { Column, Row, Table } from '@tanstack/react-table';

// UI
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ICONS
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import toast from 'react-hot-toast';
import { UserActivity } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { capitalize, upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import { useModal } from '@/context/modal-context';
import { getMediaDetails } from '@/hooks/get-media-details';
import { useUserActivityUpdateMutation } from '@/features/client/user/userMutations';
import { ModalRecoSend } from '@/components/Modals/actions/ModalRecoSend';
import { ModalPlaylistAdd } from '@/components/Modals/actions/ModalPlaylistAdd';

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
  const common = useTranslations('common');
  const media = getMediaDetails(data?.media);
  const { openModal, createConfirmModal } = useModal();
  const updateActivity = useUserActivityUpdateMutation();

  const handleUnlike = async () => {
    if (!data) return;
    await updateActivity.mutateAsync({
      activityId: data.id,
      isLiked: false,
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
            <DotsHorizontalIcon className="h-4 w-4 text-accent-1" />
            <span className="sr-only">{capitalize(common('sr.open_menu'))}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => openModal(ModalRecoSend, { mediaId: data?.media_id!, mediaTitle: media.title })}
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
          {data?.media?.main_credit && data?.media?.main_credit.length > 0 ? (
            <div>

            </div>
          ) : null}
          {/* <ShowDirectorsButton
            movie={data?.movie}
            setOpen={setOpenShowDirectors}
          /> */}
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
              title: capitalize(common('library.collection.likes.modal.delete_confirm.title')),
              description: common.rich('library.collection.likes.modal.delete_confirm.description', {
                title: media.title,
                important: (chunk) => <b>{chunk}</b>,
              }),
              onConfirm: handleUnlike,
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
//               <Link href={`/person/${person?.slug ?? person?.id}`}>{person?.name}</Link>
//             </Button>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
