"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Models } from "appwrite"
import { DateOnlyYearTooltip } from "@/components/utils/Date"
import Link from "next/link"
import { ConvertHoursMinutes } from "@/lib/utils"
import UserCard from "@/components/User/UserCard/UserCard"
import MoviePoster from "@/components/Film/MoviePoster"
import { Clock } from "lucide-react"
import MovieCardSmall from "@/components/Film/MovieCardSmall"

export const columns: ColumnDef<any>[] = [
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
    cell: ({ row }) => <DateOnlyYearTooltip date={row.original.item.film.release_date} />,
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
    id: "actions",
    cell: ({ row, table, column }) => <DataTableRowActions data={row.original.item} table={table} row={row} column={column} />,
  },
]

