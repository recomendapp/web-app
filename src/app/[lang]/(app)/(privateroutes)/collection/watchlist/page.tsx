'use client';

import { useQuery } from '@tanstack/react-query';
import { TableWatchlist } from './components/table/TableWatchlist';
import { WatchlistHeader } from './components/WatchlistHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase/client';

export default function Watchlist() {
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
          movie:tmdb_movie(
            *,
            data:tmdb_movie_translation(*),
            genres:tmdb_movie_genre(
              id,
              genre:tmdb_genre(
                *,
                data:tmdb_genre_translation(*)
              )
            ),
            directors:tmdb_movie_credits(
              id,
              person:tmdb_person(*)
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('movie.data.language_id', locale)
        .eq('movie.genres.genre.data.language', locale)
        .eq('movie.directors.job', 'Director')
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
