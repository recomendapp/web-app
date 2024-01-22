'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/Playlist/Guidelist/table/component/data-table-view-options';
import { DataTableSortOptions } from './data-table-sort-options';

// GRAPHQL
import { PlaylistFragment } from '@/graphql/__generated__/graphql';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  playlist: PlaylistFragment;
}

export function DataTableToolbar<TData>({
  table,
  playlist,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse items-end lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder={'Rechercher dans la playlist...'}
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
            Annuler
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="w-fit flex gap-2">
        <DataTableSortOptions table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
