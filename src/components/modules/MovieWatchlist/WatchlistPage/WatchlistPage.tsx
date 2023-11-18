"use client"

import { useQuery } from "@apollo/client";
import { TableWatchlist } from "../table/TableWatchlist";
import { WatchlistHeader } from "./components/WatchlistHeader";
import { useAuth } from "@/context/AuthContext/auth-context";
import { Guidelist } from "@/types/type.guidelist";
import { useEffect, useState } from "react";

import WATCHLIST_QUERY from '@/components/modules/MovieWatchlist/queries/watchlistQuery'
import { getMovieDetails } from "@/lib/tmdb/tmdb";
import { FilmAction, FilmWatchlist } from "@/types/type.film";
import { useLocale } from "next-intl";

export function WatchlistPage() {
    const locale = useLocale();
    const { user } = useAuth();

    const [ watchlistItem, setWatchlistItem ] = useState<{ item: FilmWatchlist } []>();


    const { data: watchlistQuery, loading, error } = useQuery(WATCHLIST_QUERY, {
        variables: {
            user_id: user?.id
        },
        skip: !user
    });
    const watchlist: [ { item: FilmWatchlist } ] = watchlistQuery?.watchlist?.edges;

    useEffect(() => {
        const fetchData = async () => {
          if (watchlist) {
            const updatedGuidelistItems = await Promise.all(watchlist?.map(async (item, index) => {
              const option = { ...item }
              if (item.item.film_id) {
                const film = await getMovieDetails(item.item.film_id, locale);
                option.item = { ...item.item, film };
              }
              return option;
            }));
            setWatchlistItem(updatedGuidelistItems);
          }
        };
      
        fetchData();
      }, [watchlist])

    return (
        <main className="h-full">
            <WatchlistHeader data={watchlistItem} />
            <div className='p-4'>
                {watchlistItem && <TableWatchlist data={watchlistItem} />}
            </div>
        </main>
    )
}