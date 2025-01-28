'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import Senders from './data-table-senders';
import { UserRecosAggregated } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { capitalize } from 'lodash';
import { getMediaDetails } from '@/hooks/get-media-details';
import { Item } from './data-table-item';
import { BadgeMedia } from '@/components/badge/BadgeMedia';

export const Columns = (): ColumnDef<UserRecosAggregated>[] => {
  const common = useTranslations('common');
  return [
    {
      id: 'item',
      accessorFn: (row) => getMediaDetails(row.media).title,
      meta: {
        displayName: capitalize(common('messages.item', { count: 1 })),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={capitalize(common('messages.item', { count: 1 }))} />
      ),
      cell: ({ row }) => <Item key={row.index} media={row.original.media!} />,
      enableHiding: false,
    },
    // {
    //   id: 'release_date',
    //   accessorFn: (row) => row?.movie?.release_date,
    //   meta: {
    //     displayName: capitalize(common('word.date')),
    //   },
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title={capitalize(common('word.date'))} />
    //   ),
    //   cell: ({ row }) => (
    //     <DateOnlyYearTooltip date={row.original?.movie?.release_date} className='text-muted-foreground'/>
    //   ),
    // },
    // {
    //   id: 'runtime',
    //   accessorFn: (row) => row?.movie?.runtime,
    //   meta: {
    //     displayName: capitalize(common('word.duration')),
    //   },
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} Icon={Clock} />
    //   ),
    //   cell: ({ row }) => (
    //     <RuntimeTooltip runtime={row.original?.movie?.runtime ?? 0} className='text-muted-foreground'/>
    //   ),
    // },
    {
      id: 'by',
      accessorFn: (row) => row?.senders?.length,
      meta: {
        displayName: capitalize(common('messages.added_by')),
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={capitalize(common('messages.added_by'))}
          className="justify-end hidden lg:block"
        />
      ),
      cell: ({ row }) => (
        <Senders row={row} />
      ),
    },
    {
      id: 'type',
      accessorFn: (row) => row?.media_type,
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
        <BadgeMedia type={row?.original.media_type} />
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
