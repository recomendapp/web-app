"use client"

import { TableLikes } from "../table/TableLikes";
import { LikesHeader } from "./components/LikesHeader";
import { useAuth } from "@/context/AuthContext/auth-context";
import { useEffect, useState } from "react";

import { getMovieDetails } from "@/lib/tmdb/tmdb";
import { FilmAction } from "@/types/type.film";
import { useLocale } from "next-intl";
import USER_MOVIE_ACTIVITY_QUERY from '@/components/Film/FilmAction/queries/userMovieActivityQuery'
import { useQuery } from "@apollo/client";

export function LikesPage() {
  const locale = useLocale();
    const { user } = useAuth();

    const [ likesItem, setLikesItem ] = useState<{node: FilmAction}[]>();

    const { data: likesQuery, loading, error } = useQuery(USER_MOVIE_ACTIVITY_QUERY, {
      variables: {
        filter: {
          user_id: { eq: user?.id },
          is_liked: { eq: true }
        },
        orderBy: {
          created_at: "DescNullsLast",
        }
      },
      skip: !user
    });
    const likes: [ { node: FilmAction } ] = likesQuery?.user_movie_activityCollection?.edges;

    useEffect(() => {
        const fetchData = async () => {
          if (likes) {
            const updatedGuidelistItems = await Promise.all(likes?.map(async (item, index) => {
              const option = { ...item }
              if (item.node.film_id) {
                const film = await getMovieDetails(item.node.film_id, locale);
                option.node = { ...item.node, film };
              }
              return option;
            }));
            setLikesItem(updatedGuidelistItems);
          }
        };
      
        fetchData();
      }, [locale, likes])

    return (
        <main className="h-full">
            <LikesHeader data={likesItem} />
            <div className='p-4'>
                {likesItem && <TableLikes data={likesItem} />}
            </div>
        </main>
    )
}