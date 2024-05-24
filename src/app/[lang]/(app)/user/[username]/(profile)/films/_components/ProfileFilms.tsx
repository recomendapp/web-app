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
    data: activity,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', userId, 'activity', { order: 'updated_at-desc'}],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`
          *,
          user(*),
          review:user_movie_review(*),
          movie:movie_id(
            *,
            data:tmdb_movie_translation(*),
            directors:tmdb_movie_credits(
              *,
              person:tmdb_person(*)
            )
          )
        `)
        .eq('user_id', userId)
        .eq('movie.data.language_id', locale)
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

  // const {
  //   data: profileMovieActivitiesQuery,
  //   loading,
  //   error,
  //   fetchMore,
  // } = useQuery<GetUserMovieActivitiesByUserIdQuery>(GET_USER_MOVIE_ACTIVITIES_BY_USER_ID, {
  //   variables: {
  //     filter: {
  //       userId: { eq: username},
  //     },
  //     orderBy: order,
  //     first: numberOfResult,
  //     locale: locale,
  //   },
  //   skip: !profile.id || !locale,
  // });
  // const profileActivities = profileMovieActivitiesQuery?.user_movie_activityCollection?.edges;
  // const pageInfo = profileMovieActivitiesQuery?.user_movie_activityCollection?.pageInfo;

  // useEffect(() => {
  //   if (inView && pageInfo?.hasNextPage) {
  //     fetchMore({
  //       variables: {
  //         filter: {
  //           userId: { eq: profile.id },
  //         },
  //         orderBy: order,
  //         first: numberOfResult,
  //         after: pageInfo?.endCursor,
  //         locale: locale,
  //       },
  //       updateQuery: (previousResult, { fetchMoreResult }) => {
  //         return {
  //           ...previousResult,
  //           userCollection: {
  //             ...previousResult.user_movie_activityCollection,
  //             edges: [
  //               ...previousResult.user_movie_activityCollection!.edges,
  //               ...fetchMoreResult.user_movie_activityCollection!.edges,
  //             ],
  //             pageInfo: fetchMoreResult.user_movie_activityCollection!.pageInfo,
  //           },
  //         };
  //       },
  //     });
  //   }
  // }, [fetchMore, inView, pageInfo, profile.id, locale, order]);

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activity, fetchNextPage]);

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
  }

  // if (!profileActivities?.length) return null;

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
      {activity?.pages[0].length! > 0 ? (
        <>
          <div
            className={` gap-2
                ${
                  displayMode == 'row'
                    ? 'flex flex-col'
                    : 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8'
                }
            `}
          >
            {activity?.pages.map((page, i) => (
              page?.map((activity: any, index) => (
                <div
                  key={activity.id}
                  ref={(i === activity.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                >
                  <MovieCard
                    movie={activity.movie}
                    displayMode={displayMode}
                    movieActivity={activity}
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
          </div>
          {(isLoading) && <Loader />}
        </>
      ) : (
        <p className="text-center font-semibold">Aucun film.</p>
      )}
    </div>
  );
}
