"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
  
import { Dispatch, useState } from "react"
import { PlaylistForm } from "@/components/movie/playlist/PlaylistForm"


interface PlaylistButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    movieId?: number,
    playlist?: any,
    setPlaylist?: Dispatch<any>,
}

export function PlaylistButton({ children, userId, movieId, playlist, setPlaylist } : PlaylistButtonProps ) {
    const [ PlaylistModalIsOpen, setPlaylistModalIsOpen] = useState(false)

  return (
    <Dialog open={PlaylistModalIsOpen} onOpenChange={setPlaylistModalIsOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{playlist ? "Modifier les informations" : "Créer une playlist"}</DialogTitle>
            </DialogHeader>
            <PlaylistForm 
                success={() => {
                  setPlaylistModalIsOpen(false)
                }} 
                userId={userId} 
                movieId={movieId}
                playlist={playlist}
                setPlaylist={setPlaylist}
            />
        </DialogContent>
    </Dialog>
    
  )
}