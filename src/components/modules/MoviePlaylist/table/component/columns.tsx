"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Models } from "appwrite"
import { DateOnlyYearTooltip } from "@/components/elements/Date/Date"
import { ConvertHoursMinutes } from "@/lib/utils/utils"
import { Clock } from "lucide-react"
import MovieCardSmall from "@/components/elements/Movie/MovieCardSmall"
import { DataComment } from "./data-table-comment"

export const columns: ColumnDef<Models.Document>[] = [
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
    accessorKey: "title",
    meta: {
      displayName: "Film"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Film" />
    ),
    cell: ({ row }) => <MovieCardSmall movie={row.original}/>,
    enableHiding: false,
  },
  {
    accessorKey: "release_date",
    meta: {
      displayName: "Date"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date"/>
    ),
    cell: ({ row }) => <div><DateOnlyYearTooltip date={row.original.release_date} /> </div>,
  },
  {
    accessorKey: "runtime",
    meta: {
      displayName: "Durée"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} Icon={Clock} />
    ),
    cell: ({ row }) => <p>{ConvertHoursMinutes(row.original.runtime)}</p>
  },
  {
    accessorKey: "comment",
    meta: {
      displayName: "Commentaire"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commentaire"/>
    ),
    cell: ({ row, table, column }) => <DataComment data={row.original} table={table} row={row} column={column}/>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row, table, column }) => <DataTableRowActions table={table} row={row} column={column} />,
  },
]

