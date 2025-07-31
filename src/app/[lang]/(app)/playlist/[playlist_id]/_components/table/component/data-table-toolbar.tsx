'use client';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableSortOptions } from './data-table-sort-options';
import { useAuth } from '@/context/auth-context';
import { Playlist } from '@/types/type.db';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { ModalPlaylistQuickAdd } from '@/components/Modals/Playlist/ModalPlaylistQuickAdd';
import { usePlaylistIsAllowedToEditQuery } from '@/features/client/playlist/playlistQueries';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { DataTableViewOptions } from './data-table-view-options';
import { ModalShare } from '@/components/Modals/Share/ModalShare';
import PlaylistActionSave from '@/components/Playlist/actions/PlaylistActionSave';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  playlist: Playlist;
}

export function DataTableToolbar<TData>({
  table,
  playlist,
}: DataTableToolbarProps<TData>) {
  const t = useTranslations();
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEditQuery(playlist?.id);
  const { user } = useAuth();
  const { openModal } = useModal();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse items-end lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder={upperFirst(t('pages.playlist.search.placeholder'))}
          value={
            (table.getColumn('item')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) => {
            table
              .getColumn('item')
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
            {upperFirst(t('common.messages.cancel'))}
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="w-full lg:w-fit flex items-center justify-between gap-2">
        <div className='flex items-center gap-2'>
          {user?.id !== playlist?.user_id ? (
            <PlaylistActionSave playlistId={playlist?.id!} />
          ) : null}
          <Button
          size={'icon'}
          variant={'action'}
          onClick={() => openModal(ModalShare, {
            title: playlist?.title,
            type: 'playlist',
            path: `/playlist/${playlist?.id}`,
          })}
          >
            <Icons.share />
            <span className='sr-only'>{upperFirst(t('common.messages.share'))}</span>
          </Button>
        </div>
        <div className="w-fit flex items-center gap-2">
          {isAllowedToEdit ? <Button
          variant="outline"
          size="sm"
          className='ml-auto h-8 group overflow-hidden gap-0'
          onClick={() => openModal(ModalPlaylistQuickAdd, { playlist: playlist })}
          >
            <Icons.add className='h-4 w-4 mr-0 group-hover:mr-2 transition-all duration-300' />
            <span className='group-hover:w-20 w-0 group-hover:opacity-100 opacity-0 transition-all duration-500'>
            {upperFirst(t('common.messages.quick_add'))}
            </span>
          </Button> : null}
          <DataTableSortOptions table={table} />
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
