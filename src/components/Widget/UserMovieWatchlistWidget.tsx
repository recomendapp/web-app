import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_WATCHLIST_BY_USER_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByUserId';

// TYPES
import { Watchlist } from '@/types/type.watchlist';

// UI
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { GetUserMovieWatchlistByUserIdQuery } from '@/graphql/__generated__/graphql';
import { useLocale } from 'next-intl';

export const UserMovieWatchlistWidget = () => {
  const { user } = useAuth();

  const locale = useLocale();

  const {
    data: watchlistQuery,
    loading,
    error,
  } = useQuery<GetUserMovieWatchlistByUserIdQuery>(GET_USER_MOVIE_WATCHLIST_BY_USER_ID, {
    variables: {
      user_id: user?.id,
      locale: locale,
    },
    skip: !user,
  });
  const watchlist = watchlistQuery?.user_movie_watchlistCollection?.edges;

  if (watchlist === undefined || loading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4 items-center">
          <Skeleton className=" w-52 h-6" />
          <Skeleton className=" w-24 h-6" />
        </div>
        <div className="flex space-x-4 pb-4 overflow-hidden">
          {Array.from({ length: 10 }).map((__, i) => (
            <Skeleton key={i} className="w-36 aspect-[2/3] shrink-0 pb-2" />
          ))}
        </div>
      </div>
    );
  }

  if (watchlist && !watchlist.length) return null;

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={'/collection/watchlist'}>
          <h3 className="font-semibold text-xl">À voir</h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={'/collection/watchlist'}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-2">
          {watchlist?.map(({ node }) => (
            <div key={node.id} className="w-36">
              <MovieCard movie={node.movie} displayMode="grid" />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
