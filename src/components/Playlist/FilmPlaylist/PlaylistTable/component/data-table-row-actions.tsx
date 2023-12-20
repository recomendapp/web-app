"use client"

import Link from "next/link"
import { MovieAction } from "@/components/Film/FilmAction/MovieAction"

// UI
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ICONS
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"
import ButtonShare from "@/components/utils/ButtonShare"
import UserCard from "@/components/User/UserCard/UserCard"
import { DataComment } from "./data-table-comment"
import { PlaylistItem } from "@/types/type.playlist"
import { Film } from "@/types/type.film"

interface DataTableRowActionsProps {
  data: PlaylistItem,
}

export function DataTableRowActions({
  data
}: DataTableRowActionsProps) {
  const [ openShowDirectors, setOpenShowDirectors ] = useState(false);
  const [ openComment, setOpenComment ] = useState(false);

  return (
    <>
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-end">
          <div className="hidden lg:invisible lg:group-hover:visible lg:flex items-center gap-2">
            <MovieAction filmId={data.film_id} rating like />
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
          <DropdownMenuItem asChild><Link href={`/film/${data.film.id}`}>Voir le film</Link></DropdownMenuItem>
          <ShowDirectorsButton film={data.film} setOpen={setOpenShowDirectors} />
          {data.comment && <DropdownMenuItem onClick={() => setOpenComment(true)}>Voir le commentaire</DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem><ButtonShare url={`${location.origin}/film/${data.film?.id}`}/></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal film={data.film} open={openShowDirectors} setOpen={setOpenShowDirectors}/>
      <ShowCommentModal
        data={data}
        open={openComment}
        setOpen={setOpenComment}
      />
    </>
  )
}

export function ShowDirectorsButton({ film, setOpen } : { film: Film, setOpen: Dispatch<SetStateAction<boolean>> }) {
  if (!film.directors){
    return (
      <DropdownMenuItem asChild>
        <p>Unknow</p>
      </DropdownMenuItem>
    )
  }
  if (film.directors.length == 1) {
    return (
      <DropdownMenuItem asChild>
        <Link href={`/person/${film.directors[0].id}`}>Voir le réalisateur</Link>
      </DropdownMenuItem>
    )
  }
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      Voir les réalisateurs
    </DropdownMenuItem>
  )
}

export function ShowDirectorsModal({ film, open, setOpen } : { film: Film, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl bg-black">
        <DialogHeader>
          <DialogTitle className='text-center'>Réalisateur</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {film.directors?.map((director: any) => (
            <Button key={director.id} variant={'ghost'} asChild>
              <Link href={`/person/${director.id}`}>{director.name}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ShowCommentModal({
  data,
  open,
  setOpen
} : {
  data: PlaylistItem,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl bg-black">
        <DialogHeader>
          <DialogTitle className='text-center'>Commentaire</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <UserCard user={data.user}/>
          <DataComment
            data={data}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}