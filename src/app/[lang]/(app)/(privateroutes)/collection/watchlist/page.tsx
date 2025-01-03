'use client';

import { TableWatchlist } from './_components/table/TableWatchlist';
import { WatchlistHeader } from './_components/WatchlistHeader';
import { useAuth } from '@/context/auth-context';
import { useUserWatchlist } from '@/features/user/userQueries';

export default function Watchlist() {
  const { user } = useAuth();

  const {
    data: watchlist,
    isLoading,
    isError,
  } = useUserWatchlist({
    userId: user?.id,
  })

  if (!watchlist) return null;

  return (
    <main className="h-full">
      <WatchlistHeader data={watchlist as any} />
      <div className="p-4">
        <TableWatchlist data={watchlist as any} />
      </div>
    </main>
  );
}
