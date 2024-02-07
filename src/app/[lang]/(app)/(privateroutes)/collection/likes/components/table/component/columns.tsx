'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import { Clock } from 'lucide-react';
import MovieCardSmall from '@/components/Movie/MovieCardSmall';
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';
import { UserMovieActivity } from '@/types/type.db';

export const columns: ColumnDef<UserMovieActivity>[] = [
  {
    id: 'movie',
    accessorFn: (row) => row?.movie?.data[0].title,
    meta: {
      displayName: 'Film',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Film" />
    ),
    cell: ({ row }) => <MovieCardSmall movie={row.original?.movie} />,
    enableHiding: false,
  },
  {
    id: 'release_date',
    accessorFn: (row) => row?.movie?.release_date,
    meta: {
      displayName: 'Date',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <DateOnlyYearTooltip date={row.original?.movie?.release_date} className='text-muted-foreground'/>
    ),
  },
  {
    id: 'runtime',
    accessorFn: (row) => row?.movie?.runtime,
    meta: {
      displayName: 'Durée',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} Icon={Clock} />
    ),
    cell: ({ row }) => (
      <RuntimeTooltip runtime={row.original?.movie?.runtime ?? 0} className='text-muted-foreground'/>
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
