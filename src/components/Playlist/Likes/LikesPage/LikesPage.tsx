'use client';

import { TableLikes } from '../table/TableLikes';
import { LikesHeader } from './components/LikesHeader';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';

import { getMovieDetails } from '@/lib/tmdb/tmdb';
import { FilmAction } from '@/types/type.film';
import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITY from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivity';
import { GetUserMovieActivityQuery } from '@/graphql/__generated__/graphql';

export function LikesPage() {
  const locale = useLocale();
  const { user } = useAuth();

  const {
    data: likesQuery,
    loading,
    error,
  } = useQuery<GetUserMovieActivityQuery>(GET_USER_MOVIE_ACTIVITY, {
    variables: {
      filter: {
        user_id: { eq: user?.id },
        is_liked: { eq: true },
      },
      orderBy: {
        created_at: 'DescNullsLast',
      },
      locale: locale,
    },
    skip: !user || !locale,
  });
  const likes = likesQuery?.user_movie_activityCollection?.edges;

  if (!likes) return null;

  return (
    <main className="h-full">
      <LikesHeader data={likes} />
      <div className="p-4">
        <TableLikes data={likes} />
      </div>
    </main>
  );
}
