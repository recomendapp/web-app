'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { capitalize } from 'lodash';

interface DataTableSortOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableSortOptions<TData>({
  table,
}: DataTableSortOptionsProps<TData>) {
  const common = useTranslations('common');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto flex h-8 lg:hidden"
        >
          <Filter className="mr-2 h-4 w-4" />
          {capitalize(common('word.sort'))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>{capitalize(common('messages.sort_by'))}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanSort()
          )
          .map((column) => {
            return (
              <DropdownMenuItem
                key={column.id}
                onClick={() => column.toggleSorting()}
              >
                {column.columnDef.meta?.displayName}
                {{
                  asc: <ChevronUp className=" ml-2 h-4 w-4 text-accent-yellow" />,
                  desc: <ChevronDown className=" ml-2 h-4 w-4 text-accent-yellow" />,
                }[column.getIsSorted() as string] ?? null}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
