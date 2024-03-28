'use client';

import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@apollo/client';

// GRAPHQL
import { GetPlaylistsByUserIdQuery } from '@/graphql/__generated__/graphql';
import GET_PLAYLISTS_BY_USER_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistsByUserId';
import { useInfiniteQuery } from '@tanstack/react-query';
import { User } from '@/types/type.db';
import { supabase } from '@/lib/supabase/client';

interface UserPlaylistsProps {
  profile: User;
}

export default function ProfilePlaylists({ profile }: UserPlaylistsProps) {

  const [selectedOrder, setSelectedOrder] = useState('date-desc');

  const [order, setOrder] = useState('updated_at-desc');

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', profile?.id, 'playlist', { order: order}],
    queryFn: async ({ pageParam = 1 }) => {
      if (!profile?.id) throw Error('Missing profile id');
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('playlist')
        .select(`*`)
        .eq('user_id', profile?.id)
        .range(from, to)
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!profile?.id,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, playlists, fetchNextPage]);

  const changeOrder = (orderSelected: string) => {
    // if (orderSelected === 'date-desc')
    //   setOrder([{ updated_at: 'DescNullsFirst' }]);
    // else if (orderSelected === 'date-asc')
    //   setOrder([{ updated_at: 'AscNullsLast' }]);
    // else if (orderSelected === 'popular-desc')
    //   setOrder([{ likes_count: 'DescNullsFirst' }]);
    // else if (orderSelected === 'popular-asc')
    //   setOrder([{ likes_count: 'AscNullsLast' }]);
    // setSelectedOrder(orderSelected);
  }

  if (playlists == undefined) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="font-semibold text-xl">Playlists</h3>
        <Select onValueChange={changeOrder} defaultValue={selectedOrder}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              <SelectLabel>Date</SelectLabel>
              <SelectItem value={'date-desc'}>Plus récentes</SelectItem>
              <SelectItem value={'date-asc'}>Plus anciennes</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Popularité</SelectLabel>
              <SelectItem value={'popular-desc'}>Plus populaires</SelectItem>
              <SelectItem value={'popular-asc'}>Plus méconnus</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {playlists?.pages[0].length > 0 ? (
        <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8">
          {playlists?.pages.map((page, i) => (
            page?.map((playlist, index) => (
              <div
                key={playlist.id}
                ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
              >
                <MoviePlaylistCard playlist={playlist} className={'w-full'} />
              </div>
            ))
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold">Aucune playlist</p>
      )}
    </div>
  );
}
