"use client"

import { ImageWithFallback } from "@/components/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/context/user";
import { Loader2 } from "lucide-react";
import { PlaylistButton } from "@/components/movie/playlist/PlaylistButton";
import { useState } from "react";

export default function PlaylistDetails({ playlistServer } : { playlistServer: any }) {

    const { user } = useUser()
    const [ playlist, setPlaylist ] = useState(playlistServer)

    if( !user ) {
        return(
            <Loader2 />
        )
    }

    if (!playlistServer.is_public && user.$id !== playlistServer.userId.$id) {
        return (
            <div>
                Cette playlist est privée !
            </div>
        )
    }

    return (
        <main className='h-full bg-red-500'>
            <div 
                className='bg-white'
                style={{
                    // backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
                    // backgroundSize: 'cover',
                    // backgroundRepeat: 'no-repeat',
                    height:"clamp(340px,30vh,400px)"
                }}
            >
                <div className='w-full h-full flex  p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75'>
                    <div className='flex gap-4 items-center'>
                    
                        {/* MOVIE POSTER */}
                        <div className="w-[200px] shadow-md">
                            <AspectRatio ratio={1/1}>
                                <ImageWithFallback 
                                    src={playlist.poster_path ? playlist.poster_path : ""} 
                                    alt={playlist.title}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>
                        {/* MOVIE MAIN DATA */}
                        <div className='flex flex-col gap-2'>
                            {/* TYPE */}
                            <div>
                                Playlist
                            </div>
                            {/* TITLE */}
                            {user.$id === playlist.userId.$id ? (
                                <PlaylistButton
                                    userId={user.$id}
                                    playlist={playlist}
                                    setPlaylist={setPlaylist}
                                
                                >
                                    <DialogTrigger asChild>
                                        <div className='text-xl lg:text-6xl font-bold'>
                                            <span>{playlist.title}</span>
                                        </div>
                                    </DialogTrigger>
                                </PlaylistButton>
                            ) : (
                                <div className='text-xl lg:text-6xl font-bold'>
                                    <span>{playlist.title}</span>
                                </div>
                            )}
                            {/* DATE / GENRES / RUNTIME */}
                            <div>
                                

                        
                                {/* RUNTIME */}
                                {/* <span className=" before:content-['_•_']">
                                    {convertDuration(movie.runtime)}
                                </span> */}
                            </div>
                            {/* REACTIONS */}
                            {/* <MovieAction movieId={movie.id} userId={user?.$id} />
                            <div>
                                COUNTER
                                <MovieActionCounter movie={movieDocumentID}/>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}