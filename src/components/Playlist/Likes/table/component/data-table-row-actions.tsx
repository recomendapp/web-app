"use client"

import Link from "next/link"
import { Column, Row, Table } from "@tanstack/react-table"
import { MovieAction } from "@/components/Film/FilmAction/MovieAction"

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

// ICONS
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"
import ButtonShare from "@/components/tools/ButtonShare"
import UserCard from "@/components/User/UserCard/UserCard"
import { PlaylistItem } from "@/types/type.playlist"
import { Film, FilmAction } from "@/types/type.film"
import { useMutation } from "@apollo/client"
import { useAuth } from "@/context/AuthContext/AuthProvider"

import FILM_ACTION_QUERY from '@/components/Film/FilmAction/queries/filmActionQuery';
import DELETE_FILM_ACTION_MUTATION from '@/components/Film/FilmAction/mutations/deleteFilmActionMutation';
import UPDATE_FILM_ACTION_MUTATION from '@/components/Film/FilmAction/mutations/updateFilmActionMutation';
import LIKES_QUERY from "@/components/Playlist/Likes/queries/likesQuery"

interface DataTableRowActionsProps {
  table: Table<FilmAction>,
  row: Row<FilmAction>,
  column: Column<FilmAction, unknown>,
  data: FilmAction,
}

export function DataTableRowActions({
  row,
  table,
  column,
  data
}: DataTableRowActionsProps) {

  const { user } = useAuth();
  const [ openShowDirectors, setOpenShowDirectors ] = useState(false);
  const [ updateFilmActionMutation ] = useMutation(UPDATE_FILM_ACTION_MUTATION, {
    refetchQueries: [
      {
        query: LIKES_QUERY,
        variables: {
          user_id: user?.id
        },
      }
    ]
  });
  const [ deleteFilmActionMutation, { error: errorDeletingWatch } ] = useMutation(DELETE_FILM_ACTION_MUTATION, {
    update: (store) => {
      store.writeQuery({
        query: FILM_ACTION_QUERY,
        variables: {
          film_id: data.film_id,
          user_id: user?.id,
        },
        data: {
          film_actionCollection: {
            edges: []
          }
        }
      })
    },
    refetchQueries: [
      {
        query: LIKES_QUERY,
        variables: {
          user_id: user?.id
        },
      }
    ]
  });
  
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
          <DropdownMenuItem asChild><Link href={`/film/${data.film_id}`}>Voir le film</Link></DropdownMenuItem>
          <ShowDirectorsButton film={data.film} setOpen={setOpenShowDirectors} />
          <DropdownMenuSeparator />
          <DropdownMenuItem><ButtonShare url={`${location.origin}/film/${data.film?.id}`}/></DropdownMenuItem>
          <DropdownMenuItem 
            onClick={async () => {
              const mutationToUse = (!data.is_liked && !data.is_watched && !data.rating) ? deleteFilmActionMutation : updateFilmActionMutation;
              const { errors } = await mutationToUse({
                variables: {
                  film_id: data.film_id,
                  user_id: user?.id,
                  is_liked: false,
                }
              });
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal film={data.film} open={openShowDirectors} setOpen={setOpenShowDirectors}/>
    </>
  )
}

export function ShowDirectorsButton({ film, setOpen } : { film: Film, setOpen: Dispatch<SetStateAction<boolean>> }) {
  if (!film?.directors){
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