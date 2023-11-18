"use client"

// import { useQuery } from "@apollo/client";
import { TableLikes } from "../table/TableLikes";
import { LikesHeader } from "./components/LikesHeader";
import { useAuth } from "@/context/AuthContext/auth-context";
import { Guidelist } from "@/types/type.guidelist";
import { useEffect, useState } from "react";

// import LIKES_QUERY from '@/components/Playlist/Likes/queries/likesQuery'
import { getMovieDetails } from "@/lib/tmdb/tmdb";
import { FilmLike } from "@/types/type.film";
import { useQuery } from "react-query";
import { supabase } from "@/lib/supabase/client";

export function LikesPage() {
    const { user } = useAuth();

    const [ likesItem, setLikesItem ] = useState<{item: FilmLike}[]>();

    const {
      data: likes,
      isLoading: loading,
      isError: error
    } = useQuery({
      queryKey: ['user', 'collection', 'likes'],
      queryFn: async () => {
        const { data } = await supabase
          .from('user_movie_activity')
          .select(`*, review(*)`)
          .eq('user_id', user?.id)
          .eq('is_liked', true)
        return (data)
      },
      enabled: user?.id !== undefined && user?.id !== null,
    });
    // const { data: likesQuery, loading, error } = useQuery(LIKES_QUERY, {
    //     variables: {
    //         user_id: user?.id
    //     },
    //     skip: !user
    // });
    // const likes: [ { item: FilmLike } ] = likesQuery?.like?.edges;

    useEffect(() => {
        const fetchData = async () => {
          if (likes) {
            const updatedGuidelistItems = await Promise.all(likes?.map(async (item, index) => {
              const option = { ...item }
              if (item.film_id) {
                const film = await getMovieDetails(item.film_id, 'fr');
                option.item = { ...item, film };
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