'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import UserCard from '@/components/User/UserCard/UserCard';
import { Clock, Text } from 'lucide-react';
import MovieCardSmall from '@/components/Movie/MovieCardSmall';
import { UserMovieGuidelistFragment } from '@/graphql/__generated__/graphql';
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';
import UserAvatar from '@/components/User/UserAvatar/UserAvatar';
import Senders from './data-table-senders';
import { UserMovieGuidelistView } from '@/types/type.db';

const senderToShow = 5;

export const columns: ColumnDef<UserMovieGuidelistView>[] = [
  {
    id: 'movie',
    accessorFn: (row) => row?.movie?.title,
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
    id: 'by',
    accessorFn: (row) => row?.senders?.length,
    meta: {
      displayName: 'Ajouté par',
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ajouté par"
        className="justify-end hidden lg:block"
      />
    ),
    cell: ({ row }) => (
      <Senders row={row} />
    ),
    enableHiding: false,
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
