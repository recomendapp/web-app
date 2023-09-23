"use client"

import MoviePlaylistCard from "@/components/elements/MoviePlaylist/MoviePlaylistCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Models } from "appwrite";
import { useInfiniteQuery } from "react-query";
import getPlaylistsFromUserId from "./queries/getPlaylistsFromUserId";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface UserPlaylistsProps {
    user: Models.Document;
    horizontal?: boolean;
    limit?: boolean;
}

export default function ProfilePlaylists({
    user,
    horizontal = false,
    limit,
} : UserPlaylistsProps) {

    const [ sort, setSort ] = useState("recent");

    const { ref, inView } = useInView();

    const numberOfResult = 10;

    const {
        data: playlists,
        isLoading,
        isIdle,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
      } = useInfiniteQuery({
        queryKey: ['user', user.$id, 'playlists', sort],
        queryFn: ({pageParam = 1}) => getPlaylistsFromUserId(user?.$id, pageParam, numberOfResult, sort),
        getNextPageParam: (results, pages) => {
            return results?.length == numberOfResult ? pages.length + 1 : undefined  
        },
        enabled: user?.$id !== undefined && user?.$id !== null,
    });

    useEffect(() => {
        if (inView && hasNextPage)
            fetchNextPage();
    }, [inView, hasNextPage])

    if (isLoading)
    {
        return (
            <div>Loading</div>
        )
    }

    if ((!playlists || !playlists?.pages[0]?.length) && horizontal)
        return (null)

    if (horizontal)
        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4 items-center">
                    <Link href={`/@${user?.username}/playlists`}>
                        <h3 className="font-semibold text-xl text-accent-1">Playlists</h3>
                    </Link>
                    <div className="flex gap-2">
                        {hasNextPage &&
                                <Button variant={'link'} asChild>
                                    <Link href={`/@${user?.username}/playlists`}>
                                        Tout afficher
                                    </Link>
                                </Button>
                        }
                        <Select onValueChange={setSort} defaultValue={sort}>
                            <SelectTrigger className="w-fit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectItem value={"recent"}>Récents</SelectItem>
                                <SelectItem value={"popular"}>Populaires</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                </div>
                <ScrollArea className="pb-4">
                    <div className="flex gap-4">
                        {playlists?.pages.map((page, i) => (
                            <Fragment key={i}>
                                {page?.map((playlist: Models.Document) => (
                                    <MoviePlaylistCard key={playlist.$id} playlist={playlist} className={'w-48'}/>
                                ))}
                            </Fragment>
                        ))}
                        {hasNextPage && 
                            <div className="w-24 flex items-center justify-center">
                                <Button variant={'ghost'} size={'icon'} className="rounded-full" asChild>
                                    <Link href={`/@${user?.username}/playlists`}>
                                        <Plus />
                                    </Link>
                                </Button>
                            </div>
                        }
                        {/* {playlists.slice(0, numberOfResult).map((playlist: Models.Document) => (
                            <MoviePlaylistCard key={playlist.$id} playlist={playlist} className={'w-48'}/>
                        ))} */}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        )

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <h3 className="font-semibold text-xl text-accent-1">Playlists</h3>
                <Select onValueChange={setSort} defaultValue={sort}>
                    <SelectTrigger className="w-fit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value={"recent"}>Récents</SelectItem>
                        <SelectItem value={"popular"}>Populaires</SelectItem>
                    </SelectContent>
                </Select>
                
            </div>
            {playlists?.pages[0]?.length ? <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
                {playlists?.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page?.map((playlist: Models.Document) => (
                            <div key={playlist.$id} ref={ref}>
                                <MoviePlaylistCard key={playlist.$id} playlist={playlist} className={'w-full'} />
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
            :
                <div className="w-full italic text-center">
                    Aucune playlist
                </div>
            }
        </div>
    )
}