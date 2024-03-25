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
import { supabase } from '@/lib/supabase/client';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { MyReviewButton } from './_components/MyReviewButton';

export default function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: number;
  }
}) {
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
    queryKey: ['film', params.film, 'reviews', order],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;
      let column;
      let ascending;

      const [tablePart, orderPart] = order.split('-');

      if (tablePart === 'like') {
        column = 'likes_count';
      } else if (tablePart == 'rating') {
        column = 'activity.rating';
      } else {
        column = 'updated_at';
      }

      if (orderPart === 'desc') ascending = false;
      else ascending = true;

      const { data } = await supabase
        .from('user_movie_review')
        .select('*, user(*), activity:user_movie_activity(*)')
        .eq('movie_id', params.film)
        .range(from, to)
        .order(column, { ascending });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (data, pages) => {
      return data?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!params.film,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <div className="w-full flex flex-col gap-4 justify-between lg:flex-row">
        <MyReviewButton filmId={params.film} />
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
                    activity={review.activity}
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

