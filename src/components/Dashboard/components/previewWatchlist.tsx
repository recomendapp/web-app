"use client"
import MovieCard from "@/components/Film/Card/MovieCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { supabase } from "@/lib/supabase/supabase";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreviewWatchlist() {
    const { user } = useAuth();
    const [ watchlist, setWatchlist ] = useState<any[]>();

    useEffect(() => {
        const getWatchlist = async () => {
            const { data } = await supabase.from('user_movie_watchlist').select('*, user(*)').eq('user_id', user?.id);
            data?.length && setWatchlist(data);
        }

        user && getWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    console.log('wqtchlist', watchlist)

    return (
        <div className=" flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <Link href={'/collection/watchlist'}>
                    <h3 className="font-semibold text-xl">Film à voir</h3>
                </Link>
                <Button variant={'link'} asChild>
                    <Link href={'/collection/watchlist'}>
                        Tout afficher
                    </Link>
                </Button>
                
            </div>
            <ScrollArea>
                <div className="flex space-x-4 @pb-4">
                    {watchlist?.map((film: any) => (
                        <div key={film.film_id} className=" w-36">
                            <MovieCard
                                filmId={film.film_id}
                                displayMode="grid"
                                movieActivity={film}
                            />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}