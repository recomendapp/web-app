'use client';

import { useUIStore } from '@/stores/useUIStore';
import { useAuth } from '@/context/auth-context';
import { useUserWatchlistMoviesQuery, useUserWatchlistTvSeriesQuery } from '@/features/client/user/userQueries';
import { WatchlistHeader } from './_components/WatchlistHeader';
import { ImageObject } from '@/hooks/use-random-image';
import { TableWatchlistMovie } from './_components/TableWatchlistMovie/TableWatchlistMovie';
import { TableWatchlistTvSeries } from './_components/TableWatchlistTvSeries/TableWatchlistTvSeries';


export default function Watchlist() {
  const tab = useUIStore((state) => state.watchlistTab);
  const { session } = useAuth();

  const { data: watchlistMovies, isLoading: watchlistMoviesIsLoading } = useUserWatchlistMoviesQuery({ userId: tab === 'movie' ? session?.user.id : undefined });
  const { data: watchlistTvSeries, isLoading: watchlistTvSeriesIsLoading } = useUserWatchlistTvSeriesQuery({ userId: tab === 'tv_series' ? session?.user.id : undefined });

  const data = tab === 'movie' ? watchlistMovies : watchlistTvSeries;
  const isLoading = tab === 'movie'
    ? (watchlistMovies === undefined || watchlistMoviesIsLoading)
    : (watchlistTvSeries === undefined || watchlistTvSeriesIsLoading);
  const backdrops = (
    tab === 'movie'
    ? watchlistMovies?.map(item => ({ src: item.movie?.backdrop_url, alt: item.movie?.title }))
    : watchlistTvSeries?.map(item => ({ src: item.tv_series?.backdrop_url, alt: item.tv_series?.title }))
  )?.filter(item => item.src !== null && item.src !== undefined) as ImageObject[];

  return (
    <div className="h-full">
      <WatchlistHeader
      type={tab}
      numberItems={data?.length || 0}
      backdrops={backdrops || []}
      skeleton={isLoading}
      />
      {!isLoading && (
        tab === 'movie' ? (
          watchlistMovies && <TableWatchlistMovie data={watchlistMovies} className='m-4' />
        ) : (
          watchlistTvSeries && <TableWatchlistTvSeries data={watchlistTvSeries} className='m-4' />
        )
      )}
    </div>
  );
}
