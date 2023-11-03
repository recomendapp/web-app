"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { supabase } from "@/lib/supabase/supabase";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreviewWatchlist() {
    const { user } = useAuth();
    const [ watchlist, setWatchlist ] = useState();

    useEffect(() => {
        const getWatchlist = async () => {
            const { data } = await supabase.from('watchlist').select('*').eq('user_id', user?.id)
            setWatchlist(watchlist);
        }

        user && getWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div>
            <Link href={'/collection/watchlist'}>Film à voir</Link>
            <ScrollArea className="@pb-4">
z
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}