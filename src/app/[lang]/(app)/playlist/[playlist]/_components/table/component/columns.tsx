'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import { ConvertHoursMinutes } from '@/lib/utils';
import { Clock } from 'lucide-react';
import MovieCardSmall from '@/components/Movie/MovieCardSmall';
import { DataComment } from './data-table-comment';
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';
import { PlaylistItem } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

export const columns = (): ColumnDef<PlaylistItem>[] => {
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
      id: 'movie',
      accessorFn: (row) => row?.movie?.title,
      meta: {
        displayName: upperFirst(common('word.film', { count: 1 })),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={upperFirst(common('word.film', { count: 1 }))} />
      ),
      cell: ({ row }) => <MovieCardSmall movie={row.original?.movie} />,
      enableHiding: false,
    },
    {
      id: 'release_date',
      accessorFn: (row) => row?.movie?.release_date,
      meta: {
        displayName: upperFirst(common('word.date')),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={upperFirst(common('word.date'))} />
      ),
      cell: ({ row }) => (
        <DateOnlyYearTooltip date={row.original?.movie?.release_date} className='text-muted-foreground'/>
      ),
    },
    {
      id: 'runtime',
      accessorFn: (row) => row?.movie?.runtime,
      meta: {
        displayName: upperFirst(common('word.duration')),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} Icon={Clock} />
      ),
      cell: ({ row }) => (
        <RuntimeTooltip runtime={row.original?.movie?.runtime ?? 0} className='text-muted-foreground'/>
      ),
    },
    {
      accessorKey: 'comment',
      meta: {
        displayName: upperFirst(common('word.comment', {count: 1})),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={upperFirst(common('word.comment', {count: 1}))} />
      ),
      cell: ({ row }) => <DataComment playlistItem={row.original} />,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions data={row.original} />,
    },
  ];
}
