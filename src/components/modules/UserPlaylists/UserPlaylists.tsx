"use client"

import MoviePlaylistCard from "@/components/elements/MoviePlaylist/MoviePlaylistCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import handlePlaylists from "@/hooks/movie/playlist/handlePlaylists";
import { Models } from "appwrite";
import { useQuery } from "react-query";
import getPlaylistsFromUserId from "./_queries/getPlaylistsFromUserId";


export default function UserPlaylists({ userId } : { userId: string }) {
    const {
        data: playlists,
        isLoading,
        isError,
      } = useQuery({
        queryKey: ['user', userId, 'playlists'],
        queryFn: () => getPlaylistsFromUserId(userId),
        enabled: userId !== undefined && userId !== null,
    });

    if (isLoading)
    {
        return (
            <div>Loading</div>
        )
    }

    if (!playlists?.length)
        return (null)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <h3 className="font-semibold text-xl text-accent-1">Playlists</h3>
                <Button variant={'link'}>Récent</Button>
            </div>
            <ScrollArea>
                <div className="flex gap-4">
                    {playlists.map((playlist: Models.Document) => (
                        <MoviePlaylistCard key={playlist.$id} playlist={playlist} className={'w-48'}/>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}