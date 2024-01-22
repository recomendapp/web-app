'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Models } from 'appwrite';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import Link from 'next/link';
import { ConvertHoursMinutes } from '@/lib/utils';
import UserCard from '@/components/User/UserCard/UserCard';
import MoviePoster from '@/components/Movie/MoviePoster';
import { Clock } from 'lucide-react';
import MovieCardSmall from '@/components/Movie/MovieCardSmall';
import { UserMovieActivityFragment } from '@/graphql/__generated__/graphql';

export const columns: ColumnDef<{ node: UserMovieActivityFragment }>[] = [
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
