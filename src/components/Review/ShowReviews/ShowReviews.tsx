'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext/AuthProvider';

import { Models } from 'appwrite';
import { Fragment, useEffect, useState } from 'react';
import { FileEdit } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import MovieReviewOverview from '@/components/Review/MovieReviewOverview';

import { Review } from '@/types/type.review';
import { useInfiniteQuery, useQuery } from 'react-query';
import { supabase } from '@/lib/supabase/supabase';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';


export function ShowReviews({ filmId }: { filmId: string }) {

  const [ order, setOrder ] = useState("recent");

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: reviews,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    } = useInfiniteQuery({
    queryKey: ['film', filmId, 'reviews', order],
    queryFn: async ({ pageParam = 1 }) => {
        let from = (pageParam - 1) * numberOfResult;
        let to = from - 1 + numberOfResult;
        let column;
        let ascending;

        const [tablePart, orderPart] = order.split('-');

        if (tablePart === "like") {
            column = 'created_at';
        } else if (tablePart == "rating") {
            column = 'rating';
        } else {
            column = 'updated_at';
        }

        if (orderPart === "desc")
            ascending = false;
        else
            ascending = true;

        const { data } = await supabase
            .from('review')
            .select('*, user(*), activity:user_movie_activity(*)')
            .eq('film_id', filmId)
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
  }, [inView, hasNextPage])

  if (loading)
    return <div>Loading</div>


  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className='flex flex-col gap-4 justify-between lg:flex-row'>
        {/* <MovieUserReview movie={movie} /> */}
        <MyReviewButton filmId={filmId} />
        <div className='flex flex-1 justify-end gap-2 items-center'>
          Trier par
          <Select onValueChange={setOrder} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue  placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                  <SelectItem value={"recent"}>Récentes</SelectItem>
                  <SelectItem value={"recommended"}>Recommandées</SelectItem>
                  <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                  <SelectItem value={"rating-asc"}>Notes croissantes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* ALL */}
      {reviews?.pages[0]?.length ?
        <>
          {reviews?.pages.map((page, i) => (
              <Fragment key={i}>
                  {page?.map((review: any, index) => (
                      <div key={review.id}
                          {...(i === reviews.pages.length - 1 && index === page.length - 1
                              ? { ref: ref }
                              : {})}
                      >
                          <MovieReviewOverview key={review.id} review={review} />
                      </div>
                  ))}
              </Fragment>
          ))}
          {(loading || isFetchingNextPage) && <Loader />}
        </>
      :
        <p className="text-center font-semibold">Aucune critique.</p>
      } 
      {/* {reviews.length ? <div className='flex flex-col gap-4'>
        {reviews.map(({ review } : { review: Review}) => (
          <MovieReviewOverview key={review.id} review={review} />
        ))}
      </div>
      :(
        <div className='flex h-full justify-center items-center'>
          <p>Aucune critique</p>
        </div>
      )} */}
    </div>
  )
}

export function MyReviewButton({ filmId } : { filmId: string }) {

  const { user } = useAuth();

  const {
    data: activity,
    isLoading: loading,
    isError: error
  } = useQuery({
    queryKey: ['user', user?.id, 'film', filmId, 'activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_movie_activity')
        .select(`*, review(*)`)
        .eq('film_id', filmId)
        .eq('user_id', user?.id)
        .single()
      return (data)
    },
    enabled: user?.id !== undefined && user?.id !== null,
  });


  if (!user || loading)
    return

  if (!loading && !activity?.review)
    return (
      <Link href={`/film/${filmId}/review/create/`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
        <FileEdit />
        Écrire une critique
      </Link>
    )

  return (
    <Link href={`/@${user.username}/film/${filmId}`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
      <FileEdit />
      Ma critique
    </Link>
  )
}