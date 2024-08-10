'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import MovieCard from '@/components/Movie/Card/MovieCard';
import Loader from '@/components/Loader/Loader';
import { useInView } from 'react-intersection-observer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// GRAPHQL
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function ProfileFilms({
  userId
} : {
  userId: string,
}) {

  const locale = useLocale();

  const [selectedOrder, setSelectedOrder] = useState('watch-desc');

  const [order, setOrder] = useState<any>([{ date: 'DescNullsFirst' }]);

  const [displayMode, setDisplayMode] = useState<'grid' | 'row'>('grid');

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: activities,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', userId, 'activities', { order: 'updated_at-desc'}],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`
          *,
          user(*),
          review:user_movie_review(*),
          movie(
            *,
            directors:tmdb_movie_credits(
              *,
              person:tmdb_person(*)
            )
          )
        `)
        .eq('user_id', userId)
        .eq('movie.language', locale)
        .eq('movie.directors.job', 'Director')
        .range(from, to)
        .order('updated_at', { ascending: false});
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!userId && !!locale,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  const changeOrder = (orderSelected: string) => {
    if (orderSelected === 'watch-desc')
      setOrder([{ date: 'DescNullsFirst' }]);
    else if (orderSelected === 'watch-asc')
      setOrder([{ date: 'AscNullsLast' }]);
    else if (orderSelected === 'rating-desc')
      setOrder([{ rating: 'DescNullsFirst' }]);
    else if (orderSelected === 'rating-asc')
      setOrder([{ rating: 'AscNullsLast' }]);
    else if (orderSelected === 'like-desc')
      setOrder([{ created_at: 'DescNullsFirst' }]);
    else if (orderSelected === 'like-asc')
      setOrder([{ created_at: 'AscNullsLast' }]);
    setSelectedOrder(orderSelected);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="font-semibold text-xl">Films</h3>
        <div className="flex gap-2">
          <Select onValueChange={changeOrder} defaultValue={selectedOrder}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Vus</SelectLabel>
                <SelectItem value={'watch-desc'}>Plus récents</SelectItem>
                <SelectItem value={'watch-asc'}>Plus anciens</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Notes</SelectLabel>
                <SelectItem value={'rating-desc'}>
                  Notes décroissantes
                </SelectItem>
                <SelectItem value={'rating-asc'}>Notes croissantes</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Coups de coeur</SelectLabel>
                <SelectItem value={'like-desc'}>Plus récents</SelectItem>
                <SelectItem value={'like-asc'}>Plus anciens</SelectItem>
              </SelectGroup>
              {/* <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem> */}
            </SelectContent>
          </Select>
          <Button
            variant={'ghost'}
            onClick={() =>
              setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')
            }
          >
            {displayMode == 'grid' ? <LayoutGrid /> : <List />}
          </Button>
        </div>
      </div>
      {isLoading || activities == undefined ? (
        <div className="flex items-center h-full">
          <Loader />
        </div>
      ) : !isLoading && activities?.pages[0].length ? (
        <div
          className={` gap-2
              ${
                displayMode == 'row'
                  ? 'flex flex-col'
                  : 'grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 2xl:grid-cols-10'
              }
          `}
        >
          {activities.pages.map((page, i) => (
            page?.map((activity, index) => (
              <div
                key={activity.id}
                ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
              >
                <MovieCard
                  movie={activity.movie}
                  displayMode={displayMode}
                  movieActivity={activity as any}
                  fill
                  sizes={`
                    (max-width: 640px) 100px,
                    (max-width: 768px) 100px,
                    (max-width: 1024px) 120px,
                    (max-width: 1280px) 150px,
                    (max-width: 1536px) 150px,
                    (max-width: 1792px) 150px,
                    (max-width: 2048px) 200px,
                    (max-width: 2304px) 200px,
                    200px
                  `}
                />
              </div>
            ))
          ))}
          {isFetchingNextPage && (
            <Loader/>
          )}
        </div>
      ) : (
        <p className="text-center font-semibold">Aucun film.</p>
      )}
    </div>
  );
}
