"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { DateOnlyYearTooltip } from "@/components/tools/Date"
import Link from "next/link"
import { ConvertHoursMinutes } from "@/lib/utils/utils"
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
    accessorKey: "comment",
    meta: {
      displayName: "Commentaire"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commentaire"/>
    ),
    cell: ({ row }) => <div className='max-w-[500px] text-justify italic line-clamp-5'>{row.original.item.comment}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "by.username",
    meta: {
      displayName: "Ajouté par"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ajouté par" className="justify-end hidden lg:block"/>
    ),
    cell: ({ row }) => <div className="flex justify-end lg:block"><UserCard user={row.original.item.sender_user} icon/></div>,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row, table, column }) => <DataTableRowActions data={row.original.item} table={table} row={row} column={column} />,
  },
]

