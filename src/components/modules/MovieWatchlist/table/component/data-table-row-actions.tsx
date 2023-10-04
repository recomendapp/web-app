"use client"

import { Models } from "appwrite"
import Link from "next/link"
import { Row } from "@tanstack/react-table"

// UI
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useQueryClient } from "react-query"

// ICONS
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"
import ButtonShare from "@/components/tools/ButtonShare"
import UserCard from "@/components/User/UserCard/UserCard"
import { MovieAction } from "@/components/Film/FilmAction/MovieAction"

interface DataTableRowActionsProps {
  row: Row<Models.Document>
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps) {

  const [ openShowDirectors, setOpenShowDirectors ] = useState(false);
  const queryClient = useQueryClient();

  const data = row.original;

  return (
    <>
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-end">
          <div className="hidden lg:invisible lg:group-hover:visible lg:flex items-center gap-2">
            <MovieAction filmId={data.id} rating like />
          </div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild><Link href={`/movie/${data.id}`}>Voir le film</Link></DropdownMenuItem>
          <ShowDirectorsButton data={data} setOpen={setOpenShowDirectors} />
          <DropdownMenuSeparator />
          <DropdownMenuItem><ButtonShare url={`${process.env.NEXT_PUBLIC_URL}/movie/${data.id}`}/></DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            // handleUnwatchlist(data.$id, data.id, queryClient)
            const watchlist = queryClient.getQueryData(['collection', 'watchlist']) as Models.Document;
            watchlist && queryClient.setQueryData(['collection', 'watchlist'], watchlist.filter((movie: any) => movie.movieId != data.id))
          }}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal data={data} open={openShowDirectors} setOpen={setOpenShowDirectors}/>
    </>
  )
}

export function ShowDirectorsButton({ data, setOpen } : { data: any, setOpen: Dispatch<SetStateAction<boolean>> }) {
  if (!data.directors){
    return (
      <DropdownMenuItem asChild>
        <p>Unknow</p>
      </DropdownMenuItem>
    )
  }
  if (data.directors.length == 1) {
    return (
      <DropdownMenuItem asChild>
        <Link href={`/person/${data.directors[0].id}`}>Voir le réalisateur</Link>
      </DropdownMenuItem>
    )
  }
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      Voir les réalisateurs
    </DropdownMenuItem>
  )
}

export function ShowDirectorsModal({ data, open, setOpen } : { data: any, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl bg-black">
        <DialogHeader>
          <DialogTitle className='text-center'>Réalisateur</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {data.directors.map((director: any) => (
            <Button key={director.id} variant={'ghost'} asChild>
              <Link href={`/person/${director.id}`}>{director.name}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}