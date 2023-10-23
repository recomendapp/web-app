"use client"

import { useQuery } from "@apollo/client";
import { TableWatchlist } from "../table/TableWatchlist";
import { WatchlistHeader } from "./components/WatchlistHeader";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { Guidelist } from "@/types/type.guidelist";
import { useEffect, useState } from "react";

import WATCHLIST_QUERY from '@/components/modules/MovieWatchlist/queries/watchlistQuery'
import { getMovieDetails } from "@/lib/tmdb";
import { FilmAction } from "@/types/type.film";

export function WatchlistPage() {
    const { user } = useAuth();

    const [ watchlistItem, setWatchlistItem ] = useState<{item: FilmAction}[]>();


    const { data: watchlistQuery, loading, error } = useQuery(WATCHLIST_QUERY, {
        variables: {
            user_id: user?.id
        },
        skip: !user
    });
    const watchlist: [ { item: FilmAction } ] = watchlistQuery?.film_actionCollection?.edges;

    useEffect(() => {
        const fetchData = async () => {
          if (watchlist) {
            const updatedGuidelistItems = await Promise.all(watchlist?.map(async (item, index) => {
              const option = { ...item }
              if (item.item.film_id) {
                const film = await getMovieDetails(item.item.film_id, 'fr');
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