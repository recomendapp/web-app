'use client';

import { Link } from "@/lib/i18n/routing";
import { Column, Row, Table } from '@tanstack/react-table';
// UI
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useModal } from '@/context/modal-context';
import PlaylistCommentModal from '@/components/Modals/Playlist/PlaylistCommentModal';
import { PlaylistItem } from '@/types/type.db';
import { ModalPlaylistAdd } from '@/components/Modals/actions/ModalPlaylistAdd';
import { Icons } from '@/config/icons';
import { useDeletePlaylistItem } from '@/features/client/playlist/playlistMutations';
import { usePlaylistIsAllowedToEdit } from '@/features/client/playlist/playlistQueries';
import { useTranslations } from 'next-intl';
import { capitalize, upperFirst } from 'lodash';
import { ModalRecoSend } from '@/components/Modals/actions/ModalRecoSend';
import { ModalShare } from '@/components/Modals/Share/ModalShare';

interface DataTableRowActionsProps {
  table: Table<PlaylistItem>;
  row: Row<PlaylistItem>;
  column: Column<PlaylistItem, unknown>;
  data: PlaylistItem;
}

export function DataTableRowActions({ data }: DataTableRowActionsProps) {
  const common = useTranslations('common');
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(data?.playlist_id as number);
  const { openModal, createConfirmModal } = useModal();
  const [openShowDirectors, setOpenShowDirectors] = useState(false);
  const { mutateAsync: deletePlaylistItem } = useDeletePlaylistItem();

  return (
    <>
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-end">
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4 text-accent-yellow" />
              <span className="sr-only">{upperFirst(common('sr.open_menu'))}</span>
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent align="end" className="max-w-sm">
          <DropdownMenuItem
            onClick={() => openModal(ModalPlaylistAdd, { mediaId: data?.media_id!, mediaTitle: data?.media?.title })}
          >
            <Icons.addPlaylist className='w-4' />
            {upperFirst(common('messages.add_to_playlist'))}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal(ModalRecoSend, { mediaId: data?.media_id!, mediaTitle: data?.media?.title })}
          >
            <Icons.send className='w-4' />
            {upperFirst(common('messages.send_to_friend'))}
          </DropdownMenuItem>
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
            movie={data?.movie!}
            setOpen={setOpenShowDirectors}
          /> */}
          {(isAllowedToEdit || data?.comment) && (
            <DropdownMenuItem
              onClick={() => openModal(PlaylistCommentModal, { playlistItem: data! })}
            >
              <Icons.comment className='w-4' />
              {data?.comment ? upperFirst(common('messages.view_comment', { count: 1 })) : upperFirst(common('messages.add_comment'))}
            </DropdownMenuItem>
          )}
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
          {isAllowedToEdit && (
            <DropdownMenuItem
              onClick={() => createConfirmModal({
                title: upperFirst(common('playlist.modal.delete_confirm.title')),
                description: common.rich('playlist.modal.delete_confirm.description', {
                  title: data?.media?.title,
                  important: (chunk) => <b>{chunk}</b>,
                }),
                onConfirm: () => data && deletePlaylistItem({ playlistId: data.playlist_id, playlistItemId: data.id, mediaId: data.media_id }),
              })}
            >
              <Icons.delete className='w-4' />
              {upperFirst(common('word.delete'))}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <ShowDirectorsModal
        movie={data?.movie!}
        open={openShowDirectors}
        setOpen={setOpenShowDirectors}
      /> */}
    </>
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
//       <DropdownMenuItem asChild>
//         <Icons.user className='w-4' />
//         {upperFirst(common('messages.no_director'))}
//       </DropdownMenuItem>
//     );
//   }
//   if (movie?.directors.length == 1) {
//     return (
//       <DropdownMenuItem asChild>
//         <Link href={`/person/${movie.directors[0]?.slug ?? movie.directors[0].id}`}>
//           <Icons.user className='w-4' />
//           {upperFirst(common('messages.view_directors', { count: movie.directors.length }))}
//         </Link>
//       </DropdownMenuItem>
//     );
//   }
//   return (
//     <DropdownMenuItem onClick={() => setOpen(true)}>
//       <Icons.user className='w-4' />
//       {upperFirst(common('messages.view_directors', { count: movie.directors.length }))}
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
//           {movie?.directors?.map((person) => (
//             <Button key={person?.id} variant={'ghost'} asChild>
//               <Link href={`/person/${person?.slug ?? person?.id}`}>{person?.name}</Link>
//             </Button>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
