'use client';

import { useQuery } from '@tanstack/react-query';
import { TableWatchlist } from './_components/table/TableWatchlist';
import { WatchlistHeader } from './_components/WatchlistHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { useSupabaseClient } from '@/context/supabase-context';

export default function Watchlist() {
  const supabase = useSupabaseClient();
  const locale = useLocale();
  const { user } = useAuth();

  const {
    data: watchlist,
  } = useQuery({
    queryKey: ['user', user?.id, 'collection', 'watchlist'],
    queryFn: async () => {
      if (!user?.id || !locale) throw new Error('No user or locale');
      const { data } = await supabase
        .from('user_movie_watchlist')
        .select(`
          *,
          movie(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .eq('movie.language', locale)
        .order('created_at', { ascending: true });
      return data;
    },
    enabled: !!user?.id && !!locale,
  });

  if (!watchlist) return null;

  return (
    <main className="h-full">
      <WatchlistHeader data={watchlist} />
      <div className="p-4">
        <TableWatchlist data={watchlist} />
      </div>
    </main>
  );
}
