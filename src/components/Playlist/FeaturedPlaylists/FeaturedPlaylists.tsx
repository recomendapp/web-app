"use client"

import { supabase } from "@/lib/supabase/client";
import { useInfiniteQuery, useQuery } from "react-query";
import MoviePlaylistCard from "../FilmPlaylist/MoviePlaylistCard";
import { Playlist } from "@/types/type.playlist";

export default function FeaturedPlaylists() {
  const numberOfResult = 10;
  const {
    data: featuredPlaylists,
    isLoading: loading,
    // fetchNextPage,
    // isFetchingNextPage,
    // hasNextPage,
  } = useQuery({
    queryKey: ['search', 'featuredPlaylists'],
    queryFn: async ({pageParam = 1}) => 
      await supabase.from('playlist')
        .select('*')
        .eq('featured', 'true')
        .order('updated_at', { ascending: false })
        .limit(numberOfResult),
      
      // (query, user?.language, pageParam),
    // getNextPageParam: (results, pages) => {
    //     return results?.length == numberOfResult ? pages.length + 1 : undefined  
    // },
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {featuredPlaylists?.data && featuredPlaylists?.data.map((playlist: Playlist) => (
        <MoviePlaylistCard key={playlist.id} playlist={playlist}/>
      ))}
    </div>
  );
}
