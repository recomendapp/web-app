"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { DateOnlyYearTooltip } from "@/components/tools/Date"
import { ConvertHoursMinutes } from "@/lib/utils/utils"
import { Clock } from "lucide-react"
import MovieCardSmall from "@/components/Film/MovieCardSmall"
import { DataComment } from "./data-table-comment"

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="text-right">#</div>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-right font-bold cursor-grab">{Number(row.id) + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "item.film.title",
    meta: {
      displayName: "Film"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Film" />
    ),
    cell: ({ row }) => <MovieCardSmall movie={row.original.item.film}/>,
    enableHiding: false,
  },
  {
    accessorKey: "item.film.release_date",
    meta: {
      displayName: "Date"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date"/>
    ),
    cell: ({ row }) => <DateOnlyYearTooltip date={row.original.item.film.release_date} />
  },
  {
    accessorKey: "item.film.runtime",
    meta: {
      displayName: "Durée"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} Icon={Clock} />
    ),
    cell: ({ row }) => <p>{ConvertHoursMinutes(row.original.item.film?.runtime)}</p>
  },
  {
    accessorKey: "comment",
    meta: {
      displayName: "Commentaire"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commentaire"/>
    ),
    cell: ({ row, table, column }) => <DataComment data={row.original.item} table={table} row={row} column={column}/>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row, table, column }) => <DataTableRowActions data={row.original.item} table={table} row={row} column={column} />,
  },
]

