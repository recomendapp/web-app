"use client"

import { Models } from "appwrite"
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
import { useQueryClient } from "react-query"

// ICONS
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"
import ButtonShare from "@/components/tools/ButtonShare"
import UserCard from "@/components/User/UserCard/UserCard"
import { DataComment } from "./data-table-comment"
import { PlaylistItem } from "@/types/type.playlist"
import { useAuth } from "@/context/AuthContext/AuthProvider"
import { Film } from "@/types/type.film"
import { useMutation } from "@apollo/client"

import DELETE_PLAYLIST_ITEM_MUTATION from "@/components/modules/MoviePlaylist/mutations/deletePlaylistItemMutation"
import PLAYLIST_DETAILS_QUERY from '@/components/modules/MoviePlaylist/PlaylistDetails/queries/playlistDetailsQuery';
import USER_PLAYLISTS_QUERY from '@/components/User/UserPlaylists/queries/userPlaylistsQuery'

interface DataTableRowActionsProps {
  table: Table<PlaylistItem>,
  row: Row<PlaylistItem>,
  column: Column<PlaylistItem, unknown>,
  data: PlaylistItem,
}

export function DataTableRowActions({
  row,
  table,
  column,
  data
}: DataTableRowActionsProps) {

  const { user } = useAuth();
  const [ openShowDirectors, setOpenShowDirectors ] = useState(false);
  const [ openComment, setOpenComment ] = useState(false);

  const [deletePlaylistItemMutation] = useMutation(DELETE_PLAYLIST_ITEM_MUTATION, {
    refetchQueries: [
      {
        query: USER_PLAYLISTS_QUERY
      },
      {
        query: PLAYLIST_DETAILS_QUERY
      }
    ]
    // update: (cache, { data }) => { 
    //   console.log('dataMutation', data)
    //   // Lisez les données actuelles depuis le cache
    //   const { playlistCollection } = cache.readQuery<any>({
    //     query: PLAYLIST_DETAILS_QUERY,
    //     variables: {
    //       id: data.deleteFromplaylist_itemCollection.records[0].playlist_id,
    //     },
    //   });
  
    //   // Supprimez l'élément de playlist_item.edges en filtrant par ID
    //   if (playlistCollection && playlistCollection.edges.length > 0) {
    //     const updatedEdges = playlistCollection.edges[0].playlist.playlist_item.edges.filter(
    //       (edge: any) => edge.item.id !== data.deleteFromplaylist_itemCollection.records[0].id // Remplacez itemToDeleteId par l'ID de l'élément à supprimer
    //     );
    //       console.log('playlistCollection', playlistCollection)
    //     console.log('updatedEdges', updatedEdges)
  
    //     // Mettez à jour les données dans le cache avec la nouvelle liste d'edges
    //     cache.writeQuery({
    //       query: PLAYLIST_DETAILS_QUERY,
    //       variables: {
    //         id: data.playlist_id,
    //       },
    //       data: {
    //         playlistCollection: {
    //           ...playlistCollection,
    //           edges: [
    //             {
    //               ...playlistCollection.edges[0],
    //               playlist: {
    //                 ...playlistCollection.edges[0].playlist,
    //                 playlist_item: {
    //                   // ...playlistCollection.edges[0].playlist.playlist_item,
    //                   edges: updatedEdges,
    //                 },
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     });
    //   }
    // },
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
          <DropdownMenuItem asChild><Link href={`/film/${data.film.id}`}>Voir le film</Link></DropdownMenuItem>
          <ShowDirectorsButton film={data.film} setOpen={setOpenShowDirectors} />
          { data.user?.id == user?.id ? <DropdownMenuItem onClick={() => setOpenComment(true)}>{data.comment ? "Voir le commentaire" : "Ajouter un commentaire"}</DropdownMenuItem>
          : data.comment && <DropdownMenuItem onClick={() => setOpenComment(true)}>Voir le commentaire</DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem><ButtonShare url={`${process.env.NEXT_PUBLIC_URL}/film/${data.film?.id}`}/></DropdownMenuItem>
          {data.user?.id == user?.id && 
            <DropdownMenuItem onClick={async () => {
              await deletePlaylistItemMutation({
                variables: {
                  id: data.id
                }
              })
              await table.options.meta?.deleteItem(data);
              // await handleDeletePlaylistItemFromId(data.id, data.id, queryClient);
            }}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <ShowDirectorsModal film={data.film} open={openShowDirectors} setOpen={setOpenShowDirectors}/>
      <ShowCommentModal
        table={table}
        row={row}
        column={column}
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
  table,
  row,
  column,
  data,
  open,
  setOpen
} : {
  table: Table<PlaylistItem>,
  row: Row<PlaylistItem>,
  column: Column<PlaylistItem, unknown>,
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
            table={table}
            row={row}
            column={column}
            data={data}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}