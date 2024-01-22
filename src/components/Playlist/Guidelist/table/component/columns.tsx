'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import Link from 'next/link';
import { ConvertHoursMinutes } from '@/lib/utils';
import UserCard from '@/components/User/UserCard/UserCard';
import MoviePoster from '@/components/Movie/MoviePoster';
import { Clock } from 'lucide-react';
import MovieCardSmall from '@/components/Movie/MovieCardSmall';
import { UserMovieGuidelistFragment } from '@/graphql/__generated__/graphql';

export const columns: ColumnDef<{ node: UserMovieGuidelistFragment }>[] = [
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
    id: 'comment',
    accessorFn: (row) => row.node.comment,
    meta: {
      displayName: 'Commentaire',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commentaire" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] text-justify italic line-clamp-5">
        {row.original.node.comment}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'by',
    accessorFn: (row) => row.node.sender_user.username,
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
      <div className="flex justify-end lg:block">
        <UserCard user={row.original.node.sender_user} icon />
      </div>
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
