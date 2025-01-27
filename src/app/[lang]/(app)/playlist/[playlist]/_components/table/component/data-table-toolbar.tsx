'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableSortOptions } from './data-table-sort-options';

// GRAPHQL
import { PlaylistAction } from '../../../../../../../../components/Playlist/FilmPlaylist/Actions/PlaylistAction';
import { useAuth } from '@/context/auth-context';
import { Playlist } from '@/types/type.db';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { ModalPlaylistQuickAdd } from '@/components/Modals/Playlist/ModalPlaylistQuickAdd';
import { usePlaylistIsAllowedToEdit } from '@/features/client/playlist/playlistQueries';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  playlist: Playlist;
}

export function DataTableToolbar<TData>({
  table,
  playlist,
}: DataTableToolbarProps<TData>) {
  const common = useTranslations('common');
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(playlist?.id);
  const { user } = useAuth();
  const { openModal } = useModal();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse items-end lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder={upperFirst(common('playlist.search.placeholder'))}
          value={
            (table.getColumn('movie')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) => {
            table
              .getColumn('movie')
              ?.setFilterValue(event.target.value);
          }}
          className="h-8 w-full lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {upperFirst(common('word.cancel'))}
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="w-full lg:w-fit flex items-center justify-between gap-2">
        {user?.id !== playlist?.user_id ? <PlaylistAction playlistId={playlist?.id!} /> : null}
        <div className="w-fit flex items-center gap-2">
          {isAllowedToEdit ? <Button
          variant="outline"
          size="sm"
          className='ml-auto h-8'
          onClick={() => openModal(ModalPlaylistQuickAdd, { playlist: playlist })}
          >
            <Icons.add className='mr-2 h-4 w-4' />
            {upperFirst(common('messages.quick_add'))}
          </Button> : null}
          <DataTableSortOptions table={table} />
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
