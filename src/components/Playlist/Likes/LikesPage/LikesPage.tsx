"use client"

import { useQuery } from "@apollo/client";
import { TableLikes } from "../table/TableLikes";
import { LikesHeader } from "./components/LikesHeader";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { Guidelist } from "@/types/type.guidelist";
import { useEffect, useState } from "react";

import LIKES_QUERY from '@/components/Playlist/Likes/queries/likesQuery'
import { getMovieDetails } from "@/lib/tmdb";
import { FilmAction } from "@/types/type.film";

export function LikesPage() {
    const { user } = useAuth();

    const [ likesItem, setLikesItem ] = useState<{item: FilmAction}[]>();


    const { data: likesQuery, loading, error } = useQuery(LIKES_QUERY, {
        variables: {
            user_id: user?.id
        },
        skip: !user
    });
    const likes: [ { item: FilmAction } ] = likesQuery?.film_actionCollection?.edges;

    useEffect(() => {
        const fetchData = async () => {
          if (likes) {
            const updatedGuidelistItems = await Promise.all(likes?.map(async (item, index) => {
              const option = { ...item }
              if (item.item.film_id) {
                const film = await getMovieDetails(item.item.film_id, 'fr');
                option.item = { ...item.item, film };
              }
              return option;
            }));
            setLikesItem(updatedGuidelistItems);
          }
        };
      
        fetchData();
      }, [likes])

    return (
        <main className="h-full">
            <LikesHeader data={likesItem} />
            <div className='p-4'>
                {likesItem && <TableLikes data={likesItem} />}
            </div>
        </main>
    )
}