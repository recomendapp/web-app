'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useUserWatchlist } from '@/features/user/userQueries';
import { cn } from '@/lib/utils';
import { MovieCard } from '../Movie/MovieCard';

export const WidgetUserMovieWatchlist = ({
  className,
} : React.HTMLAttributes<HTMLDivElement>) => {
  const { user } = useAuth();

  const { data: watchlist } = useUserWatchlist({
    userId: user?.id,
    filters: {
      order: 'random',
      limit: 6,
    }
  })

  if (!user) return null;

  if (!watchlist || !watchlist.length) return (null);

  return (
  <div className={cn('@container/widget-user-movie-watchlist space-y-4', className)}>
    <Link href={'/collection/guidelist'}>
        <h3 className="font-semibold text-xl">À voir</h3>
    </Link>
    <div className='grid grid-cols-2 @2xl/widget-user-movie-watchlist:grid-cols-3 gap-4'>
      {watchlist.map((item, index) => (
      <Link key={index} href={`/film/${item.movie?.slug ?? item.movie_id}`}>
        <MovieCard movie={item.movie} />
      </Link>
      ))}
    </div>
  </div>
  )
};
