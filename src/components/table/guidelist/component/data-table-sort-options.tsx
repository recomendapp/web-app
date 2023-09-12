"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter } from "lucide-react"

interface DataTableSortOptionsProps<TData> {
  table: Table<TData>
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
          <Filter className="mr-2 h-4 w-4" />
          Filtrer
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Colonnes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanSort()
          )
          .map((column) => {
            return (
              <DropdownMenuItem
                key={column.id}
                onClick={() => column.toggleSorting(false)}
              >
                {column.columnDef.meta?.displayName}
                {column.getIsSorted() === "asc" && (
                  <ChevronDown className=" ml-2 h-4 w-4 text-accent-1" />
                )}
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
