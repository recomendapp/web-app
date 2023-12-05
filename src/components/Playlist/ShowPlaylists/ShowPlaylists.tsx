'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext/auth-context';

import { Models } from 'appwrite';
import { Fragment, useEffect, useState } from 'react';
import { FileEdit } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import MovieReviewOverview from '@/components/Review/MovieReviewOverview';

import { Review } from '@/types/type.review';
import { useInfiniteQuery, useQuery } from 'react-query';
import { supabase } from '@/lib/supabase/client';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import MoviePlaylistCard from '../FilmPlaylist/MoviePlaylistCard';


export function ShowPlaylists({ filmId }: { filmId: string }) {

  const [ order, setOrder ] = useState("recent");

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: playlists,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    } = useInfiniteQuery({
    queryKey: ['film', filmId, 'playlists', order],
    queryFn: async ({ pageParam = 1 }) => {
        let from = (pageParam - 1) * numberOfResult;
        let to = from - 1 + numberOfResult;
        let column;
        let ascending;

        const [tablePart, orderPart] = order.split('-');

        if (tablePart == "popularity") {
            column = 'likes_count';
        } else {
            column = 'created_at';
        }

        if (orderPart === "desc")
            ascending = false;
        else
            ascending = true;

        const { data } = await supabase
            .from('playlist')
            .select('*, playlist_item!inner(*)')
            .eq('playlist_item.film_id', filmId)
            .range(from, to)
            .order(column, { ascending });

        return (data);
      },
      getNextPageParam: (data, pages) => {
          return data?.length == numberOfResult ? pages.length + 1 : undefined  
      },
  });

  useEffect(() => {
    if (inView && hasNextPage)
        fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage])

  if (loading)
    return <div>Loading</div>


  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className='flex flex-1 justify-end gap-2 items-center'>
        Trier par
        <Select onValueChange={setOrder} defaultValue={order}>
          <SelectTrigger className="w-fit">
            <SelectValue  placeholder="Langue" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
                <SelectItem value={"recent"}>Récentes</SelectItem>
                <SelectItem value={"popularity-desc"}>Popularité</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* PLAYLISTS */}
      {playlists?.pages[0]?.length ?
        <div className='grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8'>
          {playlists?.pages.map((page, i) => (
              <Fragment key={i}>
                  {page?.map((playlist: any, index) => (
                      <div key={playlist.id}
                          {...(i === playlists.pages.length - 1 && index === page.length - 1
                              ? { ref: ref }
                              : {})}
                      >
                          <MoviePlaylistCard key={playlist.id} playlist={playlist} />
                      </div>
                  ))}
              </Fragment>
          ))}
          {(loading || isFetchingNextPage) && <Loader />}
        </div>
      :
        <p className="text-center font-semibold">Aucune playlist.</p>
      } 
    </div>
  )
}