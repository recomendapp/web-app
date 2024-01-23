'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from '@/types/type.user';
import { supabase } from '@/lib/supabase/client';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useInfiniteQuery } from 'react-query';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITIES_BY_USER_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivitiesByUserId';
import { GetUserMovieActivitiesByUserIdQuery, UserFragment, UserMinimalFragment } from '@/graphql/__generated__/graphql';

export default function ProfileLastActivity({ profile }: { profile: UserFragment | UserMinimalFragment }) {
  
  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 10;

  const {
    data: profileLastActivitiesQuery,
    fetchMore,
  } = useQuery<GetUserMovieActivitiesByUserIdQuery>(GET_USER_MOVIE_ACTIVITIES_BY_USER_ID, {
    variables: {
      filter: {
        user_id: { eq: profile.id },
      },
      first: numberOfResult,
      locale: locale,
    },
    skip: !profile.id || !locale,
  });
  const profileActivities = profileLastActivitiesQuery?.user_movie_activityCollection?.edges;
  const pageInfo = profileLastActivitiesQuery?.user_movie_activityCollection?.pageInfo;


  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            user_id: { eq: profile.id },
          },
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
  }, [fetchMore, inView, pageInfo, profile.id, locale]);

  if (!profileActivities?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={`/@${profile?.username}/films`}>
          <h3 className="font-semibold text-xl text-accent-1">
            Dernières activités
          </h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={`/@${profile?.username}/films`}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-4">
          {profileActivities?.map(({ node }, index) => (
            <div
              key={node.id}
              className="w-[150px] pb-2"
              ref={index === profileActivities.length - 1 ? ref : undefined}
            >
              <MovieCard
                movie={node.movie}
                displayMode={'grid'}
                movieActivity={node}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
