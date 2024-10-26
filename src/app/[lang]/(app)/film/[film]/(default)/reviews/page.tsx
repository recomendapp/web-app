'use client';
import { Fragment, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../../components/ui/select';
import MovieReviewOverview from '@/components/Review/MovieReviewOverview';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { MyReviewButton } from './_components/MyReviewButton';
import { useSupabaseClient } from '@/context/supabase-context';
import { getMovieId } from '@/hooks/get-movie-id';

export default function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: string;
  }
}) {
  const { movieId } = getMovieId(params.film);
  const supabase = useSupabaseClient();
  const [order, setOrder] = useState('recent');

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: reviews,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['film', movieId, 'reviews', order],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;
      let column;
      let ascending;

      const [tablePart, orderPart] = order.split('-');

      if (tablePart === 'like') {
        column = 'likes_count';
      } else if (tablePart == 'rating') {
        column = 'rating';
      } else {
        column = 'updated_at';
      }

      if (orderPart === 'desc') ascending = false;
      else ascending = true;

      const { data } = await supabase
        .from('review')
        .select('*, user(*)')
        .eq('movie_id', movieId)
        .range(from, to)
        .order(column, { ascending });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (data, pages) => {
      return data?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!movieId,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <div className="w-full flex flex-col gap-4 justify-between lg:flex-row">
        <MyReviewButton filmId={movieId} />
        <div className="flex flex-1 justify-end gap-2 items-center">
          Trier par
          <Select onValueChange={setOrder} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'recent'}>Récentes</SelectItem>
                <SelectItem value={'like-desc'}>Populaires</SelectItem>
                {/* <SelectItem value={'rating-desc'}>
                  Notes décroissantes
                </SelectItem>
                <SelectItem value={'rating-asc'}>Notes croissantes</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='w-full max-w-lg'>
        {/* ALL */}
        {(loading || reviews === undefined) ? (
          <Loader />
        ) : reviews?.pages[0]?.length ? (
          <>
            {reviews?.pages.map((page, i) => (
              <Fragment key={i}>
                {page?.map((review: any, index) => (
                  <MovieReviewOverview
                    key={review.id}
                    review={review}
                    {...(i === reviews.pages.length - 1 &&
                      index === page.length - 1
                        ? { ref: ref }
                        : {})}
                  />
              ))}
              </Fragment>
            ))}
            {(loading || isFetchingNextPage) && <Loader />}
          </>
        ) : (
          <p className="text-center font-semibold">Aucune critique.</p>
        )}
      </div>
    </div>
  );
}

