'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DataComment } from './data-table-comment';
import { PlaylistItem } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { capitalize, upperFirst } from 'lodash';
import { Item } from './data-table-item';
import { BadgeMedia } from '@/components/Badge/BadgeMedia';

export const Columns = (): ColumnDef<PlaylistItem>[] => {
  const common = useTranslations('common');
  return [
    {
      id: 'rank',
      accessorFn: (row) => row?.rank,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#"/>
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground text-center w-fit font-bold">
          {Number(row.id) + 1}
        </div>
      ),
      enableHiding: false,
      enableResizing: false,
      size: 4,
      maxSize: 10,
      minSize: 10,
    
    },
    {
      id: 'item',
      accessorFn: (row) => row?.media?.title,
      meta: {
        displayName: capitalize(common('messages.item', { count: 1 })),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={capitalize(common('messages.item', { count: 1 }))} />
      ),
      cell: ({ row }) => <Item key={row.index} media={row.original?.media!} />,
      enableHiding: false,
    },
    // {
    //   id: 'release_date',
    //   accessorFn: (row) => row?.movie?.release_date,
    //   meta: {
    //     displayName: upperFirst(common('messages.date')),
    //   },
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title={upperFirst(common('messages.date'))} />
    //   ),
    //   cell: ({ row }) => (
    //     <DateOnlyYearTooltip date={row.original?.movie?.release_date} className='text-muted-foreground'/>
    //   ),
    // },
    // {
    //   id: 'runtime',
    //   accessorFn: (row) => row?.movie?.runtime,
    //   meta: {
    //     displayName: upperFirst(common('messages.duration')),
    //   },
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} Icon={Clock} />
    //   ),
    //   cell: ({ row }) => (
    //     <RuntimeTooltip runtime={row.original?.movie?.runtime ?? 0} className='text-muted-foreground'/>
    //   ),
    // },
    {
      accessorKey: 'comment',
      meta: {
        displayName: upperFirst(common('messages.comment', {count: 1})),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={upperFirst(common('messages.comment', {count: 1}))} />
      ),
      cell: ({ row }) => <DataComment playlistItem={row.original} />,
      enableSorting: false,
    },
    {
      id: 'type',
      accessorFn: (row) => row?.media?.media_type,
      meta: {
        displayName: capitalize(common('messages.type')),
      },
      header: ({ column }) => (
        <DataTableColumnHeader
        column={column}
        title={capitalize(common('messages.type'))}
        />
      ),
      cell: ({ row }) => (
        <BadgeMedia type={row.original?.media?.media_type} />
      ),
    },
    {
      id: 'actions',
      cell: ({ row, table, column }) => (
        <DataTableRowActions
          data={row.original}
          table={table}
          row={row}
          column={column}
        />
      ),
    },
  ];
}
