'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { UserActivity } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { capitalize } from 'lodash';
import { Item } from './data-table-item';
import { BadgeMedia } from '@/components/Badge/BadgeMedia';

export const Columns = (): ColumnDef<UserActivity>[] => {
  const common = useTranslations('common');
  return [
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
};
