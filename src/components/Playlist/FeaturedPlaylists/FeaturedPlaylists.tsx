'use client';

import MoviePlaylistCard from '../FilmPlaylist/MoviePlaylistCard';
import { useInView } from 'react-intersection-observer';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';


export default function FeaturedPlaylists() {
  const supabase = useSupabaseClient();

  const [selectedOrder, setSelectedOrder] = useState('date-desc');

  const [order, setOrder] = useState<any>('updated_at');

  const { ref, inView } = useInView();

  const numberOfResult = 20;


  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['featured_playlist', { order: order}],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('playlist')
        .select(`*, user(*)`)
        .eq('featured', true)
        .range(from, to)
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    }
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, playlists, fetchNextPage]);


  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {playlists?.pages.map((page, i) => (
        page?.map((playlist, index) => (
          <div
            key={playlist.id}
            ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
          >
            <MoviePlaylistCard playlist={playlist}/>
          </div>
         ))
      ))}
    </div>
  );
}
