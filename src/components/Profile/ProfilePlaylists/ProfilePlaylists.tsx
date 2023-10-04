"use client"

import MoviePlaylistCard from "@/components/Playlist/MoviePlaylist/MoviePlaylistCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import USER_PLAYLISTS_QUERY from "@/components/User/UserPlaylists/queries/userPlaylistsQuery";
import { User } from "@/types/type.user";
import { Playlist } from "@/types/type.playlist";

interface UserPlaylistsProps {
    profile: User;
    horizontal?: boolean;
    limit?: boolean;
}

export default function ProfilePlaylists({
    profile,
    horizontal = false,
    limit,
} : UserPlaylistsProps) {

    const [ order, setOrder ] = useState("recent");

    const { ref, inView } = useInView();

    const numberOfResult = 8;

    const { data: userPlaylistsQuery, loading, error, fetchMore, networkStatus } = useQuery(USER_PLAYLISTS_QUERY, {
        variables: {
            user_id: profile.id,
            order: order == 'recent' ? { "updated_at": "DescNullsFirst"} : { "likes_count": "DescNullsLast"},
            first: numberOfResult,
        },
        skip: !profile
    })
    const playlists: [ { playlist: Playlist }] = userPlaylistsQuery?.playlistCollection?.edges;
    const pageInfo: { hasNextPage: boolean, endCursor: string,} = userPlaylistsQuery?.playlistCollection?.pageInfo;

    useEffect(() => {
        if (inView && pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    user_id: profile.id,
                    order: order == 'recent' ? { "updated_at": "DescNullsFirst"} : { "likes_count": "DescNullsLast"},
                    first: numberOfResult,
                    after: pageInfo?.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      playlistCollection: {
                        edges: [
                            ...previousResult.playlistCollection.edges,
                            ...fetchMoreResult.playlistCollection.edges,
                        ],
                        pageInfo: fetchMoreResult.playlistCollection.pageInfo
                      }
                    };
                  }
            });
        }
    }, [inView, pageInfo])

    if (!playlists?.length)
        return (null)

    if (horizontal)
        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4 items-center">
                    <Link href={`/@${profile?.username}/playlists`}>
                        <h3 className="font-semibold text-xl text-accent-1">Playlists</h3>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant={'link'} asChild>
                            <Link href={`/@${profile?.username}/playlists`}>
                                Tout afficher
                            </Link>
                        </Button>
                        <Select onValueChange={setOrder} defaultValue={order}>
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
                        {playlists.map(({ playlist } : { playlist: Playlist}) => (
                            <MoviePlaylistCard key={playlist.id} playlist={playlist} className={'w-48'}/>
                        ))}
                        {/* {playlists?.pages.map((page, i) => (
                            <Fragment key={i}>
                                {page?.map((playlist: Models.Document) => (
                                    <MoviePlaylistCard key={playlist.id} playlist={playlist} className={'w-48'}/>
                                ))}
                            </Fragment>
                        ))} */}
                        {/* {hasNextPage && 
                            <div className="w-24 flex items-center justify-center">
                                <Button variant={'ghost'} size={'icon'} className="rounded-full" asChild>
                                    <Link href={`/@${profile?.username}/playlists`}>
                                        <Plus />
                                    </Link>
                                </Button>
                            </div>
                        } */}
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
                <Select onValueChange={setOrder} defaultValue={order}>
                    <SelectTrigger className="w-fit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value={"recent"}>Récents</SelectItem>
                        <SelectItem value={"popular"}>Populaires</SelectItem>
                    </SelectContent>
                </Select>
                
            </div>
            {playlists ? <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
                {playlists.map(({ playlist } : { playlist: Playlist}, index) => (
                    <div key={playlist.id} ref={index === playlists.length - 1 ? ref : undefined}>
                        <MoviePlaylistCard playlist={playlist} className={'w-full'} />
                    </div>
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