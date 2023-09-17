"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Models } from "appwrite"
import { DateOnlyYearTooltip } from "@/components/elements/Date/Date"
import Link from "next/link"
import { ConvertHoursMinutes } from "@/lib/utils/utils"
import UserCard from "@/components/elements/UserCard/UserCard"
import MoviePoster from "@/components/elements/Movie/MoviePoster"
import { Clock } from "lucide-react"
import MovieCardSmall from "@/components/elements/Movie/MovieCardSmall"

export const columns: ColumnDef<Models.Document>[] = [
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

