'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ArrowDownUp, ChevronDown, ChevronUp } from 'lucide-react';

interface DataTableSortOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableSortOptions<TData>({
  table,
}: DataTableSortOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto flex h-8 lg:hidden"
        >
          <ArrowDownUp className="mr-2 h-4 w-4" />
          Trier
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Trier par</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => table.resetSorting()}>
          Tri personnalisé
        </DropdownMenuItem>
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
                  asc: <ChevronUp className=" ml-2 h-4 w-4 text-accent-1" />,
                  desc: <ChevronDown className=" ml-2 h-4 w-4 text-accent-1" />,
                }[column.getIsSorted() as string] ?? null}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
