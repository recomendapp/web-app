'use client';

import { TableWatchlist } from '../table/TableWatchlist';
import { WatchlistHeader } from './components/WatchlistHeader';
import { useAuth } from '@/context/AuthContext/auth-context';
import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_WATCHLIST_BY_USER_ID from '@/graphql/User/Movie/Watchlist/queries/GetUserMovieWatchlistByUserId';
import { GetUserMovieWatchlistByUserIdQuery } from '@/graphql/__generated__/graphql';

export function WatchlistPage() {
  const locale = useLocale();
  const { user } = useAuth();

  const {
    data: watchlistQuery,
    loading,
    error,
  } = useQuery<GetUserMovieWatchlistByUserIdQuery>(GET_USER_MOVIE_WATCHLIST_BY_USER_ID, {
    variables: {
      user_id: user?.id,
      locale: locale,
    },
    skip: !user || !locale,
  });
  const watchlist = watchlistQuery?.user_movie_watchlistCollection?.edges;

  if (!watchlist) return null;

  return (
    <main className="h-full">
      <WatchlistHeader data={watchlist} />
      <div className="p-4">
        <TableWatchlist watchlist={watchlist} />
      </div>
    </main>
  );
}
