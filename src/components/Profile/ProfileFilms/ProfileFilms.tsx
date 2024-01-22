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
import { User } from '@/types/type.user';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITIES_BY_USER_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivitiesByUserId';
import { GetUserMovieActivitiesByUserIdQuery } from '@/graphql/__generated__/graphql';
import { useLocale } from 'next-intl';

interface UserMoviesProps {
  profile: User;
}

export default function ProfileFilms({ profile }: UserMoviesProps) {

  const locale = useLocale();

  const [selectedOrder, setSelectedOrder] = useState('watch-desc');

  const [order, setOrder] = useState<any>([{ date: 'DescNullsFirst' }]);

  const [displayMode, setDisplayMode] = useState<'grid' | 'row'>('grid');

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: profileMovieActivitiesQuery,
    loading,
    error,
    fetchMore,
  } = useQuery<GetUserMovieActivitiesByUserIdQuery>(GET_USER_MOVIE_ACTIVITIES_BY_USER_ID, {
    variables: {
      filter: {
        user_id: { eq: profile.id },
      },
      orderBy: order,
      first: numberOfResult,
      locale: locale,
    },
    skip: !profile.id || !locale,
  });
  const profileActivities = profileMovieActivitiesQuery?.user_movie_activityCollection?.edges;
  const pageInfo = profileMovieActivitiesQuery?.user_movie_activityCollection?.pageInfo;

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            user_id: { eq: profile.id },
          },
          orderBy: order,
          first: numberOfResult,
          after: pageInfo?.endCursor,
          locale: locale,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            userCollection: {
              ...previousResult.user_movie_activityCollection,
              edges: [
                ...previousResult.user_movie_activityCollection!.edges,
                ...fetchMoreResult.user_movie_activityCollection!.edges,
              ],
              pageInfo: fetchMoreResult.user_movie_activityCollection!.pageInfo,
            },
          };
        },
      });
    }
  }, [fetchMore, inView, pageInfo, profile.id, locale, order]);

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

  if (!profileActivities?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="font-semibold text-xl text-accent-1">Films</h3>
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
      {profileActivities.length ? (
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
            {profileActivities.map(({ node }, index) => (
                <div
                  key={node.id}
                  ref={index === profileActivities.length - 1 ? ref : undefined}
                >
                  <MovieCard
                    movie={node.movie}
                    displayMode={displayMode}
                    movieActivity={node}
                  />
                </div>
            ))}
          </div>
          {(loading) && <Loader />}
        </>
      ) : (
        <p className="text-center font-semibold">Aucun film.</p>
      )}
    </div>
  );
}
