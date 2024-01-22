'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import { ConvertHoursMinutes } from '@/lib/utils';
import { Clock } from 'lucide-react';
import MovieCardSmall from '@/components/Movie/MovieCardSmall';
import { UserMovieWatchlistFragment } from '@/graphql/__generated__/graphql';

export const columns: ColumnDef<{ node: UserMovieWatchlistFragment }>[] = [
  {
    id: 'movie',
    accessorFn: (row) => row.node.movie.data?.edges[0].node.title,
    meta: {
      displayName: 'Film',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Film" />
    ),
    cell: ({ row }) => <MovieCardSmall movie={row.original.node.movie} />,
    enableHiding: false,
  },
  {
    id: 'release_date',
    accessorFn: (row) => row.node.movie.release_date,
    meta: {
      displayName: 'Date',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <DateOnlyYearTooltip date={row.original.node.movie.release_date} />
    ),
  },
  {
    id: 'runtime',
    accessorFn: (row) => row.node.movie.runtime,
    meta: {
      displayName: 'Durée',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} Icon={Clock} />
    ),
    cell: ({ row }) => (
      <p>{ConvertHoursMinutes(row.original.node.movie.runtime)}</p>
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
