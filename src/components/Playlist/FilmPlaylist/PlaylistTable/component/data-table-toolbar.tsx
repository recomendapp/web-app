"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/modules/MovieGuidelist/table/component/data-table-view-options"
import { DataTableSortOptions } from "./data-table-sort-options"
import { Edit } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext/auth-context"
import { Playlist } from "@/types/type.playlist"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  playlist: Playlist;
}

export function DataTableToolbar<TData>({
  table,
  playlist
}: DataTableToolbarProps<TData>) {
  const { user } = useAuth();
  console.log(playlist);
  const pathname = usePathname();
  const isFiltered = table.getState().columnFilters.length > 0

  const hasRightToEdit = () => {
    if (user?.id == playlist.user_id) {
      return true;
    }
    return false;
  }
  return (
    <div className="flex flex-col-reverse items-end lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-1 items-center gap-2 w-full">
        <Input
          placeholder={"Rechercher dans la playlist..."}
          value={(table.getColumn("item_film.title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("item_film.title")?.setFilterValue(event.target.value, )
          }}
          className="h-8 w-full lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Annuler
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="w-fit flex gap-2">
        {hasRightToEdit() && <Button
          variant="outline"
          size="sm"
          className="flex h-8"
          asChild
        >
          <Link href={`${pathname}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Éditer
          </Link>
        </Button>}
        <DataTableSortOptions table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
