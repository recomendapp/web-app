"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Models } from "appwrite"
import { DateOnlyYearTooltip } from "@/components/utils/date/Date"
import Link from "next/link"
import { ConvertHoursMinutes } from "@/lib/utils/utils"
import UserCard from "@/components/card/UserCard"
import MoviePoster from "@/components/movie/ui/MoviePoster"
import { Clock } from "lucide-react"
import MovieCardSmall from "@/components/card/movie/MovieCardSmall"
import { DataComment } from "./data-table-comment"

export const columns: ColumnDef<Models.Document>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    meta: {
      displayName: "Film"
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Film" />
    ),
    cell: ({ row }) => <MovieCardSmall movie={row.original}/>,
    // cell: ({ row }) => 
    //     <Link href={`/movie/${row.original.id}`} className="flex gap-2">
    //       <MoviePoster width={90} poster_path={row.original.poster_path} alt={row.original.title} />
    //       <span className=" max-w-[300px] truncate font-medium">
    //         {row.getValue("title")}
    //       </span>
    //       <span>
    //         salut
    //       </span>
    //     </Link>,
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
    // cell: ({ row }) => <div className='max-w-[500px] text-justify italic line-clamp-5'>{row.original.comment}</div>,
    enableSorting: false,
  },
  // {
  //   accessorKey: "by.username",
  //   meta: {
  //     displayName: "Ajouté par"
  //   },
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ajouté par" className="flex justify-end hidden lg:block"/>
  //   ),
  //   cell: ({ row }) => <div className="flex justify-end lg:block"><UserCard user={row.original.by} icon/></div>,
  //   enableHiding: false,
  //   // cell: ({ row }) => <div>{row.original.by.username}</div>
  // },
  {
    id: "actions",
    cell: ({ row, table, column }) => <DataTableRowActions table={table} row={row} column={column} />,
  },
]

