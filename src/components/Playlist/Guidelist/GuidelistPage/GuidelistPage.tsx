"use client"

import { useQuery } from "@apollo/client";
import { TableGuidelist } from "../table/TableGuidelist";
import { GuidelistHeader } from "./components/GuidelistHeader";
import { useAuth } from "@/context/AuthContext/auth-context";
import { Guidelist } from "@/types/type.guidelist";
import { useEffect, useState } from "react";

import GUIDELIST_QUERY from '@/components/Playlist/Guidelist/queries/guidelistQuery'
import { getMovieDetails } from "@/lib/tmdb/tmdb";

export function GuidelistPage() {
    const { user } = useAuth();

    const [ guidelistItem, setGuidelistItem ] = useState<{item: Guidelist}[]>();


    const { data: guidelistQuery, loading, error } = useQuery(GUIDELIST_QUERY, {
        variables: {
            user_id: user?.id
        },
        skip: !user
    });
    const guidelist: [ { item: Guidelist } ] = guidelistQuery?.guidelistCollection?.edges;

    useEffect(() => {
        const fetchData = async () => {
          if (guidelist) {
            const updatedGuidelistItems = await Promise.all(guidelist?.map(async (item, index) => {
              const option = { ...item }
              if (item.item.film_id) {
                const film = await getMovieDetails(item.item.film_id, 'fr');
                option.item = { ...item.item, film };
              }
              return option;
            }));
            setGuidelistItem(updatedGuidelistItems);
          }
        };
      
        fetchData();
      }, [guidelist])

    return (
        <main className="h-full">
            <GuidelistHeader data={guidelistItem} />
            <div className='p-4'>
                {guidelistItem && <TableGuidelist data={guidelistItem} />}
            </div>
        </main>
    )
}