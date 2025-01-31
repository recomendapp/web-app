'use client';

import { TableWatchlist } from './_components/table/TableWatchlist';
import { WatchlistHeader } from './_components/WatchlistHeader';
import { useAuth } from '@/context/auth-context';
import { useUserWatchlistQuery } from '@/features/client/user/userQueries';

export default function Watchlist() {
  const { user } = useAuth();

  const {
    data: watchlist,
    isLoading,
    isError,
  } = useUserWatchlistQuery({
    userId: user?.id,
  })

  if (!watchlist) return null;

  return (
    <div className="h-full">
      <WatchlistHeader data={watchlist} />
      <TableWatchlist data={watchlist} className="m-4" />
    </div>
  );
}
