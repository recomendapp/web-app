'use client';

import MoviePlaylistCard from './FilmPlaylist/MoviePlaylistCard';
import { useInView } from 'react-intersection-observer';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';
import { usePlaylistFeaturedInfiniteQuery } from '@/features/client/playlist/playlistQueries';
import { CardPlaylist } from '@/components/Card/CardPlaylist';


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
  } = usePlaylistFeaturedInfiniteQuery()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, playlists, fetchNextPage]);


  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {playlists?.pages.map((page, i) => (
        page?.map(({playlist}, index) => (
          <div
            key={index}
            ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
          >
            <CardPlaylist playlist={playlist}/>
          </div>
         ))
      ))}
    </div>
  );
}
