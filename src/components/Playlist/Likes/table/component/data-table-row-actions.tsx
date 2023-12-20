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
} from "@/components/ui/dialog"

// ICONS
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"
import ButtonShare from "@/components/utils/ButtonShare"
import { Film, FilmLike } from "@/types/type.film"
import { useMutation } from "@apollo/client"
import { useAuth } from "@/context/AuthContext/auth-context"

import DELETE_FILM_LIKE_MUTATION from '@/components/Film/FilmAction/mutations/updateUserMovieActivityMutation';
import USER_MOVIE_ACTIVITY_QUERY from '@/components/Film/FilmAction/queries/userMovieActivityQuery'

interface DataTableRowActionsProps {
  table: Table<FilmLike>,
  row: Row<FilmLike>,
  column: Column<FilmLike, unknown>,
  data: FilmLike,
}

export function DataTableRowActions({
  row,
  table,
  column,
  data
}: DataTableRowActionsProps) {

  const { user } = useAuth();
  const [ openShowDirectors, setOpenShowDirectors ] = useState(false);
  const [ deleteFilmLikeMutation, { error: errorDeleteFilmLike } ] = useMutation(DELETE_FILM_LIKE_MUTATION, {
    update: (cache, { data }) => {
			const filmLikesData = cache.readQuery<any>({
				query: USER_MOVIE_ACTIVITY_QUERY,
        variables: {
          filter: {
            user_id: { eq: user?.id },
            is_liked: { eq: true }
          },
          orderBy: {
            created_at: "DescNullsLast",
          }
        },
			});
			cache.writeQuery({
				query: USER_MOVIE_ACTIVITY_QUERY,
        variables: {
          filter: {
            user_id: { eq: user?.id },
            is_liked: { eq: true }
          },
          orderBy: {
            created_at: "DescNullsLast",
          }
        },
        data: {
          user_movie_activityCollection: {
            edges: filmLikesData!.user_movie_activityCollection.edges.filter((edge: any) =>
                    edge.node.film_id != data?.updateuser_movie_activityCollection?.records[0]?.film_id
                  )
          },
        },
			});
		},
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
              const { errors } = await deleteFilmLikeMutation({
                variables: {
                  filter: {
                    user_id: { eq: user?.id },
                    film_id: { eq: data.film_id },
                  },
                  set: {
                    is_liked: false
                  }
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