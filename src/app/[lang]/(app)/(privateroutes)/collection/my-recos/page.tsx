'use client';

import { useUIStore } from '@/stores/useUIStore';
import { useAuth } from '@/context/auth-context';
import { useUserRecosMovieQuery, useUserRecosTvSeriesQuery } from '@/features/client/user/userQueries';
import { MyRecosHeader } from './_components/MyRecosHeader';
import { ImageObject } from '@/hooks/use-random-image';
import { TableMyRecosMovie } from './_components/TableMyRecosMovie/TableMyRecosMovie';
import { TableMyRecosTvSeries } from './_components/TableMyRecosTvSeries/TableMyRecosTvSeries';

export default function MyRecos() {
  const tab = useUIStore((state) => state.myRecosTab);
  const { session } = useAuth();

  const { data: recosMovie, isLoading: recosMovieIsLoading } = useUserRecosMovieQuery({ userId: tab === 'movie' ? session?.user.id : undefined });
  const { data: recosTvSeries, isLoading: recosTvSeriesIsLoading } = useUserRecosTvSeriesQuery({ userId: tab === 'tv_series' ? session?.user.id : undefined });

  const data = tab === 'movie' ? recosMovie : recosTvSeries;
  const isLoading = tab === 'movie'
    ? (recosMovie === undefined || recosMovieIsLoading)
    : (recosTvSeries === undefined || recosTvSeriesIsLoading);
  const backdrops = (
    tab === 'movie'
    ? recosMovie?.map(item => ({ src: item.movie?.backdrop_url, alt: item.movie?.title }))
    : recosTvSeries?.map(item => ({ src: item.tv_series?.backdrop_url, alt: item.tv_series?.title }))
  )?.filter(item => item.src !== null && item.src !== undefined) as ImageObject[];

  return (
    <div className="h-full">
      <MyRecosHeader
      type={tab}
      numberItems={data?.length || 0}
      backdrops={backdrops || []}
      skeleton={isLoading}
      />
      {!isLoading && (
        tab === 'movie' ? (
          recosMovie && <TableMyRecosMovie data={recosMovie} className='m-4' />
        ) : (
          recosTvSeries && <TableMyRecosTvSeries data={recosTvSeries} className='m-4' />
        )
      )}
    </div>
  );
}
