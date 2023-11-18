"use client"

import MoviePlaylistCard from "@/components/Playlist/FilmPlaylist/MoviePlaylistCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import USER_PLAYLISTS_QUERY from "@/components/User/UserPlaylists/queries/userPlaylistsQuery";
import { User } from "@/types/type.user";
import { Playlist } from "@/types/type.playlist";
import { useInfiniteQuery } from "react-query";
import { supabase } from "@/lib/supabase/supabase";

interface UserPlaylistsProps {
    profile: User;
}

export default function ProfilePlaylists({
    profile,
} : UserPlaylistsProps) {

    const [ order, setOrder ] = useState("date-desc");

    const { ref, inView } = useInView();

    const numberOfResult = 20;
  
    const {
        data: playlists,
        isLoading: loading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        } = useInfiniteQuery({
        queryKey: ['user', profile.id, 'playlists', order],
        queryFn: async ({ pageParam = 1 }) => {
            let from = (pageParam - 1) * numberOfResult;
            let to = from - 1 + numberOfResult;
            let column;
            let ascending;

            const [columnPart, orderPart] = order.split('-');

            if (columnPart === "date") {
                column = 'updated_at';
            } else {
                column = 'likes_count';
            }

            if (orderPart === "desc")
                ascending = false;
            else
                ascending = true;

            const { data } = await supabase
                .from('playlist')
                .select('*')
                .eq('user_id', profile.id)
                .range(from, to)
                .order(column, { ascending })

            return (data);
        },
        getNextPageParam: (data, pages) => {
            return data?.length == numberOfResult ? pages.length + 1 : undefined  
        },
    });
    
    useEffect(() => {
        if (inView && hasNextPage)
            fetchNextPage();
    }, [inView, hasNextPage])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <h3 className="font-semibold text-xl text-accent-1">Playlists</h3>
                <Select onValueChange={setOrder} defaultValue={order}>
                    <SelectTrigger className="w-fit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectGroup>
                            <SelectLabel>Date</SelectLabel>
                            <SelectItem value={"date-desc"}>Plus récentes</SelectItem>
                            <SelectItem value={"date-asc"}>Plus anciennes</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Popularité</SelectLabel>
                            <SelectItem value={"popular-desc"}>Plus populaires</SelectItem>
                            <SelectItem value={"popular-asc"}>Plus méconnus</SelectItem>
                        </SelectGroup>
                        
                    </SelectContent>
                </Select>
                
            </div>
            {playlists?.pages[0]?.length ?
                <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8">
                    {playlists?.pages.map((page, i) => (
                        <Fragment key={i}>
                            {page?.map((playlist: any, index) => (
                                <div key={playlist.id}
                                    {...(i === playlists.pages.length - 1 && index === page.length - 1
                                        ? { ref: ref }
                                        : {})}
                                >
                                    <MoviePlaylistCard playlist={playlist} className={'w-full'} />
                                </div>
                            ))}
                        </Fragment>
                    ))}
                </div>
            :
                <p className="text-center font-semibold">
                    Aucune playlist
                </p>
            }
        </div>
    )
}